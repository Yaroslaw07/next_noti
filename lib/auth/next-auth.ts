import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import db from "../db";
import { hashPassword, verifyPassword } from "./hasher";

export const AuthenticationType = {
  LogIn: "LogIn",
  SignUp: "SignUp",
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        authenticateType: { label: "Authenticate Type", type: "text" },
      },
      async authorize(credentials, req) {
        if (
          !credentials ||
          !credentials.authenticateType ||
          !credentials.email ||
          !credentials.password
        ) {
          return null;
        }

        const { authenticateType, email, password } = credentials!;

        switch (authenticateType) {
          case AuthenticationType.SignUp: {
            if (
              (await db.user.findUnique({ where: { email: email } })) != null
            ) {
              throw new Error("User already exists");
            }

            const hashedPassword = await hashPassword(password);

            const user = await db.user.create({
              data: {
                name: email.substring(0, email.indexOf("@")),
                email: email,
                password: hashedPassword,
              },
            });

            return user;
          }

          case AuthenticationType.LogIn: {
            const user = await db.user.findUnique({ where: { email: email } });

            if (user == null) {
              throw new Error("No user with this email");
            }

            if (!(await verifyPassword(password, user.password!))) {
              throw new Error("Wrong password. Try another");
            }

            return user;
          }
        }

        throw new Error("Invalid authentication type");
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.isRegistered = token.isRegistered;
      session.user.id = token.id;

      return session;
    },

    async jwt({ token, trigger, session, user }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return { ...token, ...user };
    },
  },

  //   -- code from noti_old
  //   providers: [
  //     GitHubProvider({
  //       clientId: process.env.GITHUB_CLIENT_ID as string,
  //       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  //     }),
  //     GoogleProvider({
  //       clientId: process.env.GOOGLE_CLIENT_ID as string,
  //       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  //     }),
  //   ],
};

export const getSession = () => getServerSession(authOptions);

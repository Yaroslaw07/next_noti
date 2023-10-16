import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import db from "../db";
import { use } from "react";
import { hashPassword } from "./hasher";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
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

        if (!credentials || !credentials.authenticateType || !credentials.email || !credentials.password) {
          return null;
        }

        const { authenticateType, email, password } = credentials!;
        
        switch (authenticateType) {
          case "signUp": {

            
            if (await db.user.findFirst({ where: { email: email } }) != null) {
              throw new Error("User already exists");
            }

            const hashedPassword = await hashPassword(password);
            
            const user = await db.user.create({
              data: {
                name: email.substring(0, email.indexOf("@")) ,
                email: email,
                password: hashedPassword,
              },
            });

            console.log(user);

            return user;
          }

          case "signIn": {
            console.log("signIn");
          }
        }

        throw new Error("Invalid authentication type");
      },
    }),
  ],

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
  //   callbacks: {
  //     async session({ session, token }) {
  //       session.user.isRegistered = token.isRegistered;
  //       session.user.id = token.id;

  //       return session;
  //     },

  //     async jwt({ token, user }) {
  //       return { ...token, ...user };
  //     },
  //   },
};

export const getSession = () => getServerSession(authOptions);

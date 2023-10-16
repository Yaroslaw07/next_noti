import type { DefaultSession, DefaultUser, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isRegistered: boolean;
  }
}

declare module "next-auth" {
  interface User extends DefaultUser {
    isRegistered: boolean;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}
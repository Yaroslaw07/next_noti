import { authOptions } from "@/lib/auth/next-auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

export default handler

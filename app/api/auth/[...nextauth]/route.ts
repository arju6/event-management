import NextAuth from "next-auth";
import { authOptions } from "@/lb/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
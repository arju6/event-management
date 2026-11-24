import { connectDB } from "@/lb/mongodb";
import users from "@/models/userModel";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        await connectDB();
        const existingUser = await users.findOne({
          email: credentials.email.trim().toLowerCase(),
        });
        if (!existingUser) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          credentials.password,
          existingUser.password,
        );
        if (!passwordMatches) {
          return null;
        }

        return {
          id: existingUser._id.toString(),
          name: existingUser.name,
          email: existingUser.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

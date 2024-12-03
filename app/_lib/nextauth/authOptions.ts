import { AuthOptions, DefaultSession, User } from "next-auth";
import credentialsProv from "./providers";
import { RoleType } from "@/app/_types/apiTypes";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      role: RoleType;
      is_staff: boolean;
      is_admin: boolean;
      accessToken: string;
      tokenType: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    email: string;
    is_staff: boolean;
    is_admin: boolean;
    role: RoleType;
    accessToken: string;
    tokenType: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    email: string;
    role: RoleType;
    is_staff: boolean;
    is_admin: boolean;
    accessToken: string;
    tokenType: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [credentialsProv],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  debug: process.env.NODE_ENV === "development",

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = typeof user.id === 'number' ? user.id : parseInt(user.id, 10);
        token.email = user.email;
        token.role = user.role;
        token.is_staff = user.is_staff;
        token.is_admin = user.is_admin;
        token.accessToken = user.accessToken;
        token.tokenType = user.tokenType;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        email: token.email,
        role: token.role as RoleType,
        is_staff: token.is_staff,
        is_admin: token.is_admin,
        accessToken: token.accessToken,
        tokenType: token.tokenType,
      };
      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/",
  },
};
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authAdmin } from "./request/worker/auth";
import { genPbFiles } from "./request/actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;
        const user = await authAdmin({
          email: credentials!.email as string,
          password: credentials!.password as string,
          role: "ADMIN",
        });
        if (!user) {
          throw new Error("User not found.");
        }
        return {
          email: user.record.email,
          id: user.record.id,
          image: genPbFiles(user.record, user.record.avatar),
          name: user.record.first_name + " " + user.record.last_name,
          role: user.record.role,
          token: user.token,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.token = user.token as string;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.token = token.token as string;

      return session;
    },
  },
});

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { loginRoute } from "../../../utils/apiRoutes";

export default NextAuth({
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        try {
          const response = await axios.post(loginRoute, {
            phone_number: credentials.phone_number,
            password: credentials.password,
          });

          if (response.status === 200) {
            return {
              token: response.data.token,
              ...response.data.user,
              id: response.data.user.id,
            };
          }
          return null;
        } catch (error) {
          console.error("An error occurred:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = {
          id: user.id,
          name: user.full_name || user.name,
          phone_number: user.phone_number,
          role: user.role,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

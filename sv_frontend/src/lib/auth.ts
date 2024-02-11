import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const optionsAuth: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials, req) {
        return null;
      },
    }),
  ],
  jwt: {
    maxAge: 60 * 60 * 24 * 364,
  },
  pages: {
    signIn: "/signIn",
  },
};

export default optionsAuth;

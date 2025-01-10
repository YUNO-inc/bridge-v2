import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "../user/service";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // authorized() {
    //   // console.log({ request, auth });
    //   //   return !!auth?.user;
    //   return true;
    // },
    async signIn({ user }) {
      try {
        const { name, email } = user;
        if (!(email && name)) throw new Error();
        const existingUser = await getUser({
          email: email,
        });
        if (!existingUser) await createUser({ email: email, name: name });
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    async session({ session }) {
      const { email } = session.user;
      const foundUser = await getUser({ email });
      session.user = { ...session.user, ...foundUser };
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
});

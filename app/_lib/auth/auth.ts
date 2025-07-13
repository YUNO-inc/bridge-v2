import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "../user/service";
import { ReferrerDTO } from "@/app/_interfaces/interfaces";

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
    async signIn({ user }) {
      try {
        const { name, email } = user;
        if (!(email && name)) throw new Error("Missing required fields");

        const existingUser = await getUser({ email });
        if (!existingUser) {
          const cookieStore = await cookies();
          const referrerId: string | null =
            cookieStore.get("referrerId")?.value || null;
          cookieStore.delete("referrerId");

          const referrer: Pick<ReferrerDTO, "referrer"> | null =
            referrerId &&
            ObjectId.isValid(referrerId) &&
            new ObjectId(referrerId).toString() === referrerId
              ? {
                  referrer: referrerId,
                }
              : null;

          await createUser({
            email,
            name,
            referrer,
          });
        }

        return true;
      } catch (err) {
        console.error("SignIn error:", err);
        return false;
      }
    },
    async session({ session }) {
      const { email } = session.user;
      const foundUser = await getUser({ email });
      if (!foundUser?.id) throw new Error("user not found");

      session.user = {
        ...session.user,
        ...foundUser?.toObject(),
        id: foundUser?.id,
      };
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    signOut: "/auth",
  },
});

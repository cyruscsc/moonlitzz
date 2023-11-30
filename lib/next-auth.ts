import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import { User, Session } from 'next-auth';
import prisma from './prisma';
import { createUser, getUser } from './action';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      try {
        const userExists = await getUser(user?.email as string);
        if (!userExists?.active) {
          return false;
        }
        if (!userExists) {
          await createUser(user?.name as string, user?.email as string);
        }
        return true;
      } catch (error: any) {
        console.log('ERR - check if user exists: ', error.message);
        return false;
      }
    },
    async session({ session }: { session: Session }) {
      try {
        const userData = await getUser(session?.user?.email as string);
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...userData,
          },
        };
        return newSession;
      } catch (error: any) {
        console.log('ERR - retrieve user data: ', error.message);
        return session;
      }
    },
  },
};

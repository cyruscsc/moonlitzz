import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import prisma from './prisma';
import { getUserByEmail } from './action';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    session: async ({ session }) => {
      try {
        if (session?.user) {
          const user = await getUserByEmail(session.user.email!);
          const data = {
            id: user?.id,
            name: user?.name,
            createdAt: user?.createdAt,
            updatedAt: user?.updatedAt,
          };
          session = { ...session, user: { ...session.user, ...data } };
        }
        return session;
      } catch (error: any) {
        console.log('ERR - retrieving user data: ', error.message);
        return session;
      }
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

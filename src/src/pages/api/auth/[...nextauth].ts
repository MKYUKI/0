// src/pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../utils/mongodb';
import { User } from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // DBに登録するタイミング
      await dbConnect();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        // 新規作成
        const created = await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
          following: [],
          followers: [],
        });
        user.id = created._id.toString();
      } else {
        user.id = existingUser._id.toString();
      }
      return true;
    },
    async session({ session, token }) {
      // session.user に id を付与
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

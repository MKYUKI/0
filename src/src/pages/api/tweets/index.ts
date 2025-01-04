// src/pages/api/tweets/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import { Tweet } from '../../../models/Tweet';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET': {
      // ツイート一覧
      try {
        const tweets = await Tweet.find().sort({ createdAt: -1 }).lean();
        return res.status(200).json({ tweets });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
    case 'POST': {
      // ツイート投稿
      try {
        const session = await getSession({ req });
        if (!session?.user) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        const { content } = req.body;
        if (!content) {
          return res.status(400).json({ error: 'Content is required' });
        }
        const newTweet = await Tweet.create({
          content,
          author: (session.user as any).id || '',
          authorName: session.user?.name || '',
          authorImage: session.user?.image || '',
          likes: [],
          retweets: [],
        });
        return res.status(201).json(newTweet);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

// src/pages/api/tweets/post.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import dbConnect from '../../../utils/dbConnect';
import { Tweet } from '../../../models/Tweet';

export default async function postTweet(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await dbConnect();

    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const newTweet = await Tweet.create({
      author: (session.user as any).id,
      content,
    });

    return res.status(200).json({ message: 'Tweet created', tweet: newTweet });
  } catch (err: any) {
    console.error('postTweet error:', err);
    return res.status(500).json({ message: err.message });
  }
}

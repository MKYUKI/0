// src/pages/api/tweets/like.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import dbConnect from '../../../utils/dbConnect';
import { Tweet } from '../../../models/Tweet';

export default async function likeTweetHandler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const userId = (session.user as any)?.id;

  if (req.method === 'POST') {
    const { tweetId } = req.body;
    if (!tweetId) {
      return res.status(400).json({ message: 'Missing tweetId' });
    }
    try {
      const tweet = await Tweet.findById(tweetId);
      if (!tweet) return res.status(404).json({ message: 'Tweet not found' });

      if (!tweet.likes.includes(userId)) {
        tweet.likes.push(userId);
      }
      await tweet.save();

      return res.status(200).json({ message: 'Liked', tweet });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  } else if (req.method === 'DELETE') {
    const { tweetId } = req.body;
    if (!tweetId) {
      return res.status(400).json({ message: 'Missing tweetId' });
    }
    try {
      const tweet = await Tweet.findById(tweetId);
      if (!tweet) return res.status(404).json({ message: 'Tweet not found' });

      tweet.likes = tweet.likes.filter((id: string) => id !== userId);
      await tweet.save();

      return res.status(200).json({ message: 'Unliked', tweet });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

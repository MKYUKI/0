// src/pages/api/tweets/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import { Tweet } from '../../../models/Tweet';
import { getSession } from 'next-auth/react';

export default async function tweetHandler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query; // /api/tweets/[id]

  switch (req.method) {
    case 'GET': {
      // ツイート詳細取得
      try {
        const tweet = await Tweet.findById(id).lean();
        if (!tweet) return res.status(404).json({ error: 'Not found' });
        return res.status(200).json(tweet);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
    case 'PUT': {
      // いいね or リツイート (例: type=like or retweet)
      const session = await getSession({ req });
      if (!session?.user) return res.status(401).json({ error: 'Unauthorized' });
      const { type } = req.body;
      const userId = (session.user as any).id || '';
      try {
        const tweet = await Tweet.findById(id);
        if (!tweet) return res.status(404).json({ error: 'Not found' });
        if (type === 'like') {
          // likes に userId がなければ追加
          if (!tweet.likes.includes(userId)) {
            tweet.likes.push(userId);
            await tweet.save();
          }
        } else if (type === 'unlike') {
          // likes から userId を削除
          tweet.likes = tweet.likes.filter((uid) => uid !== userId);
          await tweet.save();
        } else if (type === 'retweet') {
          if (!tweet.retweets.includes(userId)) {
            tweet.retweets.push(userId);
            await tweet.save();
          }
        } else if (type === 'unretweet') {
          tweet.retweets = tweet.retweets.filter((uid) => uid !== userId);
          await tweet.save();
        }
        return res.status(200).json(tweet);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
    case 'DELETE': {
      // ツイート削除
      const session = await getSession({ req });
      if (!session?.user) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const tweet = await Tweet.findById(id);
        if (!tweet) return res.status(404).json({ error: 'Not found' });
        // 削除権限: 投稿主と同じか？
        if (tweet.author !== (session.user as any).id) {
          return res.status(403).json({ error: 'Forbidden' });
        }
        await tweet.remove();
        return res.status(200).json({ message: 'Deleted' });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

// src/pages/api/follow.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';
import { getSession } from 'next-auth/react';
import { User } from '../../models/User';

export default async function followHandler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const session = await getSession({ req });
  if (!session?.user) return res.status(401).json({ error: 'Unauthorized' });

  const userId = (session.user as any).id;
  const { targetUserId } = req.method === 'DELETE' ? req.body : req.body;

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);
    if (!user || !targetUser) return res.status(404).json({ error: 'User not found' });

    switch (req.method) {
      case 'POST': {
        // フォロー
        if (!user.following.includes(targetUserId)) {
          user.following.push(targetUserId);
        }
        if (!targetUser.followers.includes(userId)) {
          targetUser.followers.push(userId);
        }
        await user.save();
        await targetUser.save();
        return res.status(200).json({ message: 'フォロー成功' });
      }
      case 'DELETE': {
        // アンフォロー
        user.following = user.following.filter((uid) => uid !== targetUserId);
        targetUser.followers = targetUser.followers.filter((uid) => uid !== userId);
        await user.save();
        await targetUser.save();
        return res.status(200).json({ message: 'アンフォロー成功' });
      }
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

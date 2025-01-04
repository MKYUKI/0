// src/pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';
import { getSession } from 'next-auth/react';
import { Message } from '../../models/Message';

export default async function chatHandler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const session = await getSession({ req });
  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = (session.user as any).id;

  switch (req.method) {
    case 'GET': {
      // チャットログ一覧 (例: 送受信含む)
      const { receiverId } = req.query;
      try {
        const messages = await Message.find({
          $or: [
            { senderId: userId, receiverId },
            { senderId: receiverId, receiverId: userId },
          ],
        }).sort({ createdAt: 1 }); // 古い順
        return res.status(200).json(messages);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
    case 'POST': {
      // メッセージ送信
      const { receiverId, content } = req.body;
      if (!receiverId || !content) {
        return res.status(400).json({ error: 'Missing receiverId or content' });
      }
      try {
        const newMsg = await Message.create({
          senderId: userId,
          receiverId,
          content,
        });
        return res.status(201).json(newMsg);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

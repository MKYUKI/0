// pages/api/tweets/quote.ts (型安全性を高めた修正版)
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]'; // authOptionsをインポート
import { PrismaClient, Prisma } from '@prisma/client'; // Prisma関連の型もインポート

const prisma = new PrismaClient();

// APIレスポンス用の型定義 (任意)
type ApiResponse = {
  message?: string;
  quoteRetweet?: Prisma.QuoteRetweetGetPayload<{}>; // Prismaの型を使用
  // 必要に応じて他のプロパティを追加
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse> // レスポンス型を適用
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // サーバーサイドでセッション情報を取得
  const session = await getServerSession(req, res, authOptions);

  // セッションとユーザーIDの存在を安全にチェック (型拡張を前提)
  // 型拡張をしていない場合は (session?.user as any)?.id とする
  const userId = session?.user?.id;
  if (!userId) {
    console.error("[API quote] Unauthorized access attempt: No session or user ID found.");
    // 詳細なエラーをログに残し、クライアントには汎用的なメッセージを返す
    return res.status(401).json({ message: 'Authentication required.' });
  }

  // リクエストボディの型を定義 (より安全)
  interface RequestBody {
    content?: string;
    originalTweetId?: string;
  }
  const { content, originalTweetId }: RequestBody = req.body;

  // バリデーション
  if (!originalTweetId) {
     return res.status(400).json({ message: 'Original Tweet ID is required.' });
  }
  // content は空でも良いかもしれないので、要件に応じてチェック
  if (typeof content !== 'string') { // content が存在しない、または文字列でない場合
    return res.status(400).json({ message: 'Invalid content.' });
  }
   // content が必須で空を許さない場合
   // if (!content || content.trim().length === 0) {
   //   return res.status(400).json({ message: 'Quote content cannot be empty.' });
   // }


  try {
    // データベース操作
    const quoteRetweet = await prisma.quoteRetweet.create({
      data: {
        content: content.trim(), // 前後の空白を除去
        userId: userId,           // 認証済みユーザーIDを使用
        tweetId: originalTweetId, // 関連付ける元のツイートID
        // originalId: originalTweetId, // スキーマ定義に合わせて設定
      }
    });

    console.log(`[API quote] Quote retweet (ID: ${quoteRetweet.id}) created by user ${userId} for tweet ${originalTweetId}`);

    // 成功レスポンス
    return res.status(201).json({ quoteRetweet: quoteRetweet });

  } catch (error) {
    console.error('[API quote] Error creating quote retweet:', { userId, originalTweetId, error });

    // Prisma特有のエラーハンドリング (例)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // 例: 関連レコードが見つからない (元のツイートが存在しないなど)
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Original tweet not found or user does not exist.' });
      }
      // 例: ユニーク制約違反など
      if (error.code === 'P2002') {
         return res.status(409).json({ message: 'You have already quoted this tweet.' });
      }
    }

    // その他の予期せぬエラー
    return res.status(500).json({ message: 'Internal Server Error while creating quote retweet.' });
  }
  // finally ブロックでの $disconnect は、Lambdaなどのサーバーレス環境では
  // パフォーマンスに影響する場合があるため、必須ではないことが多い。
  // 長時間稼働するサーバーなら適切。
  // finally {
  //   await prisma.$disconnect();
  // }
}
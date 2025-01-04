// src/pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadHandler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = '/tmp';
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Upload parse error:', err);
      return res.status(500).json({ message: 'Parse error' });
    }
    // 例: Cloud Storageへアップロード or S3へ
    // ここではダミーで一時フォルダに書き込み→ファイル名を返す
    const file = files.file;
    if (!file) {
      return res.status(400).json({ message: 'No file' });
    }
    // @ts-ignore
    const filePath = file.filepath || file.path;
    // TODO: ここでS3アップロードなど
    return res.status(200).json({ message: 'Uploaded', filePath });
  });
}

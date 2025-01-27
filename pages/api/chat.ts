// File: pages/api/chat.ts

import type { NextApiRequest, NextApiResponse } from 'next'

// GPT-3.5 Turbo endpoint
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

/**
 * このAPIは、OpenAI GPT-3.5へリクエストし、失敗時(特に insufficient_quota)にモック応答を返す。
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // リクエストBody: { model, messages, temperature, max_tokens, presence_penalty, frequency_penalty } など
    const {
      model = 'gpt-3.5-turbo',
      messages = [],
      temperature = 0.7,
      max_tokens = 2000,
      presence_penalty = 0,
      frequency_penalty = 0
    } = req.body || {}

    // 環境変数からOpenAI APIキーを取得
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return res.status(500).json({
        error: 'OPENAI_API_KEY is not set in environment.'
      })
    }

    // バリデーション
    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: '"messages" must be an array of {role, content}.'
      })
    }

    // OpenAIへ送るペイロード
    const payload = {
      model,
      messages,
      temperature,
      max_tokens,
      presence_penalty,
      frequency_penalty
    }

    // OpenAI API呼び出し
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 認証ヘッダ
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      // 失敗 => エラー詳細を取得
      const errData = await response.json()
      console.error('[OpenAI API Error]', errData)

      // もし「insufficient_quota」ならモック応答で代替
      const code = errData?.error?.code
      if (code === 'insufficient_quota') {
        console.warn('[Fallback to mock response due to insufficient_quota]')
        return res.status(200).json({
          id: 'mock-fallback',
          object: 'chat.completion.mock',
          created: Math.floor(Date.now() / 1000),
          choices: [
            {
              index: 0,
              finish_reason: 'mock_fallback',
              message: {
                role: 'assistant',
                content:
                  '(OpenAI quota切れ: これはモック応答です。AIの応答ではありません。)'
              }
            }
          ]
        })
      }

      // それ以外のエラー => そのまま転送
      return res.status(response.status).json({ error: errData })
    }

    // 正常時 => OpenAIからのJSONをそのまま返す
    const data = await response.json()
    return res.status(200).json(data)
  } catch (err) {
    console.error('[OpenAI Chat API Catch Error]', err)
    return res.status(500).json({
      error: `Unexpected error in /api/chat: ${String(err)}`
    })
  }
}

// pages/auth/error.tsx
import { useRouter } from 'next/router';
import React from 'react';

export default function AuthErrorPage() {
  const router = useRouter();
  const { error } = router.query; // エラーの種類がクエリパラメータで渡される場合がある

  // エラーに応じたメッセージを表示
  const getErrorMessage = (errorCode: string | string[] | undefined) => {
    if (!errorCode || typeof errorCode !== 'string') {
      return "認証中に不明なエラーが発生しました。";
    }
    switch (errorCode.toLowerCase()) {
      case 'configuration':
        return "サーバーの設定に問題があります。管理者にお問い合わせください。";
      case 'accessdenied':
        return "アクセスが拒否されました。権限がない可能性があります。";
      case 'verification':
        return "認証トークンが無効または期限切れです。再度お試しください。";
      default:
        return `認証エラーが発生しました (${errorCode})。`;
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>
      <h1>認証エラー</h1>
      <p>{getErrorMessage(error)}</p>
      <button onClick={() => router.push('/login')}>ログインページに戻る</button>
    </div>
  );
}

// エラーページには共通レイアウトを適用しない場合
AuthErrorPage.getLayout = function getLayout(page: React.ReactElement) {
  return page;
};
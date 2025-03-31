// pages/auth/error.tsx (新規作成)
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link'; // Linkを追加

const AuthErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;

  let errorMessage = "認証中に予期せぬエラーが発生しました。";
  // エラーコードに基づいてメッセージを出し分け (NextAuthが渡す一般的なエラーコード)
  switch (error) {
    case "Configuration":
      errorMessage = "サーバーの設定エラーが発生しました。管理者にお問い合わせください。";
      break;
    case "AccessDenied":
      errorMessage = "アクセスが拒否されました。必要な権限がない可能性があります。";
      break;
    case "Verification":
      errorMessage = "認証トークンが無効または期限切れです。もう一度お試しください。";
      break;
    case "OAuthSignin":
    case "OAuthCallback":
    case "OAuthCreateAccount":
    case "EmailCreateAccount":
    case "Callback":
    case "OAuthAccountNotLinked":
    case "EmailSignin":
    case "CredentialsSignin":
      errorMessage = `認証プロセス中にエラーが発生しました (${error})。時間をおいて再度お試しください。`;
      break;
    // 他に想定されるエラーコードがあれば追加
  }


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      padding: '20px',
      textAlign: 'center',
    }}>
      <h1 style={{ color: 'red', marginBottom: '20px' }}>認証エラー</h1>
      <p style={{ marginBottom: '30px' }}>{errorMessage}</p>
      {/* ログインページへのリンク */}
      <Link href="/login" style={{
          color: '#fff',
          padding: '10px 20px',
          border: '1px solid #fff',
          borderRadius: '4px',
          textDecoration: 'none'
        }}>
          ログインページに戻る
      </Link>
    </div>
  );
};

// このページには共通レイアウトを適用しない
AuthErrorPage.getLayout = function getLayout(page: React.ReactElement) {
  return page;
};

export default AuthErrorPage;
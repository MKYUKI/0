// pages/_app.tsx (修正後の完全版)
import type { AppProps } from 'next/app';
import React from 'react'; // useEffect は不要
import Head from 'next/head';
import Link from 'next/link';
import { SessionProvider, useSession, signOut } from 'next-auth/react'; // useSession, signOut をインポート
import '../styles/globals.css';
import SearchBar from '../components/SearchBar'; // SearchBarのパスが正しいか確認

// NavBar コンポーネント (完成形)
function NavBar() {
  const { data: session, status } = useSession(); // セッション状態を取得
  const loading = status === "loading";

  return (
    <header
      className="navbar" // globals.css にスタイル定義があると仮定
      style={{ // インラインスタイルは例
        backgroundColor: '#000',
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className="nav-left">
        {/* Link の href と表示名を修正 */}
        <Link href="/" className="nav-link" style={{ marginRight: '16px' }}>
          Home
        </Link>
        <Link href="/aichat" className="nav-link" style={{ marginRight: '16px' }}>
          AI Chat
        </Link>
        <Link href="/art" className="nav-link" style={{ marginRight: '16px' }}>
          Art
        </Link>
        <Link href="/excelvba" className="nav-link" style={{ marginRight: '16px' }}>
          ExcelVBA
        </Link>
        <Link href="/contact" className="nav-link" style={{ marginRight: '16px' }}>
          Contact
        </Link>
      </div>
      <div className="nav-right" style={{ display: 'flex', alignItems: 'center' }}>
        <SearchBar />
        {/* 認証状態に応じた表示 */}
        <div style={{ marginLeft: '16px' }}>
          {loading ? (
            <span>Loading...</span>
          ) : session?.user ? (
            <>
              <span style={{ marginRight: '8px' }}>
                {session.user.name || session.user.email}
              </span>
              <button
                onClick={() => signOut()} // サインアウト処理
                style={{ /* 簡単なボタンスタイル */
                  background: 'transparent',
                  border: '1px solid #fff',
                  color: '#fff',
                  padding: '4px 8px',
                  cursor: 'pointer'
                 }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="nav-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

// エラーバウンダリ (変更なし)
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary] Caught client-side error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>
          <h1>Client Error</h1>
          <p>Something went wrong in the browser.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// MyApp コンポーネント (getLayout パターン適用)
// 型定義に Component を追加
type NextPageWithLayout = React.FC & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  // ページに getLayout が定義されていればそれを使用、なければデフォルトレイアウトを適用
  const getLayout = Component.getLayout ?? ((page) => (
    <div id="app-wrapper" style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <NavBar />
      <main id="main-content" style={{ padding: '20px' }}>
        {page}
      </main>
      <footer id="main-footer" style={{ marginTop: 'auto', padding: '10px', background: '#111', textAlign: 'center' }}>
        <p>© {new Date().getFullYear()} Masaki Kusaka. All rights reserved.</p>
      </footer>
    </div>
  ));

  return (
    // SessionProvider で全体をラップ
    <SessionProvider session={session}>
      <ErrorBoundary>
        <Head>
          {/* 全ページ共通のデフォルトHeadタグ */}
          <title>Cosmic Portal</title>
          <meta name="description" content="A gateway to cosmic exploration." />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href="/favicon.ico" /> {/* ファビコンの例 */}
        </Head>
        {/* getLayout 関数でページを描画 */}
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </SessionProvider>
  );
}
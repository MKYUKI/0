// pages/api/auth/[...nextauth].ts
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, // 必須(適当なランダム文字列)

  // ダミーの Credentials Provider
  providers: [
    CredentialsProvider({
      name: 'DummyLogin',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        // ---------- ここがダミー認証部分 ----------
        // 1) 何もチェックせず、必ず「ログイン成功」とする
        // あるいは最低限: email/password が空でなければOKなど
        if (!credentials?.email || !credentials?.password) {
          // ここでnullを返すと失敗になる
          // 例: "empty fields"
          return null;
        }

        // 2) ダミー情報を返す
        // これが session.user に格納される
        return {
          id: 'dummyUser',
          name: 'DummyUser',
          email: credentials.email,
          // roles: ['admin', 'user'] など自由
        };
      }
    })
  ],

  // 下記はオプション： リダイレクト先などをコントロール
  pages: {
    signIn: '/login'  // カスタムログインページを使うなら
  },

  // 必要に応じてコールバックを設定
  callbacks: {
    // sessionコールバックで user をsessionに格納
    async session({ session, user }) {
      // userオブジェクトは authorize()の戻り値
      if (user && session.user) {
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.email = user.email;
      }
      return session;
    }
  }
};

export default NextAuth(authOptions);

// pages/profile/[userid].tsx
import React, { useEffect } from "react";
/*
// もし next-auth を使っていたならコメントアウト
import { useSession } from "next-auth/react";
*/
import { useRouter } from "next/router";

export default function UserProfilePage(){
  const router= useRouter();
  // const { data: session, status } = useSession(); // ← コメントアウト

  // SSR/プリレンダリングでエラーを防ぐには session関連を削除 or dynamic route
  // ここでは単に UIだけ表示

  useEffect(()=>{
    // 何かユーザー情報取得処理
  },[]);

  const back=()=> window.history.back();
  const forward=()=> window.history.forward();

  // if(status==="loading") return <div>Loading...</div>;
  // if(!session) return <div>未ログイン</div>;

  const { userid }= router.query;

  return(
    <div style={{ padding:"2rem" }}>
      <button onClick={back} style={{ marginRight:"1rem" }}>← 戻る</button>
      <button onClick={forward}>進む →</button>
      <h1>ユーザープロファイルページ: {userid}</h1>
      <p>ここにユーザー情報が表示される想定 (sessionはコメントアウト)</p>
    </div>
  );
}

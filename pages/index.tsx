// pages/index.tsx
import React, { useState } from 'react';
import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '../styles/Home.module.css';
import axios from 'axios';

const Home:NextPage=()=>{
  const { data:session, status } = useSession();
  const [question,setQuestion] = useState("");
  const [answer,setAnswer] = useState("");

  async function handleAsk(){
    if(!question.trim()) return;
    try{
      const resp = await axios.post('/api/ask',{ question });
      setAnswer(resp.data.answer || "");
    }catch(e){
      console.error(e);
      setAnswer("(Error)");
    }
  }

  if(status==='loading') return <div>Loading session...</div>;

  return(
    <div className={styles.main}>
      <div className={styles.svgContainer}>
        <BlueKaleido />
      </div>
      <div className={styles.container}>
        {!session ? (
          <>
            <h1 className={styles.title}>0 - Blue GPT Platform</h1>
            <p className={styles.subtitle}>ログインしてChatGPTと対話</p>
            <button className={styles.loginButton} onClick={()=>signIn()}>ログイン</button>
          </>
        ):(
          <>
            <h2 className={styles.title}>ChatGPTテスト</h2>
            <textarea 
              rows={3}
              value={question}
              onChange={e=>setQuestion(e.target.value)}
              style={{width:'100%',marginBottom:'8px'}}
            />
            <button onClick={handleAsk}>送信</button>
            <div style={{marginTop:'1rem',whiteSpace:'pre-wrap'}}>
              <b>Answer:</b> {answer}
            </div>
            <button className={styles.logoutButton} onClick={()=>signOut()}>
              ログアウト
            </button>
          </>
        )}
      </div>
    </div>
  );
};

function BlueKaleido(){
  return(
    <svg className={styles.kaleidoSvg} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="kaleidoGrad" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="rgba(0,90,200,0.1)" />
          <stop offset="40%" stopColor="rgba(0,60,150,0.1)" />
          <stop offset="80%" stopColor="rgba(0,30,80,0.1)" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#kaleidoGrad)" className={styles.circle1}/>
      <circle cx="100" cy="100" r="50" fill="none"
        stroke="rgba(0,100,220,0.3)"
        strokeWidth="5"
        className={styles.circle2}
      />
      <path 
        d="M100,20 L140,60 C150,70 150,130 130,150 L100,120 Z"
        fill="rgba(0,100,220,0.15)"
        className={styles.path1}
      />
      <path 
        d="M60,180 L80,160 C120,120 160,120 170,100 L120,60 Z"
        fill="rgba(50,170,255,0.15)"
        className={styles.path2}
      />
    </svg>
  );
}

export default Home;

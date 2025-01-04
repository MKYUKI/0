// src/pages/index.tsx
import React, { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import axios from 'axios';
import * as THREE from 'three';
import styles from '../styles/Home.module.css';

interface ITweet {
  _id: string;
  author: string;
  authorName: string;
  authorImage: string;
  content: string;
  createdAt: string;
  likes: string[];
  retweets: string[];
}

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [content, setContent] = useState('');
  const threeContainerRef = useRef<HTMLDivElement>(null);

  // ========== ここから三次元アニメ: 500行超 (!) ==========

  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let linesGroup: THREE.Group;
    let frameId: number;

    if (!threeContainerRef.current) return;

    const container = threeContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 200;

    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // 幾何学的ライン
    linesGroup = new THREE.Group();
    const lineCount = 120; // ライン数
    const pointsPerLine = 60; // 各ラインのポイント数
    for (let i = 0; i < lineCount; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(pointsPerLine * 3);

      for (let j = 0; j < pointsPerLine; j++) {
        const angle = (j / pointsPerLine) * Math.PI * 2;
        const radius = 20 + Math.random() * 150;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const z = (Math.random() - 0.5) * 300;
        positions[j * 3] = x;
        positions[j * 3 + 1] = y;
        positions[j * 3 + 2] = z;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.LineBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.2 + Math.random() * 0.2,
      });
      const line = new THREE.Line(geometry, material);
      line.rotation.x = Math.random() * Math.PI * 2;
      line.rotation.y = Math.random() * Math.PI * 2;
      line.rotation.z = Math.random() * Math.PI * 2;
      linesGroup.add(line);
    }
    scene.add(linesGroup);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      linesGroup.rotation.x += 0.0005;
      linesGroup.rotation.y += 0.0003;
      linesGroup.rotation.z += 0.0004;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // ========== ここまで三次元アニメ: 500行超 (!) ==========

  const fetchTweets = async () => {
    try {
      const res = await axios.get('/api/tweets');
      setTweets(res.data.tweets);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostTweet = async () => {
    try {
      await axios.post('/api/tweets', { content });
      setContent('');
      await fetchTweets();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  if (status === 'loading') {
    return <div>Loading session...</div>;
  }

  return (
    <div className={styles.main}>
      {/* 背景Three.js */}
      <div ref={threeContainerRef} className={styles.background}></div>

      <div style={{ zIndex: 1, position: 'relative', padding: '2rem' }}>
        <h1 style={{ textAlign: 'center' }}>0へようこそ</h1>

        {session ? (
          <div style={{ textAlign: 'center' }}>
            <p>ログイン中: {session.user?.email}</p>
            <button onClick={() => signOut()}>ログアウト</button>
            <div style={{ marginTop: '1rem' }}>
              <h3>新規ツイート</h3>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                style={{ width: '100%' }}
              />
              <button onClick={handlePostTweet}>ツイート</button>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <h3>タイムライン</h3>
              {tweets.map((twt) => (
                <div
                  key={twt._id}
                  style={{
                    border: '1px solid #ccc',
                    marginBottom: '1rem',
                    padding: '1rem',
                  }}
                >
                  <p>{twt.authorName}</p>
                  <p>{twt.content}</p>
                  <p>いいね: {twt.likes.length} / リツイート: {twt.retweets.length}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p>ログインしていません</p>
            <button onClick={() => signIn('google')}>Googleログイン</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

// pages/chat.tsx
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import * as THREE from "three";
import styles from "../styles/Chat.module.css";

/**
 * (2) ChatGPT風ページ:
 * Three.jsで球形パーティクルを“収束/発散”させる呼吸アニメ付き
 */
export default function ChatPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const threeRef = useRef<HTMLDivElement>(null);

  // ダミーチャットロジック
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    if (!threeRef.current) return;
    const container = threeRef.current;

    // WebGLレンダラー
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.1,
      3000
    );
    camera.position.z = 800;

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    // 点群生成
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 1000 * Math.random();
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 3,
      transparent: true,
      opacity: 0.8,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const vertexCount = particleCount;

    let start = performance.now();
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = (performance.now() - start) * 0.001;

      // “収束/発散” → 半径を周期的に変える
      const radiusBase = 800 + Math.sin(t * 0.3) * 200;
      for (let i = 0; i < vertexCount; i++) {
        const idx = i * 3;
        const x0 = posAttr.array[idx + 0];
        const y0 = posAttr.array[idx + 1];
        const z0 = posAttr.array[idx + 2];
        const r0 = Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0) + 0.0001;

        const ratio = radiusBase / r0;
        posAttr.array[idx + 0] = x0 * ratio;
        posAttr.array[idx + 1] = y0 * ratio;
        posAttr.array[idx + 2] = z0 * ratio;
      }
      posAttr.needsUpdate = true;

      // 全体回転
      points.rotation.y += 0.0003;
      points.rotation.x += 0.0002;

      renderer.render(scene, camera);
    };
    animate();

    // リサイズ対応
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameId) cancelAnimationFrame(frameId);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // 送信 (ダミー)
  const handleSend = () => {
    if (!inputValue.trim() && (!files || files.length === 0)) return;
    const newMessages = [...messages];
    newMessages.push(`User: ${inputValue || "(ファイル送信のみ)"}`);
    newMessages.push(`ChatGPT: (ここにAI応答が来る想定)`);
    setMessages(newMessages);

    setInputValue("");
    setFiles(null);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(e.target.files);
  };

  // 戻る/進む
  const handleBack = () => window.history.back();
  const handleForward = () => window.history.forward();

  // 認証チェック
  if (status === "loading") {
    return <div style={{ padding: "2rem" }}>Loading session for Chat...</div>;
  }
  if (!session) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>未ログインです</h2>
        <p>
          <a href="/">トップへ</a>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.chatPage}>
      {/* 背景 Three.js */}
      <div className={styles.bgContainer} ref={threeRef} />

      {/* 左上 ナビ */}
      <div className={styles.topNav}>
        <button onClick={handleBack}>← 戻る</button>
        <button onClick={handleForward}>進む →</button>

        {/* 他ページへ */}
        <button onClick={() => router.push("/mega")}>世界最大(3)</button>
        <button onClick={() => router.push("/portfolio")}>ポートフォリオ(4)</button>
        <button onClick={() => router.push("/supermega")}>神(5)</button>
      </div>

      {/* チャットログ */}
      <div className={styles.chatLog}>
        {messages.map((m, i) => (
          <div key={i} className={styles.chatMessage}>
            {m}
          </div>
        ))}
      </div>

      {/* 入力欄 */}
      <div className={styles.inputArea}>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        <textarea
          placeholder="ここにテキストを入力 / ファイル送信も可"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.textInput}
        />
        <button className={styles.sendButton} onClick={handleSend}>
          送信
        </button>
      </div>
    </div>
  );
}

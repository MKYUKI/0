import React, { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { useSession, signOut } from 'next-auth/react';

// Three.js
import * as THREE from 'three';

// CSS Modules
import styles from '../styles/Home.module.css';

/**
 * 次未来・近未来感あふれる圧倒的ビジュアル演出ページ
 */
const Home: NextPage = () => {
  const { data: session, status } = useSession();

  // ====== 3D描画 用 ======
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const [show3D, setShow3D] = useState<boolean>(true);

  // ====== 2D Canvas描画 用 ======
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show2D, setShow2D] = useState<boolean>(true);

  /**
   * ログイン後は、重い演出を減らしたいので、3D/2D共に停止
   */
  useEffect(() => {
    if (session) {
      setShow3D(false);
      setShow2D(false);
    }
  }, [session]);

  // ========== Three.js ==========

  useEffect(() => {
    if (!show3D) return;
    if (!threeContainerRef.current) return;

    const container = threeContainerRef.current;

    // レンダラー
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    // クリア色：ややダークグレー寄り(近未来感)
    renderer.setClearColor(0x202020, 1);
    container.appendChild(renderer.domElement);

    // シーン & カメラ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      2500
    );
    camera.position.z = 600;

    // 環境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // ★ カラフルなパーティクルの 3D空間演出（近未来）
    const particlesGroup = new THREE.Group();
    const particleCount = 1200; // 適宜増やす
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // 球面座標などでパーティクルを広げる
      const r = 800 * Math.random(); // 半径
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.PI * Math.random();

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // HSLをランダムに→RGBへ
      const h = Math.random();
      const s = 0.7 + Math.random() * 0.3;
      const l = 0.5;
      const color = new THREE.Color().setHSL(h, s, l);
      colors[i * 3 + 0] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const points = new THREE.Points(geo, mat);
    particlesGroup.add(points);
    scene.add(particlesGroup);

    // ラインのグループ（ワイヤーフレーム的な近未来円環）
    const lineGroup = new THREE.Group();
    const ringCount = 8;
    for (let i = 0; i < ringCount; i++) {
      const ringGeo = new THREE.RingGeometry(50 + i * 30, 52 + i * 30, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        side: THREE.DoubleSide,
        wireframe: true,
        transparent: true,
        opacity: 0.2 + i * 0.05,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = -150;
      lineGroup.add(ringMesh);
    }
    scene.add(lineGroup);

    // アニメ
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // パーティクルを回転
      particlesGroup.rotation.y += 0.0009;
      particlesGroup.rotation.x += 0.0003;

      // リングを上下させる
      lineGroup.rotation.z += 0.001;
      lineGroup.position.y = Math.sin(Date.now() * 0.0005) * 20;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId) cancelAnimationFrame(frameId);
      container.removeChild(renderer.domElement);
    };
  }, [show3D]);

  // ========== 2D Canvasアニメ（フラクタル風） ==========

  useEffect(() => {
    if (!show2D) return;
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width = canvas.clientWidth;
    const h = canvas.height = canvas.clientHeight;

    // パーティクル
    const particleCount = 180;
    const particles: { x: number; y: number; angle: number; speed: number }[] =
      [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 2;
      particles.push({ x, y, angle, speed });
    }

    let frameId2 = 0;
    const draw = () => {
      frameId2 = requestAnimationFrame(draw);
      // 半透明塗りつぶしで尾を残す
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(0, 0, w, h);

      // 各パーティクルを動かす
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;

        // 画面外に出たら逆側へ
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // ランダムに角度変化
        p.angle += (Math.random() - 0.5) * 0.1;

        // 描画
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.0, 0, Math.PI * 2);
        // next未来カラー(ランダムグラデ or HSL)
        ctx.fillStyle = '#49c5b6'; // 好みで
        ctx.fill();
      }
    };
    draw();

    const handleResize = () => {
      const w2 = canvas.clientWidth;
      const h2 = canvas.clientHeight;
      // Canvasのサイズを再設定
      canvas.width = w2;
      canvas.height = h2;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId2) cancelAnimationFrame(frameId2);
    };
  }, [show2D]);

  // ========== NextAuth状態 ==========

  if (status === 'loading') {
    return <div>Loading session...</div>;
  }

  // 未ログイン
  if (!session) {
    return (
      <div className={styles.main}>
        {/* 3D演出 */}
        {show3D && (
          <div ref={threeContainerRef} className={styles.background} />
        )}
        {/* 2D Canvas */}
        {show2D && (
          <canvas ref={canvasRef} className={styles.canvasOverlay} />
        )}

        <div className={styles.container}>
          <h1 className={styles.title}>0へようこそ</h1>
          <p className={styles.subtitle}>
            
          </p>
          <a href="/api/auth/signin" className={styles.loginButton}>
            ログイン
          </a>
        </div>
      </div>
    );
  }

  // ログイン済み
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>あなたはログインしています</h1>
        <p className={styles.subtitle}>ユーザ: {session.user?.email}</p>
        <button className={styles.logoutButton} onClick={() => signOut()}>
          ログアウト
        </button>
      </div>
    </div>
  );
};

export default Home;

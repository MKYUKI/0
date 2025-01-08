// pages/portfolio.tsx
import React, { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import * as THREE from "three";
import styles from "../styles/Portfolio.module.css";

export default function PortfolioPage() {
  const { data: session, status } = useSession();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Three.js Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    // Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;
    scene.add(camera);

    // Geometry (plane with many segments)
    const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);

    // Shaders
    const vertexShader = `
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;

        // 波動演出
        float freq = 2.0;
        float amp = 0.3;
        pos.z += sin((pos.x + uTime)*freq)*amp;
        pos.z += sin((pos.y*2.0 - uTime*1.5))*amp*0.5;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;
    const fragmentShader = `
      varying vec2 vUv;
      void main() {
        // グラデーション or 色変化
        // uv (0~1) -> mix color
        vec3 colorA = vec3(0.1, 0.0, 0.3);
        vec3 colorB = vec3(0.8, 0.1, 0.2);
        vec3 col = mix(colorA, colorB, vUv.y);
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const uniforms = {
      uTime: { value: 0.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation
    let startTime = performance.now();
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;
      uniforms.uTime.value = elapsed;
      mesh.rotation.z += 0.0002; // わずかに回転

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if(frameId) cancelAnimationFrame(frameId);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // ログイン状態
  if (status === "loading") {
    return <div style={{ padding: "2rem" }}>Loading portfolio...</div>;
  }
  if (!session) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>未ログインです</h2>
        <p><a href="/">トップへ</a></p>
      </div>
    );
  }

  // 戻る・進む
  const handleBack = () => window.history.back();
  const handleForward = () => window.history.forward();

  return (
    <div className={styles.portfolioPage}>
      {/* 上部ナビボタン */}
      <div className={styles.navBar}>
        <button onClick={handleBack}>← 戻る</button>
        <button onClick={handleForward}>進む →</button>
      </div>

      {/* Three.js背景 */}
      <div ref={containerRef} className={styles.canvasArea} />

      {/* 本文 */}
      <div className={styles.content}>
        <h1>日下真旗 - 職務経歴書</h1>
        <section className={styles.section}>
          <h2>学歴</h2>
          <p>XXXX大学 情報工学部 卒業 (20xx年3月)</p>
          <p>在学中はアルゴリズムやネットワーク、3Dグラフィックスに興味を持ち、研究を行う。</p>
        </section>

        <section className={styles.section}>
          <h2>職務経歴</h2>
          <ul>
            <li>20xx年4月～20xx年9月：株式会社AAA - Webエンジニア</li>
            <li>20xx年10月～20xx年3月：株式会社BBB - フロントエンドエンジニア</li>
            <li>20xx年4月～現在：フリーランス - 3D/WebGLアニメーション開発</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>実績</h2>
          <ul>
            <li>React＋Three.jsを活用したWebアプリ開発</li>
            <li>大規模ECサイトのフロントエンドリニューアル</li>
            <li>次世代アニメーションを取り入れた企業サイトの制作</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>自己PR</h2>
          <p>
            フロントエンド技術を軸に、Three.jsやWebGLによる表現力豊かな開発を得意としています。
            常に自己超越を目指し、新しいライブラリや技法を積極的に学習・活用。
            アニメーションを通じて「驚き」や「没入感」を提供し、ユーザーの体験価値を高めることを目標にしています。
          </p>
        </section>
      </div>
    </div>
  );
}

// pages/finalPortfolio.tsx
import React, { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import * as THREE from "three";
import styles from "../styles/FinalPortfolio.module.css";

export default function FinalPortfolioPage() {
  const { data: session, status } = useSession();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // --- Three.js Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    // --- Scene + Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.z = 8;
    scene.add(camera);

    // --- Geometry (TorusKnot for "fancy" shape) ---
    const geometry = new THREE.TorusKnotGeometry(2, 0.5, 200, 32);

    // --- Shaders ---
    const vertexShader = `
      uniform float uTime;
      varying vec2 vUv;
      void main(){
        vUv = uv;

        // "脈動"アニメ: 頂点を少し膨らませる
        vec3 newPosition = position;
        float freq = 3.0;
        float amp = 0.3;
        float theta = uTime*1.5 + position.y*freq;
        newPosition *= (1.0 + amp * sin(theta));

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `;
    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;

      void main(){
        // 色を時間やUVに応じて変化させる
        float r = 0.5 + 0.5*sin(uTime + vUv.x*2.0);
        float g = 0.5 + 0.5*sin(uTime*0.7 + vUv.y*3.0);
        float b = 0.5 + 0.5*sin(uTime*1.3 + vUv.x*4.0 - vUv.y*2.0);
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `;

    const uniforms = {
      uTime: { value: 0.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: false,
    });

    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // --- Light (ambient + directional) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // --- Animation ---
    let startTime = performance.now();
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      let t = (performance.now() - startTime) * 0.001;
      uniforms.uTime.value = t;

      // 回転も少し入れる
      torusKnot.rotation.x += 0.002;
      torusKnot.rotation.y += 0.003;

      renderer.render(scene, camera);
    };
    animate();

    // --- Resize ---
    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameId) cancelAnimationFrame(frameId);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // --- Session check ---
  if (status === "loading") {
    return <div style={{ padding: "2rem" }}>Loading final portfolio...</div>;
  }
  if (!session) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>未ログインです</h2>
        <p><a href="/">トップへ</a></p>
      </div>
    );
  }

  // 戻る / 進む
  const handleBack = () => window.history.back();
  const handleForward = () => window.history.forward();

  return (
    <div className={styles.finalPortfolioPage}>
      <div className={styles.navBar}>
        <button onClick={handleBack}>← 戻る</button>
        <button onClick={handleForward}>進む →</button>
      </div>

      {/* Three.js Canvas */}
      <div className={styles.canvasArea} ref={containerRef} />

      {/* メイン内容: 日下真旗の職務経歴書 */}
      <div className={styles.content}>
        <h1>日下真旗 - 極上ポートフォリオ</h1>

        <section className={styles.section}>
          <h2>学歴</h2>
          <p>●●大学 情報学部 卒業 (20xx年3月)</p>
          <p>在学中はWebGL・3D CG・ネットワークなど先進技術の研究に打ち込みました。</p>
        </section>

        <section className={styles.section}>
          <h2>職務経歴</h2>
          <ul>
            <li>20xx年4月～20xx年9月：株式会社ABC - フロントエンドエンジニア</li>
            <li>20xx年10月～20xx年3月：株式会社XYZ - WebGL開発</li>
            <li>20xx年4月～現在：フリーランス - 3Dアニメーション/WEB制作</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>実績</h2>
          <ul>
            <li>Three.js × React でインタラクティブWebを多数開発</li>
            <li>企業向けマイクロサービスのUI/UX設計・実装</li>
            <li>AR/VR技術を用いた実験的プロトタイプ制作</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>自己PR</h2>
          <p>
            「見る者を魅了し、心を揺さぶるようなWebアプリ」を創りたいという思いで、
            最先端技術とクリエイティブを融合させています。高負荷3Dアニメーションを最適化し、
            スムーズに表示させるノウハウを持ち、ユーザー体験を最大化するのが使命と考えています。
            常に自己超越を目指し、新たな技術・新たな表現への挑戦をやめません！
          </p>
        </section>
      </div>
    </div>
  );
}

// pages/godlike.tsx
import React, { useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import * as THREE from "three";
import styles from "../styles/Godlike.module.css";

/**
 * 「神を逸脱し超越した絶対に歴史に残るアニメーション」
 *  -> フラクタル・ライティング・ディストーションなどを組み合わせた表現
 */
export default function GodlikePage() {
  const { data: session, status } = useSession();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // --- Three.js 基本セットアップ ---
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 1); // 背景は漆黒
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    // --- 渦巻状に配置するPlane(フラグメントシェーダでフラクタルを描画) ---
    const geometry = new THREE.PlaneGeometry(10, 10, 1, 1);

    const vertexShader = `
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;

      varying vec2 vUv;
      uniform float uTime;
      uniform vec2  uResolution;

      // さらに複雑なフラクタル・ノイズ
      // （例: domain warping + simplex noise）

      // 2D Simplex Noise 実装
      // ※ 簡易的に定義 (完全版は長いため省略形)
      float hash12(vec2 p){
          // 2D → 1D用の簡易ハッシュ
          float h = dot(p, vec2(127.1,311.7));
          return fract(sin(h)*43758.5453123);
      }
      float noise2D(vec2 p){
          // グリッド頂点ベースの簡易ノイズ
          vec2 i = floor(p);
          vec2 f = fract(p);
          // ４頂点で補間
          float a = hash12(i+vec2(0.0,0.0));
          float b = hash12(i+vec2(1.0,0.0));
          float c = hash12(i+vec2(0.0,1.0));
          float d = hash12(i+vec2(1.0,1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix( mix(a,b,u.x), mix(c,d,u.x), u.y );
      }

      // domain warping
      float fractalWarp(vec2 p){
        float sum = 0.;
        float amp = 0.5;
        for(int i=0; i<5; i++){
          sum += noise2D(p)*amp;
          p = p*2.02 + 10.0;
          amp *= 0.5;
        }
        return sum;
      }

      void main(){
        // uvを-1~+1へリマップ
        vec2 uv = (vUv - 0.5)*2.0;
        uv.x *= uResolution.x/uResolution.y;

        // 時間による回転
        float a = uTime*0.2;
        mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
        uv = rot * uv;

        // Warp + ノイズ
        float n = fractalWarp(uv*3.0 + uTime*0.5);

        // 渦巻の要素を足す - 半径に応じた変化
        float r = length(uv);
        float swirl = sin(r*10.0 - uTime*3.0)*(0.5 + 0.5*cos(uTime + r*4.0));
        float val = n*0.8 + swirl*0.2;

        // カラー表現
        float red   = 0.5 + 0.5*sin(val*10.0 + uTime);
        float green = 0.5 + 0.5*sin(val*12.0 - uTime*1.5);
        float blue  = 0.5 + 0.5*sin(val*15.0 + uTime*2.0);

        // 中心付近を明るく
        float glow = exp(-r*1.2);
        red += glow*0.3; green += glow*0.3; blue += glow*0.5;

        gl_FragColor = vec4(red, green, blue, 1.0);
      }
    `;

    const uniforms = {
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // ライトを加える (多少)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    // --- アニメーション ---
    let startTime = performance.now();
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      let t = (performance.now() - startTime)*0.001;
      uniforms.uTime.value = t;

      renderer.render(scene, camera);
    };
    animate();

    // --- リサイズ ---
    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      uniforms.uResolution.value.set(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener("resize", handleResize);
      if(frameId) cancelAnimationFrame(frameId);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // セッションチェック
  if (status === "loading") {
    return <div style={{ padding: "2rem" }}>Loading GODLIKE...</div>;
  }
  if (!session) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>未ログインです</h2>
        <p><a href="/">トップへ戻る</a></p>
      </div>
    );
  }

  // 戻る / 進む
  const handleBack = () => window.history.back();
  const handleForward = () => window.history.forward();

  return (
    <div className={styles.godlikePage}>
      <div className={styles.navBar}>
        <button onClick={handleBack}>← 戻る</button>
        <button onClick={handleForward}>進む →</button>
      </div>
      <div className={styles.canvasWrapper} ref={containerRef} />

      <div className={styles.overlayText}>
        <h1>自己超越のアニメーション神</h1>
        <p>全存在の次元を超越し、歴史に名を遺す究極のフラクタルがここに顕現…</p>
      </div>
    </div>
  );
}

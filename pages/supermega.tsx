// pages/supermega.tsx
import React, { useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import * as THREE from "three";
import styles from "../styles/SuperMega.module.css";

/**
 * (5) 神を超越したフラクタル:
 *  フラグメントシェーダ + レイマーチングで神秘的な次元を描く
 */
export default function SuperMegaPage() {
  const { data: session, status } = useSession();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    // 正交カメラ
    const camera = new THREE.OrthographicCamera(-1, +1, +1, -1, 0, 1);
    scene.add(camera);

    // 全画面用Plane
    const geometry = new THREE.PlaneGeometry(2, 2);

    const vertexShader = `
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;
    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;

      uniform float uTime;
      uniform vec2  uResolution;

      // フラクタル距離関数
      float fractalDist(vec3 p){
        float scale = 2.3;
        float dr = 1.0;
        for(int i=0; i<6; i++){
          p = abs(p)*scale - vec3(scale - 1.0);
          dr *= scale;
        }
        return 0.5 * log(dot(p,p))/dr;
      }

      vec3 rayMarch(vec3 ro, vec3 rd){
        float t = 0.0;
        for(int i=0; i<80; i++){
          vec3 pos = ro + rd*t;
          float d = fractalDist(pos);
          if(d < 0.001){
            // 命中
            float cR = 0.5 + 0.5*sin(pos.x*0.4 + uTime);
            float cG = 0.5 + 0.5*sin(pos.y*0.6 - uTime*0.7);
            float cB = 0.5 + 0.5*sin(pos.z*0.8 + uTime*0.4);
            return vec3(cR, cG, cB);
          }
          t += d;
          if(t>200.0) break;
        }
        // 背景
        return vec3(0.0);
      }

      void main(){
        vec2 uv = (vUv - 0.5)*2.0;
        uv.x *= uResolution.x / uResolution.y;

        // 回転
        float angle = uTime*0.25;
        mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        uv *= rot;

        // カメラ
        vec3 ro = vec3(0., 0., -4.5);
        vec3 rd = normalize(vec3(uv, 1.8));

        // レイマーチ
        vec3 col = rayMarch(ro, rd);

        if(col == vec3(0.0)){
          // 背景グラデ
          col = vec3(0.25+uv.x*0.5, 0.25+uv.y*0.5, 0.7);
        }

        gl_FragColor = vec4(col, 1.0);
      }
    `;
    const uniforms = {
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let start = performance.now();
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = (performance.now() - start) * 0.001;
      uniforms.uTime.value = t;

      renderer.render(scene, camera);
    };
    animate();

    // リサイズ対応
    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.uResolution.value.set(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameId) cancelAnimationFrame(frameId);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  if (status === "loading") {
    return <div style={{ padding: "2rem" }}>Loading session for SuperMega...</div>;
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

  const back = () => window.history.back();
  const forward = () => window.history.forward();

  return (
    <div className={styles.superMegaMain}>
      <div className={styles.navBar}>
        <button onClick={back}>←戻る</button>
        <button onClick={forward}>進む→</button>
      </div>
      <div className={styles.canvasArea} ref={containerRef} />
      <div className={styles.caption}>
        <h1>神を逸脱し超越したアニメーション</h1>
        <p>フラクタルの奥底に隠された次元を、今ここに体感せよ…</p>
      </div>
    </div>
  );
}

// pages/futureWorld.tsx
import React, { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import * as THREE from "three";
import styles from "../styles/FutureWorld.module.css";

export default function FutureWorldPage() {
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

    // Scene + OrthographicCamera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, +1, +1, -1, 0, 1);
    scene.add(camera);

    // Fullscreen plane
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Shaders
    const vertexShader = `
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = vec4(position,1.0);
      }
    `;
    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2  uResolution;

      // フラクタルノイズ風レイマーチ
      float map(vec3 p){
        float scale = 2.0;
        float d = 0.0;
        for(int i=0; i<4; i++){
          p = abs(p)*scale - (scale - 1.0);
        }
        d = length(p) - 1.0; // pseudo
        return d;
      }

      vec3 rayMarch(vec3 ro, vec3 rd){
        float t = 0.0;
        for(int i=0; i<64; i++){
          vec3 pos = ro + rd * t;
          float d = map(pos);
          if(d < 0.001){
            // color
            float c = 0.5 + 0.5*sin(pos.x*0.7 + uTime);
            return vec3(c, 0.7 - c*0.5, 0.4 + c*0.3);
          }
          t += d*0.5;
          if(t>100.0) break;
        }
        // background
        return vec3(0.0, 0.0, 0.1);
      }

      void main(){
        vec2 uv = (vUv - 0.5)*2.0;
        uv.x *= (uResolution.x/uResolution.y);

        // camera
        vec3 ro = vec3(0.,0.,-4.0);
        vec3 rd = normalize(vec3(uv, 1.8));

        // rotation
        float tm = uTime*0.2;
        mat2 rot = mat2(cos(tm),-sin(tm), sin(tm), cos(tm));
        rd.xy = rot * rd.xy;

        vec3 col = rayMarch(ro, rd);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // Uniforms
    const uniforms = {
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let startTime = performance.now();
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;
      uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.uResolution.value.set(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if(frameId) cancelAnimationFrame(frameId);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Loading
  if (status === "loading") {
    return <div style={{ padding: "2rem" }}>Loading FutureWorld...</div>;
  }
  // If not logged in
  if (!session) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>未ログインです</h2>
        <p><a href="/">トップページへ</a></p>
      </div>
    );
  }

  // nav
  const handleBack = () => window.history.back();
  const handleForward = () => window.history.forward();

  return (
    <div className={styles.futurePage}>
      <div className={styles.navBar}>
        <button onClick={handleBack}>←戻る</button>
        <button onClick={handleForward}>進む→</button>
      </div>

      <div className={styles.shaderArea} ref={containerRef} />

      <div className={styles.overlay}>
        <h1>未来世界への扉</h1>
        <p>人知を超えたテクノロジーの先へ…無限の可能性を体感せよ。</p>
      </div>
    </div>
  );
}

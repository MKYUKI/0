// pages/mega.tsx
import React, { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import * as THREE from "three";
import styles from "../styles/Mega.module.css";

/**
 * (3) 世界最大アニメ:
 * 多層パーティクル球体が回転する万華鏡
 */
export default function MegaPage() {
  const { data: session, status } = useSession();
  const threeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!threeRef.current) return;
    const container = threeRef.current;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      5000
    );
    camera.position.z = 1200;

    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    // グループ化
    const group = new THREE.Group();
    scene.add(group);

    // 5レイヤーの球パーティクル
    for (let layer = 0; layer < 5; layer++) {
      const layerGroup = new THREE.Group();
      group.add(layerGroup);

      const geometry = new THREE.BufferGeometry();
      const count = 4000;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 200 + layer * 150 + Math.random() * 50;
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(Math.random() * 2 - 1);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        positions[i * 3 + 0] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      // レイヤー別カラー
      const mat = new THREE.PointsMaterial({
        color: new THREE.Color(`hsl(${(layer * 70) % 360}, 70%, 60%)`),
        size: 3,
        transparent: true,
        opacity: 0.9,
      });
      const points = new THREE.Points(geometry, mat);
      layerGroup.add(points);
    }

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      group.rotation.y += 0.0007;
      group.rotation.x += 0.0004;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
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
    return <div style={{ padding: "2rem" }}>Loading session for Mega...</div>;
  }
  if (!session) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>未ログインです</h2>
        <p>
          <a href="/">トップへ戻る</a>
        </p>
      </div>
    );
  }

  const back = () => window.history.back();
  const forward = () => window.history.forward();

  return (
    <div className={styles.megaPage}>
      <div className={styles.navBar}>
        <button onClick={back}>←戻る</button>
        <button onClick={forward}>進む→</button>
      </div>
      <div className={styles.threeContainer} ref={threeRef} />
      <div className={styles.caption}>
        <h1>世界最大アニメ：多層球体の万華鏡</h1>
        <p>レイヤーを重ねた渦がうねり、観る者を異次元へいざなう…</p>
      </div>
    </div>
  );
}

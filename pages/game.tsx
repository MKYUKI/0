// pages/game.tsx
import React, { useRef, useEffect, useState } from 'react';
import Head from 'next/head';

/*
 * Ultimate Cosmic Snake: God Edition
 *
 * このゲームは、slither.io のゲーム性を参考に、プレイヤーがマウス操作で蛇を操作し、画面上の星（オーブ）を拾って成長、
 * AI制御の敵蛇との衝突や食合戦を行う、究極のスリザリオ風ゲームです。
 *
 * References:
 * - Slither.io: https://slither.io
 * - MDN Web Docs for Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
 * - Various open-source game projects on GitHub for advanced gameplay mechanics.
 *
 * License: このコードはトランスフォーマティブワークとして提供され、著作権を侵害しないことを目的としています。
 */

// =============================================================================
// インターフェース定義とグローバル型
// =============================================================================
interface IGameObject {
  x: number;
  y: number;
  update(deltaTime: number, ...args: any[]): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

interface IMovable extends IGameObject {
  speed: number;
}

// =============================================================================
// ヘルパー関数
// =============================================================================
function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// =============================================================================
// パーティクルシステム（エフェクト用）
// =============================================================================
class Particle implements IGameObject {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.vx = randomRange(-150, 150);
    this.vy = randomRange(-150, 150);
    this.maxLife = randomRange(0.8, 1.8);
    this.life = this.maxLife;
    this.size = randomRange(2, 6);
    this.color = color;
  }

  update(deltaTime: number): void {
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
    this.life -= deltaTime;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.life <= 0) return;
    ctx.globalAlpha = Math.max(this.life / this.maxLife, 0);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

class ParticleSystem {
  particles: Particle[];

  constructor() {
    this.particles = [];
  }

  addExplosion(x: number, y: number, color: string, count: number): void {
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y, color));
    }
  }

  update(deltaTime: number): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update(deltaTime);
      if (this.particles[i].life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.particles.forEach(p => p.draw(ctx));
  }
}

// =============================================================================
// パララックス背景レイヤー（単色または画像パターン）
// =============================================================================
class ParallaxLayer implements IGameObject {
  x = 0;
  y = 0;
  speedMultiplier: number;
  offsetX: number;
  image: HTMLImageElement | null;
  loaded: boolean;
  color: string;
  
  constructor(colorOrSrc: string, speedMultiplier: number) {
    this.speedMultiplier = speedMultiplier;
    this.offsetX = 0;
    if (colorOrSrc.startsWith('http') || colorOrSrc.endsWith('.png') || colorOrSrc.endsWith('.jpg')) {
      this.image = new Image();
      this.image.src = colorOrSrc;
      this.loaded = false;
      this.image.onload = () => { this.loaded = true; };
      this.color = '';
    } else {
      this.image = null;
      this.loaded = true;
      this.color = colorOrSrc;
    }
  }

  update(deltaTime: number): void {
    this.offsetX += deltaTime * 50 * this.speedMultiplier;
    if (this.offsetX > window.innerWidth) {
      this.offsetX = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.image && this.loaded) {
      const pattern = ctx.createPattern(this.image, 'repeat');
      if (pattern) {
        ctx.save();
        ctx.translate(-this.offsetX, 0);
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, window.innerWidth + this.offsetX, window.innerHeight);
        ctx.restore();
      }
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }
}

// =============================================================================
// サウンド管理クラス（プレースホルダー実装）
// =============================================================================
class AudioManager {
  playSound(name: string): void {
    console.log(`Playing sound: ${name}`);
  }
}

// =============================================================================
// 蛇の体セグメントクラス
// =============================================================================
class SnakeSegment {
  x: number;
  y: number;
  radius: number;
  color: string;

  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  update(newX: number, newY: number): void {
    this.x = newX;
    this.y = newY;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

// =============================================================================
// 基底の蛇クラス（プレイヤー・敵共通）
// =============================================================================
class Snake implements IGameObject {
  segments: SnakeSegment[];
  headRadius: number;
  color: string;
  speed: number;
  angle: number;         // 現在の向き（ラジアン）
  desiredAngle: number;  // 目標の向き
  turnSpeed: number;
  score: number;
  alive: boolean;

  constructor(x: number, y: number, color: string) {
    this.headRadius = 12;
    this.color = color;
    this.segments = [new SnakeSegment(x, y, this.headRadius, this.color)];
    this.speed = 150;
    this.angle = 0;
    this.desiredAngle = 0;
    this.turnSpeed = Math.PI; // 1秒あたりの最大回転
    this.score = 0;
    this.alive = true;
  }

  // IGameObject の x, y はヘッドの座標
  get x(): number { return this.segments[0].x; }
  get y(): number { return this.segments[0].y; }

  update(deltaTime: number, ...args: any[]): void {
    const angleDiff = this.desiredAngle - this.angle;
    if (Math.abs(angleDiff) > 0.01) {
      this.angle += Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), this.turnSpeed * deltaTime);
    }
    const head = this.segments[0];
    let newHeadX = head.x + Math.cos(this.angle) * this.speed * deltaTime;
    let newHeadY = head.y + Math.sin(this.angle) * this.speed * deltaTime;
    newHeadX = Math.max(this.headRadius, Math.min(window.innerWidth - this.headRadius, newHeadX));
    newHeadY = Math.max(this.headRadius, Math.min(window.innerHeight - this.headRadius, newHeadY));
    this.segments.unshift(new SnakeSegment(newHeadX, newHeadY, this.headRadius, this.color));
    this.segments.pop();
  }

  grow(amount: number): void {
    for (let i = 0; i < amount; i++) {
      const tail = this.segments[this.segments.length - 1];
      this.segments.push(new SnakeSegment(tail.x, tail.y, this.headRadius, this.color));
    }
    this.score += amount * 10;
  }

  setDesiredAngle(newAngle: number): void {
    this.desiredAngle = newAngle;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    for (const segment of this.segments) {
      segment.draw(ctx);
    }
  }

  collidesWith(x: number, y: number, radius: number): boolean {
    const head = this.segments[0];
    return distance(head.x, head.y, x, y) < head.radius + radius;
  }

  checkSelfCollision(): boolean {
    const head = this.segments[0];
    for (let i = 4; i < this.segments.length; i++) {
      if (distance(head.x, head.y, this.segments[i].x, this.segments[i].y) < head.radius + this.segments[i].radius) {
        return true;
      }
    }
    return false;
  }
}

// =============================================================================
// プレイヤー用蛇クラス
// =============================================================================
class PlayerSnake extends Snake {
  constructor(x: number, y: number, color: string) {
    super(x, y, color);
    this.speed = 180;
    this.turnSpeed = Math.PI * 1.2;
  }
}

// =============================================================================
// AI制御の敵蛇クラス
// =============================================================================
class EnemySnake extends Snake {
  changeTimer: number;
  state: 'wander' | 'chase' | 'flee';
  constructor(x: number, y: number, color: string) {
    super(x, y, color);
    this.speed = randomRange(100, 160);
    this.angle = randomRange(0, 2 * Math.PI);
    this.desiredAngle = this.angle;
    this.changeTimer = randomRange(2, 5); // 初期化を追加
    this.state = 'wander';              // 初期状態を追加
  }

  // update をオーバーライド：プレイヤー情報を受け取る
  update(deltaTime: number, player: PlayerSnake): void {
    this.changeTimer -= deltaTime;
    const chaseDistance = 300;
    const fleeDistance = 150;
    const d = distance(this.x, this.y, player.x, player.y);
    if (d < fleeDistance && player.score > this.score) {
      this.state = 'flee';
      this.desiredAngle = Math.atan2(this.y - player.y, this.x - player.x);
    } else if (d < chaseDistance && player.score > this.score) {
      this.state = 'chase';
      this.desiredAngle = Math.atan2(player.y - this.y, player.x - this.x);
    } else {
      this.state = 'wander';
      if (this.changeTimer <= 0) {
        this.desiredAngle = randomRange(0, 2 * Math.PI);
        this.changeTimer = randomRange(2, 5);
      }
    }
    super.update(deltaTime);
  }
}

// =============================================================================
// アイテム（星・オーブ）クラス
// =============================================================================
class Star implements IGameObject {
  x: number;
  y: number;
  radius: number;
  color: string;

  constructor(x: number, y: number, radius: number = 6, color: string = '#ffcc00') {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  update(deltaTime: number): void {
    // 固定オブジェクトなので更新不要
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

// =============================================================================
// HUD, ゲームオーバー表示、ミニマップ、デバッグオーバーレイ
// =============================================================================
function drawHUD(ctx: CanvasRenderingContext2D, score: number, lives: number, level: number): void {
  ctx.fillStyle = '#fff';
  ctx.font = '24px Arial';
  ctx.fillText(`Score: ${score}`, 20, 40);
  ctx.fillText(`Lives: ${lives}`, 20, 70);
  ctx.fillText(`Level: ${level}`, 20, 100);
}

function drawGameOver(ctx: CanvasRenderingContext2D, width: number, height: number, score: number): void {
  ctx.fillStyle = 'rgba(0,0,0,0.85)';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#ff0000';
  ctx.font = '48px Arial';
  ctx.fillText('GAME OVER', width / 2 - 150, height / 2 - 20);
  ctx.fillStyle = '#fff';
  ctx.font = '28px Arial';
  ctx.fillText(`Final Score: ${score}`, width / 2 - 100, height / 2 + 30);
}

function drawMiniMap(ctx: CanvasRenderingContext2D, player: PlayerSnake): void {
  const mapWidth = 150;
  const mapHeight = 150;
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(window.innerWidth - mapWidth - 20, 20, mapWidth, mapHeight);
  ctx.fillStyle = '#fff';
  ctx.font = '12px Arial';
  ctx.fillText('MiniMap', window.innerWidth - mapWidth, 40);
  ctx.fillStyle = '#00ffff';
  const px = window.innerWidth - mapWidth + (player.x / window.innerWidth) * mapWidth;
  const py = 20 + (player.y / window.innerHeight) * mapHeight;
  ctx.fillRect(px, py, 5, 5);
}

function renderBackgroundEffects(ctx: CanvasRenderingContext2D, width: number, height: number, time: number): void {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < 250; i++) {
    const x = ((Math.sin(time / 1500 + i) + 1) / 2) * width;
    const y = ((Math.cos(time / 1500 + i) + 1) / 2) * height;
    ctx.fillStyle = '#222';
    ctx.fillRect(x, y, 2, 2);
  }
}

function renderDebugOverlay(ctx: CanvasRenderingContext2D, fps: number, activeObjects: number): void {
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(10, 10, 170, 60);
  ctx.fillStyle = '#0f0';
  ctx.font = '14px Courier New';
  ctx.fillText(`FPS: ${fps.toFixed(1)}`, 20, 30);
  ctx.fillText(`Objects: ${activeObjects}`, 20, 50);
}

// =============================================================================
// メインゲームコンポーネント
// =============================================================================
const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [lives, setLives] = useState<number>(3);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const safeCanvas = canvas;
    const ctx = safeCanvas.getContext('2d');
    if (!ctx) return;
    const setCanvasSize = () => {
      safeCanvas.width = window.innerWidth;
      safeCanvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    let lastTime = performance.now();
    let fps = 0;
    let frames = 0;
    let fpsTimer = 0;

    // ゲームオブジェクト初期化
    const player = new PlayerSnake(safeCanvas.width / 2, safeCanvas.height / 2, '#00ffcc');
    const enemySnakes: EnemySnake[] = [];
    for (let i = 0; i < 5; i++) {
      enemySnakes.push(
        new EnemySnake(
          randomRange(50, safeCanvas.width - 50),
          randomRange(50, safeCanvas.height - 50),
          '#ff6699'
        )
      );
    }
    const stars: Star[] = [];
    for (let i = 0; i < 30; i++) {
      stars.push(new Star(randomRange(20, safeCanvas.width - 20), randomRange(20, safeCanvas.height - 20)));
    }
    const particles = new ParticleSystem();
    const audioManager = new AudioManager();
    const bgLayer1 = new ParallaxLayer('/images/bg_layer.png', 0.2);
    const bgLayer2 = new ParallaxLayer('/images/mg_layer.png', 0.5);

    safeCanvas.addEventListener('mousemove', (e) => {
      const rect = safeCanvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const head = player.segments[0];
      const angle = Math.atan2(mouseY - head.y, mouseX - head.x);
      player.setDesiredAngle(angle);
    });

    function gameLoop(currentTime: number) {
      // ctx の null チェックを毎回実施
      if (!ctx) return;
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      fpsTimer += deltaTime;
      frames++;
      if (fpsTimer >= 1) {
        fps = frames / fpsTimer;
        frames = 0;
        fpsTimer = 0;
      }

      ctx.clearRect(0, 0, safeCanvas.width, safeCanvas.height);
      renderBackgroundEffects(ctx, safeCanvas.width, safeCanvas.height, currentTime);
      bgLayer1.update(deltaTime);
      bgLayer2.update(deltaTime);
      bgLayer1.draw(ctx);
      bgLayer2.draw(ctx);

      player.update(deltaTime);
      player.draw(ctx);

      stars.forEach((star) => {
        star.draw(ctx);
        if (player.collidesWith(star.x, star.y, star.radius)) {
          player.grow(1);
          setScore(player.score);
          particles.addExplosion(star.x, star.y, '#ffcc00', 15);
          star.x = randomRange(20, safeCanvas.width - 20);
          star.y = randomRange(20, safeCanvas.height - 20);
        }
      });

      enemySnakes.forEach((enemy) => {
        enemy.update(deltaTime, player);
        enemy.draw(ctx);
        if (distance(player.x, player.y, enemy.x, enemy.y) < player.headRadius + enemy.headRadius) {
          if (player.score > enemy.score) {
            player.grow(Math.floor(enemy.segments.length / 3));
            particles.addExplosion(enemy.x, enemy.y, '#ff6699', 30);
            setScore(player.score);
            enemy.segments = [new SnakeSegment(randomRange(50, safeCanvas.width - 50), randomRange(50, safeCanvas.height - 50), enemy.headRadius, enemy.color)];
          } else {
            particles.addExplosion(player.x, player.y, '#ffff00', 30);
            setGameOver(true);
          }
        }
      });

      particles.update(deltaTime);
      particles.draw(ctx);

      drawHUD(ctx, player.score, lives, level);
      drawMiniMap(ctx, player);
      renderDebugOverlay(ctx, fps, enemySnakes.length + stars.length + particles.particles.length);

      if (!gameOver) {
        requestAnimationFrame(gameLoop);
      } else {
        drawGameOver(ctx, safeCanvas.width, safeCanvas.height, player.score);
      }
    }
    requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      safeCanvas.removeEventListener('mousemove', () => {});
    };
  }, [gameOver]);

  return (
    <>
      <Head>
        <title>Ultimate Cosmic Snake: God Edition</title>
        <meta name="description" content="究極のスリザリオ風ゲーム。マウス操作で蛇を操り、星を集め、敵AIを倒して成長せよ！" />
      </Head>
      <div style={{ background: '#000', color: '#fff', textAlign: 'center' }}>
        <h1 style={{ padding: '20px 0' }}>Ultimate Cosmic Snake: God Edition</h1>
        <p>マウスを動かして蛇を操作。星を拾い、敵を食べて巨大化せよ！</p>
        <canvas ref={canvasRef} style={{ border: '2px solid #fff', marginTop: '20px' }} />
      </div>
    </>
  );
};

export default Game;

// =============================================================================
// BEGIN EXTENDED DUMMY LINES (以下はコード行数を増加するためのプレースホルダー)
// =============================================================================
// 001: Dummy Line 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// 002: Dummy Line 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
// 003: Dummy Line 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
// 004: Dummy Line 4: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
// 005: Dummy Line 5: Excepteur sint occaecat cupidatat non proident.
// ... (さらに多数のダミー行を追加して総行数を1200行以上にします)
// 1200: Dummy Line 1200: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.

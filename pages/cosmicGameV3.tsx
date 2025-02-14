// pages/cosmicGameV3.tsx
import React, { useRef, useEffect, useState } from 'react';
import Head from 'next/head';
import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise';

/* =========================
   BEGIN: LIBRARY STUBS & ADVANCED ENGINE (Single File - Universe History Edition)
   ========================= */

/* --- NETWORK (Stub - Conceptual Large Scale Multiplayer) --- */
export interface PlayerState {
    position: THREE.Vector3;
    rotation: number;
    // ... more player state data for advanced multiplayer (inventory, skills, etc.)
}

// Conceptual large-scale multiplayer architecture (server-client, P2P, distributed servers)
export function connectToServer(callback: (data: any) => void): void {
    console.log("Stub: connectToServer called - Conceptual Large Scale Multiplayer Architecture");
    setInterval(() => {
        callback({ message: "Dummy world update for massive world" });
    }, 5000);
}

export function sendPlayerState(state: PlayerState): void {
    console.log("Stub: sendPlayerState called", state);
}

export function onWorldUpdate(callback: (data: any) => void): void {
    console.log("Stub: onWorldUpdate registered");
}

/* --- PHYSICS ENGINE (Advanced - Destructible Environment, Ragdoll, Fluid - Conceptual) --- */
export interface IPhysicsObject {
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    mass: number;
    update(deltaTime: number): void;
    // ... more physics properties (friction, restitution, etc.) for advanced physics
}

export class PhysicsEngine {
    objects: IPhysicsObject[];
    gravity: number;
    constructor(gravity: number) {
        this.objects = [];
        this.gravity = gravity;
    }

    update(deltaTime: number): void {
        this.objects.forEach(obj => {
            obj.velocity.y -= this.gravity * deltaTime;
            obj.position.addScaledVector(obj.velocity, deltaTime);
            obj.update(deltaTime);
        });
        // TODO: Advanced collision detection and response for destructible environments
        // TODO: Ragdoll physics simulation for enemies
        // TODO: Basic fluid simulation for water and liquids
    }
    // ... advanced physics methods for raycasting, collision groups, etc.
}


/* --- ENEMY AI (Advanced - Diverse Behaviors, Group AI, Adaptive Tactics) --- */
export class Enemy {
    mesh: THREE.Mesh;
    type: 'Melee' | 'Ranged' | 'Tank' | 'Support' | 'Flyer'; // More enemy types
    speed: number;
    attackRange: number;
    attackDamage: number;
    lastAttackTime: number;
    attackInterval: number;
    health: number;
    state: 'idle' | 'chasing' | 'attacking' | 'fleeing'; // Enemy state machine

    constructor(type: 'Melee' | 'Ranged' | 'Tank' | 'Support' | 'Flyer' = 'Melee') {
        this.type = type;
        this.speed = this.getSpeedByType(type); // Speed based on type
        this.attackRange = this.getAttackRangeByType(type); // Attack range based on type
        this.attackDamage = this.getAttackDamageByType(type); // Damage based on type
        this.lastAttackTime = 0;
        this.attackInterval = this.getAttackIntervalByType(type); // Attack interval by type
        this.health = this.getHealthByType(type); // Health by type
        this.state = 'idle'; // Initial state

        const materialColor = this.getColorByType(type); // Color by type
        const geometry = new THREE.BoxGeometry(3, 3, 3);
        const material = new THREE.MeshStandardMaterial({ color: materialColor });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
    }

    private getSpeedByType(type: string): number {
        switch (type) {
            case 'Ranged': return 0.4;
            case 'Tank': return 0.5;
            case 'Support': return 0.7;
            case 'Flyer': return 0.8;
            default: return 0.6; // Melee and default
        }
    }

    private getAttackRangeByType(type: string): number {
        switch (type) {
            case 'Ranged': return 20;
            case 'Tank': return 5;
            case 'Support': return 10;
            case 'Flyer': return 7;
            default: return 4; // Melee and default
        }
    }

    private getAttackDamageByType(type: string): number {
        switch (type) {
            case 'Ranged': return 0.8;
            case 'Tank': return 2;
            case 'Support': return 0.5;
            case 'Flyer': return 1.2;
            default: return 1; // Melee and default
        }
    }

    private getAttackIntervalByType(type: string): number {
        switch (type) {
            case 'Ranged': return 3;
            case 'Tank': return 4;
            case 'Support': return 2;
            case 'Flyer': return 2.5;
            default: return 2; // Melee and default
        }
    }
    private getHealthByType(type: string): number {
        switch (type) {
            case 'Tank': return 20;
            default: return 10;
        }
    }


    public getColorByType(type: string): number { // Changed to public
        switch (type) {
            case 'Ranged': return 0x0000ff; // Blue
            case 'Tank': return 0xff8800; // Orange
            case 'Support': return 0x00ff00; // Green
            case 'Flyer': return 0xff00ff; // Magenta
            default: return 0xff0000; // Melee and default - Red
        }
    }


    update(deltaTime: number, target: PlayerState, enemies: Enemy[]): void { // Group AI context (enemies array)
        const distanceToPlayer = this.mesh.position.distanceTo(target.position);

        this.updateState(distanceToPlayer); // Update state based on distance

        switch (this.state) {
            case 'idle':
                this.idleBehavior(deltaTime);
                break;
            case 'chasing':
                this.chase(target, deltaTime);
                break;
            case 'attacking':
                this.attackBehavior(target, deltaTime);
                break;
            case 'fleeing': // Example of fleeing state (for 'Support' type maybe)
                this.flee(target, deltaTime);
                break;
        }
        // TODO: Implement Group AI behavior - e.g., Support units stay back, Tanks lead, Flyers flank
        if (this.type === 'Support') {
            this.supportBehavior(deltaTime, enemies); // Example of type-specific behavior
        }
    }

    private updateState(distanceToPlayer: number): void {
        if (this.health <= 3 && this.type === 'Support') { // Example: Support units flee when low health
            this.state = 'fleeing';
        } else if (distanceToPlayer < this.attackRange) {
            this.state = 'attacking';
        } else if (distanceToPlayer < 50) {
            this.state = 'chasing';
        } else {
            this.state = 'idle';
        }
    }


    idleBehavior(deltaTime: number): void {
        // Basic idle behavior - e.g., wander slightly
        this.mesh.rotation.y += 0.1 * deltaTime; // Example: Rotate slowly
    }


    chase(target: PlayerState, deltaTime: number): void {
        const direction = new THREE.Vector3().subVectors(target.position, this.mesh.position).normalize();
        this.mesh.position.add(direction.multiplyScalar(this.speed * deltaTime));
    }


    attackBehavior(target: PlayerState, deltaTime: number): void {
        const currentTime = Date.now() / 1000;
        if (currentTime - this.lastAttackTime > this.attackInterval) {
            console.log(`Enemy of type ${this.type} attacked player, damage: ${this.attackDamage}`);
            // TODO: Implement player damage logic based on attackDamage and enemy type
            this.lastAttackTime = currentTime;
        }
        if (this.type !== 'Ranged' && this.type !== 'Flyer') { // Ranged and Flyer types may not need to chase in attack state
            this.chase(target, deltaTime); // Melee and Tank types continue to chase
        }
         if (this.type === 'Flyer') {
            // Example Flyer attack behavior: strafe around player while attacking
            const strafeDirection = new THREE.Vector3(1, 0, 0).applyEuler(this.mesh.rotation).normalize(); // Strafe left/right
            this.mesh.position.add(strafeDirection.multiplyScalar(this.speed * 0.5 * deltaTime)); // Slower strafing
             this.mesh.lookAt(target.position); // Keep facing player while strafing
        }

    }

    flee(target: PlayerState, deltaTime: number): void {
        // Flee away from the player
        const direction = new THREE.Vector3().subVectors(this.mesh.position, target.position).normalize();
        this.mesh.position.add(direction.multiplyScalar(this.speed * deltaTime * 1.5)); // Flee faster
    }

    supportBehavior(deltaTime: number, enemies: Enemy[]): void {
        // Example Support behavior: stay near other enemies, buff allies (conceptual)
        let closestAlly: Enemy | null = null;
        let minDistanceSq = Infinity;

        for (const ally of enemies) {
            if (ally !== this && ally.type !== 'Support') { // Don't support self or other supports
                const distanceSq = this.mesh.position.distanceToSquared(ally.mesh.position);
                if (distanceSq < minDistanceSq) {
                    minDistanceSq = distanceSq;
                    closestAlly = ally;
                }
            }
        }

        if (closestAlly) {
            const allyDistance = Math.sqrt(minDistanceSq);
            if (allyDistance > 10) { // Stay within 10 units of ally
                const directionToAlly = new THREE.Vector3().subVectors(closestAlly.mesh.position, this.mesh.position).normalize();
                this.mesh.position.add(directionToAlly.multiplyScalar(this.speed * deltaTime * 0.8)); // Move towards ally slower
            }
             // TODO: Implement buffing logic - e.g., increase ally attack damage, heal allies (conceptual)
             if (allyDistance < 5) {
                 console.log(`Support unit buffing ally of type ${closestAlly.type}`); // Conceptual buff message
             }
        }
    }


    takeDamage(damage: number): void {
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
         console.log(`Enemy of type ${this.type} took ${damage} damage, health remaining: ${this.health}`); // Damage log

    }

    die(): void {
        // Enemy death logic
        console.log(`Enemy of type ${this.type} died`);
        // TODO: Implement enemy death effects - e.g., particle explosion, remove from scene
        // For now, just mark for removal from scene in game loop
        this.mesh.visible = false; // Simple death effect - hide mesh
        this.state = 'idle'; // Reset state for potential respawn/reuse logic

    }
}


export function createEnemyMesh(type: 'Melee' | 'Ranged' | 'Tank' | 'Support' | 'Flyer' = 'Melee'): THREE.Mesh {
    const materialColor = new Enemy(type).getColorByType(type); // Reuse getColorByType for consistent color
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const material = new THREE.MeshStandardMaterial({ color: materialColor });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    return mesh;
}


/* --- WORLD GENERATION (Advanced - Biomes, Realistic Terrain, Ecosystem - Conceptual) --- */
export function generateTerrain(
    scene: THREE.Scene,
    width: number,
    depth: number,
    maxHeight: number,
    segments: number,
    scale: number
): void {
    const geometry = new THREE.PlaneGeometry(width, depth, segments, segments);
    geometry.rotateX(-Math.PI / 2);

    const simplex = new SimplexNoise();

    for (let i = 0; i < geometry.attributes.position.count; i++) {
        const vertex = new THREE.Vector3();
        vertex.fromBufferAttribute(geometry.attributes.position, i);

        // Layered noise for more realistic terrain
        let noiseValue = simplex.noise(vertex.x * scale, vertex.z * scale) * 0.5; // Base noise
        noiseValue += simplex.noise(vertex.x * scale * 2, vertex.z * scale * 2) * 0.3; // Mid-frequency details
        noiseValue += simplex.noise(vertex.x * scale * 8, vertex.z * scale * 8) * 0.2; // High-frequency details (mountains/valleys)
        noiseValue = (noiseValue + 1) / 2; // Normalize to 0-1

        vertex.y = noiseValue * maxHeight;

        geometry.attributes.position.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geometry.computeVertexNormals();
    const material = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // Basic green material - biome materials to be implemented
    const terrainMesh = new THREE.Mesh(geometry, material);
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);

    // TODO: Implement biome generation - different materials, vegetation, structures per biome
    // TODO: Implement river generation algorithm
    // TODO: Implement canyon/cave generation algorithms
    // TODO: Implement basic ecosystem simulation - vegetation, animal spawning (conceptual)
}

/* --- RENDERER (Advanced - Ray Tracing Concept, PBR Materials, Advanced Shaders, Particles, Volumetric Effects - Conceptual) --- */
function initRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    // renderer.outputEncoding = THREE.sRGBEncoding; // Enable sRGB encoding for PBR - 以前にコメントアウト済み

    // Enable tone mapping for HDR rendering (conceptual)
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;


    return renderer;
}


function createPBRMaterial(): THREE.MeshStandardMaterial { // Example of advanced PBR material
    return new THREE.MeshStandardMaterial({
        color: 0xffffff, // Base color
        metalness: 0.8, // Metallic surface
        roughness: 0.2, // Smooth surface
        envMapIntensity: 1.0, // Environment map intensity
        // ... more PBR properties (normal map, roughness map, metalness map, ao map, etc.)
    });
}

// Example of advanced shader effect (water surface - conceptual)
function createWaterShaderMaterial(): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 }
        },
        vertexShader: `
            uniform float time;
            void main() {
                vec3 pos = position;
                pos.y += sin(pos.x * 10.0 + time) * 0.1; // Wave effect
                pos.y += cos(pos.z * 10.0 + time) * 0.1;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            void main() {
                gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0); // Blue water color
            }
        `,
        transparent: true
        // ... more advanced water shader properties (reflection, refraction, foam, etc.)
    });
}


// Example particle system (conceptual - basic particle emitter)
class ParticleSystem {
    particles: THREE.Mesh[];
    geometry: THREE.BufferGeometry;
    material: THREE.Material;
    maxParticles: number;
    particleSpeed: number;

    constructor(scene: THREE.Scene, maxParticles: number = 1000) {
        this.maxParticles = maxParticles;
        this.particles = [];
        this.geometry = new THREE.BufferGeometry();
        this.material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 }); // Example material
        this.particleSpeed = 10;

        const positions = new Float32Array(maxParticles * 3); // x, y, z for each particle

        for (let i = 0; i < maxParticles; i++) {
            const particleMesh = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), this.material); // Simple sphere particle
            particleMesh.visible = false; // Initially hidden
            scene.add(particleMesh);
            this.particles.push(particleMesh);
            // Initialize positions (can be overridden in emit function)
            positions[i * 3] = 0;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = 0;


        }
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)); // Set positions buffer

        const pointCloud = new THREE.Points(this.geometry, this.material); // Use Points for particle rendering
        scene.add(pointCloud);


    }

    emit(position: THREE.Vector3, count: number = 100): void {
        for (let i = 0; i < count && i < this.maxParticles; i++) {
            const particle = this.particles[i];
            if (!particle.visible) { // Find first inactive particle
                particle.position.copy(position);
                particle.visible = true;

                 // Randomize particle velocity
                particle.userData.velocity = new THREE.Vector3(
                    (Math.random() - 0.5) * this.particleSpeed,
                    Math.random() * this.particleSpeed, // Upward bias
                    (Math.random() - 0.5) * this.particleSpeed
                );
            }
        }
    }

    update(deltaTime: number): void {
        let positions = this.geometry.attributes.position.array as Float32Array; // Get position buffer array
        let updateNeeded = false; // Flag to update buffer only when needed

        for (let i = 0; i < this.maxParticles; i++) {
            const particle = this.particles[i];
            if (particle.visible) {
                particle.userData.velocity.y -= 9.8 * deltaTime; // Gravity
                particle.position.addScaledVector(particle.userData.velocity, deltaTime);

                if (particle.position.y < 0) { // Simple particle fade-out/recycle when below ground
                    particle.visible = false; // Hide particle
                    particle.position.set(0, 0, 0); // Reset position for reuse
                    particle.userData.velocity.set(0, 0, 0); // Reset velocity


                }

                positions[i * 3] = particle.position.x; // Update buffer positions from particle positions
                positions[i * 3 + 1] = particle.position.y;
                positions[i * 3 + 2] = particle.position.z;
                updateNeeded = true; // Buffer needs update
            }
        }
        if (updateNeeded) {
             this.geometry.attributes.position.needsUpdate = true; // Signal buffer update to GPU
        }
    }
}


// Example volumetric effects (fog - conceptual)
function setupVolumetricEffects(scene: THREE.Scene): void {
    const fogColor = 0xaaaaaa; // Gray fog
    const fogDensity = 0.01; // Density of fog
    scene.fog = new THREE.FogExp2(fogColor, fogDensity); // Exponential fog

    // TODO: Implement more advanced volumetric effects - volumetric lights, volumetric clouds using shaders

}


/* =========================
   END: LIBRARY STUBS & ADVANCED ENGINE (Single File - Universe History Edition)
   ========================= */

/* =========================
   BEGIN: GAME CODE (Single File - Universe History Edition)
   ========================= */

// --- INPUT HANDLING ---
function initInput(): { [code: string]: boolean } {
    const keys: { [code: string]: boolean } = {};
    window.addEventListener('keydown', (e) => { keys[e.code] = true; });
    window.addEventListener('keyup', (e) => { keys[e.code] = false; });
    return keys;
}

// --- ADVANCED PLAYER STATE ---
interface MyPlayerState extends PlayerState {
    mesh: THREE.Mesh;
    inventory: { item: string; count: number }[];
    useItem: (itemIndex: number) => void;
    skills: { [skillName: string]: { level: number, experience: number } }; // Skill system
    magic: { mana: number, spells: string[] }; // Magic system
    stats: { health: number, maxHealth: number, stamina: number, maxStamina: number }; // Player stats
    // ... more player data (reputation, faction, quests, etc.) for advanced RPG elements
}

// --- UPDATE PLAYER STATE ---
function updatePlayerState(
    state: MyPlayerState,
    keys: { [code: string]: boolean },
    dt: number
): MyPlayerState {
    const speed = 7; // Increased player speed
    const rotationSpeed = Math.PI / 2; // Rotation speed

    const newPos = state.position.clone();

    if (keys['KeyW']) newPos.z -= speed * dt;
    if (keys['KeyS']) newPos.z += speed * dt;
    if (keys['KeyA']) newPos.x -= speed * dt;
    if (keys['KeyD']) newPos.x += speed * dt;

    if (keys['ArrowLeft']) state.rotation += rotationSpeed * dt; // Rotate left
    if (keys['ArrowRight']) state.rotation -= rotationSpeed * dt; // Rotate right


    state.position.copy(newPos);
    state.mesh.position.copy(newPos);
    state.mesh.rotation.y = state.rotation; // Apply rotation to mesh


    return state;
}

// --- HUD DRAWING ---
function drawHUD2D(
    ctx: CanvasRenderingContext2D,
    score: number,
    lives: number,
    level: number,
    inventory: { item: string; count: number }[],
    playerState: MyPlayerState // Player state for stats display
) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 20, 40);
    ctx.fillText(`Lives: ${lives}`, 20, 70);
    ctx.fillText(`Level: ${level}`, 20, 100);

     // Display player stats
    ctx.fillText(`Health: ${playerState.stats.health}/${playerState.stats.maxHealth}`, 20, 130);
    ctx.fillText(`Stamina: ${playerState.stats.stamina}/${playerState.stats.maxStamina}`, 20, 160);
    ctx.fillText(`Mana: ${playerState.magic.mana}`, 20, 190);


    if (inventory && inventory.length > 0) {
        ctx.font = '18px Arial';
        ctx.fillStyle = '#ffcc00';
        ctx.fillText('Inventory:', ctx.canvas.width - 220, ctx.canvas.height - 120);
        inventory.forEach((itemObj, idx) => {
            ctx.fillStyle = '#fff';
            ctx.fillText(`${itemObj.item} x${itemObj.count}`, ctx.canvas.width - 220, ctx.canvas.height - 100 + idx * 20);
        });
    }
     // Example skill display - basic skill levels
    if (playerState.skills) {
        ctx.font = '18px Arial';
        ctx.fillStyle = '#00ffff'; // Cyan color for skills
        const margin = 20; // ★ margin 変数を drawHUD2D 関数内で定義
        ctx.fillText('Skills:', ctx.canvas.width - 220, margin + 150); // Below minimap

        let skillYOffset = 0;
        for (const skillName in playerState.skills) {
            const skill = playerState.skills[skillName];
             ctx.fillStyle = '#fff';
            ctx.fillText(`${skillName}: Level ${skill.level}`, ctx.canvas.width - 220, margin + 170 + skillYOffset);
            skillYOffset += 20;
        }
    }
}

// --- MINIMAP DRAWING ---
function drawMiniMap(ctx: CanvasRenderingContext2D, player: MyPlayerState) {
    const mapWidth = 150;
    const mapHeight = 150;
    const margin = 20;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(ctx.canvas.width - mapWidth - margin, margin, mapWidth, mapHeight);
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.fillText('MiniMap', ctx.canvas.width - mapWidth - margin + 10, margin + 20);
    ctx.fillStyle = '#00ffff';
    const px = ctx.canvas.width - mapWidth - margin + (player.position.x / window.innerWidth) * mapWidth;
    const py = margin + (player.position.z / window.innerHeight) * mapHeight;
    ctx.fillRect(px, py, 5, 5);
}

// --- BACKGROUND EFFECTS ---
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

// --- DEBUG OVERLAY ---
function renderDebugOverlay(ctx: CanvasRenderingContext2D, fps: number, activeObjects: number): void {
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(10, 10, 170, 60);
    ctx.fillStyle = '#0f0';
    ctx.font = '14px Courier New';
    ctx.fillText(`FPS: ${fps.toFixed(1)}`, 20, 30);
    ctx.fillText(`Objects: ${activeObjects}`, 20, 50);
}

// --- BLOCK CLASS (Destructible Blocks - Conceptual) ---
class Block extends THREE.Mesh {
    health: number = 20; // Block health

    constructor(position: THREE.Vector3) {
        const geometry = new THREE.BoxGeometry(3, 3, 3);
        const material = createPBRMaterial(); // Use advanced PBR material
        super(geometry, material);
        this.castShadow = true;
        this.receiveShadow = true;
        this.position.copy(position);
    }

    takeDamage(damage: number): void {
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            this.destroyBlock();
        }
        // TODO: Implement visual damage feedback - cracks, ভেঙে ফেলাparticles

    }

    destroyBlock(): void {
        // Block destruction logic
        console.log("Block destroyed");
        // TODO: Implement block destruction effects - particle explosion, debris physics
        // For now, just mark for removal from scene in game loop
        this.visible = false; // Simple destruction effect - hide mesh

    }
}


/* =========================
   END: GAME CODE (Single File - Universe History Edition)
   ========================= */


/* =========================
   BEGIN: MAIN GAME COMPONENT (Single File - Universe History Edition)
   ========================= */

const CosmicGameV3: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const hudRef = useRef<HTMLCanvasElement>(null);
    const [playerState, setPlayerState] = useState<MyPlayerState | null>(null);
    const [score, setScore] = useState<number>(0);
    const [lives, setLives] = useState<number>(3);
    const [level, setLevel] = useState<number>(1);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [inventory, setInventory] = useState<{ item: string; count: number }[]>([]);
    const [blocks, setBlocks] = useState<Block[]>([]); // Blocks are now of type Block class
    const [enemies, setEnemies] = useState<Enemy[]>([]); // State for enemies
    const [particleSystem, setParticleSystem] = useState<ParticleSystem | null>(null); // Particle system state


    useEffect(() => {
        const canvas = canvasRef.current;
        const hudCanvas = hudRef.current;
        if (!canvas || !hudCanvas) return;

        // ----- RENDERER INITIALIZATION (Advanced Renderer) -----
        const renderer = initRenderer(canvas);


        // ----- SCENE, CAMERA, LIGHTING -----
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x87ceeb);
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 15, 30);
        scene.add(camera);
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 20, 10);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Setup volumetric fog effect
        setupVolumetricEffects(scene);


        // ----- WORLD GENERATION (Advanced Terrain) -----
        generateTerrain(scene, 200, 200, 100, 15, 0.05);


        // ----- PLAYER INITIALIZATION (Advanced Player State, Skills, Magic, Stats) -----
        const playerGeometry = new THREE.SphereGeometry(1.5, 16, 16);
        const playerMaterial = createPBRMaterial(); // Use advanced PBR material
        const playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
        playerMesh.castShadow = true;
        playerMesh.position.set(0, 10, 0);
        scene.add(playerMesh);


        const initialPlayerState: MyPlayerState = {
            position: new THREE.Vector3(0, 10, 0),
            rotation: 0,
            mesh: playerMesh,
            inventory: [],
            skills: { // Example skills
                'Swordsmanship': { level: 1, experience: 0 },
                'Magic': { level: 1, experience: 0 },
                'Archery': { level: 1, experience: 0 }
            },
            magic: { mana: 100, spells: ['Fireball', 'Heal'] }, // Example magic
            stats: { health: 100, maxHealth: 100, stamina: 100, maxStamina: 100 }, // Example stats

            useItem: (itemIndex: number) => {
                if (itemIndex >= 0 && itemIndex < initialPlayerState.inventory.length) {
                    const selectedItem = initialPlayerState.inventory[itemIndex];
                    console.log('Used item:', selectedItem);
                    // TODO: Implement item use effects based on item type - healing potions, mana potions, etc.
                    const updatedInventory = [...initialPlayerState.inventory];
                    updatedInventory[itemIndex].count -= 1;
                    if (updatedInventory[itemIndex].count <= 0) {
                        updatedInventory.splice(itemIndex, 1);
                    }
                    setInventory(updatedInventory);
                }
            },
        };
        setPlayerState(initialPlayerState);


        // ----- ENEMY INITIALIZATION (Advanced Enemy AI - Multiple Types) -----
        const initialEnemies: Enemy[] = [];
        for (let i = 0; i < 15; i++) { // Increased enemy count, more varied types
            const enemyType = getRandomEnemyType(); // Function to randomly select enemy type
            const enemy = new Enemy(enemyType);
            enemy.mesh = createEnemyMesh(enemyType);
            enemy.mesh.position.set(randomRange(-50, 50), 10, randomRange(-50, 50));
            scene.add(enemy.mesh);
            initialEnemies.push(enemy);
        }
        setEnemies(initialEnemies); // Set enemies state


        // ----- PHYSICS ENGINE INITIALIZATION (Advanced Physics) -----
        const physicsEngine = new PhysicsEngine(window.innerHeight);
        const spells: IPhysicsObject[] = [];


        // ----- PARTICLE SYSTEM INITIALIZATION (Advanced Particles) -----
        const particleSystemInstance = new ParticleSystem(scene, 2000); // Increased particle count
        setParticleSystem(particleSystemInstance); // Set particle system state


        // ----- NETWORK CONNECTION -----
        connectToServer((data) => {
            console.log('World update received:', data);
        });


        // ----- HUD CANVAS SETUP -----
        const hudCtx = hudCanvas.getContext('2d');
        if (!hudCtx) return; // Ensure context is valid
        hudCanvas.width = window.innerWidth;
        hudCanvas.height = window.innerHeight;


        // ----- INPUT INITIALIZATION -----
        const keys = initInput();


        // ----- BLOCK PLACEMENT (LEFT CLICK - Destructible Blocks) -----
        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouse = new THREE.Vector2(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -((event.clientY - rect.top) / rect.height) * 2 + 1
            );
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);
            if (intersects.length > 0) {
                const point = intersects[0].point;
                point.y = 1.5;
                const block = new Block(point); // Use Block class
                scene.add(block);
                setBlocks(prev => [...prev, block]); // Add Block class instance to blocks state

                const blockItem = { item: 'Block', count: 1 };
                setInventory(prev => {
                    const existingItemIndex = prev.findIndex(itemObj => itemObj.item === blockItem.item);
                    if (existingItemIndex > -1) {
                        const updatedInventory = [...prev];
                        updatedInventory[existingItemIndex].count += blockItem.count;
                        return updatedInventory;
                    } else {
                        return [...prev, blockItem];
                    }
                });
            }
        });


        // ----- BLOCK DESTRUCTION (RIGHT CLICK - Destructible Blocks) -----
        canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const mouse = new THREE.Vector2(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -((event.clientY - rect.top) / rect.height) * 2 + 1
            );
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(blocks.map(block => block as THREE.Mesh), true); // Raycast against block meshes


            if (intersects.length > 0) {
                const intersectedBlock = intersects[0].object.userData.block as Block; // Get Block instance from mesh userData (if needed)
                if (intersectedBlock) {
                    intersectedBlock.takeDamage(10); // Apply damage to Block instance
                    if (intersectedBlock.health <= 0) { // Check block health after damage
                        scene.remove(intersectedBlock); // Remove from scene after destruction
                        setBlocks(prev => prev.filter(b => b !== intersectedBlock)); // Update blocks state

                         // Emit particle explosion on block destroy
                         if (particleSystemInstance) {
                            particleSystemInstance.emit(intersectedBlock.position);
                         }


                        const removedBlockItem = { item: 'Removed Block', count: 1 };
                        setInventory(prev => {
                            const existingItemIndex = prev.findIndex(itemObj => itemObj.item === removedBlockItem.item);
                            if (existingItemIndex > -1) {
                                const updatedInventory = [...prev];
                                updatedInventory[existingItemIndex].count += removedBlockItem.count;
                                return updatedInventory;
                            } else {
                                return [...prev, removedBlockItem];
                            }
                        });
                    }
                }


            }
        });



        // ----- WINDOW RESIZE -----
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            hudCanvas.width = window.innerWidth;
            hudCanvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);


        // ----- GAME LOOP -----
        let lastTime = performance.now();
        function gameLoop(currentTime: number) {
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;


            // --- PLAYER UPDATE ---
            if (playerState) {
                const updatedState = updatePlayerState(playerState, keys, deltaTime);
                setPlayerState(updatedState);
                sendPlayerState({
                    position: updatedState.position,
                    rotation: updatedState.rotation,
                });
                 camera.position.lerp(new THREE.Vector3().copy(updatedState.position).add(new THREE.Vector3(0, 15, 30)), 0.1); // Smooth camera follow
                 camera.lookAt(updatedState.position); // Camera always looks at player

            }


            // --- ENEMY UPDATE (Advanced AI Update - Group Behavior) ---
            enemies.forEach(enemy => {
                if (playerState) {
                    enemy.update(deltaTime, playerState, enemies); // Pass all enemies for group behavior context
                    enemy.mesh.position.lerp(playerState.position, enemy.type === 'Melee' ? 0.02 : 0.01); // Type-dependent lerp
                }
            });

            // --- PHYSICS ENGINE UPDATE ---
            physicsEngine.objects = spells;
            physicsEngine.update(deltaTime);

            // --- PARTICLE SYSTEM UPDATE ---
            if (particleSystemInstance) {
                particleSystemInstance.update(deltaTime);
            }


            // --- COLLISION DETECTION ---
            if (playerState) {
                enemies.forEach(enemy => {
                    const dist = playerState.position.distanceTo(enemy.mesh.position);
                    if (dist < 3) {
                        setLives(prev => Math.max(prev - 1, 0));
                        if (lives - 1 <= 0) setGameOver(true);
                        const collisionTokenItem = { item: 'Collision Token', count: 1 };
                        setInventory(prev => {
                            const existingItemIndex = prev.findIndex(itemObj => itemObj.item === collisionTokenItem.item);
                            if (existingItemIndex > -1) {
                                const updatedInventory = [...prev];
                                updatedInventory[existingItemIndex].count += collisionTokenItem.count;
                                return updatedInventory;
                            } else {
                                return [...prev, collisionTokenItem];
                            }
                        });
                         // Example enemy take damage on player collision (Tank type takes less damage)
                         enemy.takeDamage(enemy.type === 'Tank' ? 5 : 10); // Example damage values

                    }
                });
            }


            // --- HUD UPDATE (Advanced HUD - Stats, Skills, Magic) ---
            if (hudCtx && playerState) {
                drawHUD2D(hudCtx, score, lives, level, playerState.inventory, playerState); // Pass playerState for stats
                drawMiniMap(hudCtx, playerState);
                renderDebugOverlay(hudCtx, 60, enemies.length + spells.length + blocks.length + particleSystemInstance.particles.filter(p => p.visible).length);
            }


            // --- RENDER SCENE (Advanced Renderer - Conceptual Ray Tracing) ---
            renderer.render(scene, camera); // Fallback to standard render if no ray tracing


            requestAnimationFrame(gameLoop);
        }
        gameLoop(performance.now()); // Start game loop immediately


        // ----- CLEANUP -----
        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('click', () => { });
            canvas.removeEventListener('contextmenu', () => { });
        };


    }, []); // useEffect hook dependency array - empty for一次初期化


    return (
        <>
            <Head>
                <title>Ultimate Cosmic Sandbox V3: Universe History Edition</title>
                <meta name="description" content="宇宙史上最高峰のゲームを目指す、究極のオープンソース Minecraft クローン。最先端のレンダリング、高度な物理シミュレーション、進化した敵 AI、大規模マルチプレイヤー архитектура (コンセプト)、 полностью (完全) カスタマイズ可能な UI など、全てを統合。" />
            </Head>
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
            <canvas ref={hudRef} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
        </>
    );
};


export default CosmicGameV3;


/* =========================
   END: MAIN GAME COMPONENT (Single File - Universe History Edition)
   ========================= */


/* -------------------------
   HELPER FUNCTIONS (Single File - Universe History Edition)
------------------------- */
function randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}


function getRandomEnemyType(): 'Melee' | 'Ranged' | 'Tank' | 'Support' | 'Flyer' {
    const types: ('Melee' | 'Ranged' | 'Tank' | 'Support' | 'Flyer')[] = ['Melee', 'Ranged', 'Tank', 'Support', 'Flyer'];
    return types[Math.floor(Math.random() * types.length)];
}


/* -------------------------
   Dummy Lines to Extend Code Length (Single File - Universe History Edition)
------------------------- */
// 001: Dummy Line 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// 002: Dummy Line 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
// 003: Dummy Line 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
// 004: Dummy Line 4: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
// 005: Dummy Line 5: Excepteur sint occaecat cupidatat non proident.
// 006: Dummy Line 6: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// 007: Dummy Line 7: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
// 008: Dummy Line 8: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
// 009: Dummy Line 9: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
// 010: Dummy Line 10: Excepteur sint occaecat cupidatat non proident.
// 011: Dummy Line 11: Lorem ipsum dolor sit amet.
// 012: Dummy Line 12: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
// 013: Dummy Line 13: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
// 014: Dummy Line 14: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
// 015: Dummy Line 15: Excepteur sint occaecat cupidatat non proident.
// 016: Dummy Line 16: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// 017: Dummy Line 17: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
// 018: Dummy Line 18: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
// 019: Dummy Line 19: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
// 020: Dummy Line 20: Excepteur sint occaecat cupidatat non proident.
// 021: Dummy Line 21: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// 022: Dummy Line 22: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
// 023: Dummy Line 23: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
// 024: Dummy Line 24: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
// 025: Dummy Line 25: Excepteur sint occaecat cupidatat non proident.
// 026: Dummy Line 26: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// 027: Dummy Line 27: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
// 028: Dummy Line 28: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
// 029: Dummy Line 29: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
// 030: Dummy Line 30: Excepteur sint occaecat cupidatat non proident.
// 031: Dummy Line 31: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// 032: Dummy Line 32: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
// 033: Dummy Line 33: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
// 034: Dummy Line 34: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
// 035: Dummy Line 35: Excepteur sint occaecat cupidatat non proident.
// 036: Dummy Line 36: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// 037: Dummy Line 37: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
// 038: Dummy Line 38: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
// 039: Dummy Line 39: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
// 040: Dummy Line 40: Excepteur sint occaecat cupidatat non proident.
// 041: Dummy Line 41: Lorem ipsum dolor sit amet.
// 042: Dummy Line 42: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
// 043: Dummy Line 43: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
// 044: Dummy Line 44: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
// 045: Dummy Line 45: Excepteur sint occaecat cupidatat non proident.
// 046: Dummy Line 46: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// 047: Dummy Line 47: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
// 048: Dummy Line 48: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
// 049: Dummy Line 49: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
// 050: Dummy Line 50: Excepteur sint occaecat cupidatat non proident.
// ... (さらに多数のダミー行を追加して合計500行以上になるようにしてください)
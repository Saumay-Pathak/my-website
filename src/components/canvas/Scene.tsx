import { Suspense, memo, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { CameraController } from './CameraController';
import { ParticleField } from './ParticleField';
import { CodeRain } from './CodeRain';
import { EntryGate } from '../zones/EntryGate';
import { AboutChamber } from '../zones/AboutChamber';
import { SkillsCore } from '../zones/SkillsCore';
import { ProjectNodes } from '../zones/ProjectNodes';
import { TimelineTunnel } from '../zones/TimelineTunnel';
import { BlogZone } from '../zones/BlogZone';
import { TerminalCore } from '../zones/TerminalCore';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useWorldState } from '../../hooks/useWorldState';

// Memoize zone components to prevent unnecessary re-renders
const MemoizedEntryGate = memo(EntryGate);
const MemoizedAboutChamber = memo(AboutChamber);
const MemoizedSkillsCore = memo(SkillsCore);
const MemoizedProjectNodes = memo(ProjectNodes);
const MemoizedTimelineTunnel = memo(TimelineTunnel);
const MemoizedBlogZone = memo(BlogZone);
const MemoizedTerminalCore = memo(TerminalCore);

export function Scene() {
    const isMobile = useIsMobile();

    // High-performance settings specifically tuned to hit 120fps smoothly
    const settings = useMemo(() => ({
        particleCount: isMobile ? 150 : 800,
        starCount: isMobile ? 300 : 800,
        codeRainCount: isMobile ? 15 : 30,
        dpr: isMobile ? [0.75, 1] as [number, number] : [1, 1.2] as [number, number],
        fov: isMobile ? 85 : 55, // Wider FOV on mobile for portrait aspect ratio
        far: isMobile ? 400 : 800, // Shorter far plane to save power
    }), [isMobile]);

    return (
        <Canvas
            className="canvas-container"
            camera={{
                position: [0, 1, 15],
                fov: settings.fov,
                near: 0.1,
                far: settings.far,
            }}
            dpr={settings.dpr}
            gl={{
                antialias: !isMobile,
                alpha: false,
                powerPreference: 'high-performance',
                stencil: false,
                depth: true,
            }}
            frameloop="always"
            performance={{ min: 0.5, max: 1 }}
        >
            <Suspense fallback={null}>
                {/* Environment */}
                <color attach="background" args={['#020205']} />
                <fog attach="fog" args={['#020205', 10, isMobile ? 60 : 100]} />
                
                {/* Architectural Grid */}
                <GridBackground />

                {/* Ultra-Advanced GLSL Plasma Background */}
                {/* <PlasmaBackground /> */}

                {/* Lighting */}
                <ambientLight intensity={0.25} />
                <directionalLight position={[5, 5, 5]} intensity={0.3} />
                <pointLight position={[-10, -10, -20]} intensity={0.15} color="#7c3aed" />

                {/* Rich Star Field */}
                <Stars
                    radius={100}
                    depth={80}
                    count={settings.starCount}
                    factor={isMobile ? 3 : 4}
                    saturation={0}
                    fade
                    speed={0.5}
                />

                {/* Full Particle Field */}
                <ParticleField count={settings.particleCount} spread={60} depth={700} />

                {/* Code Rain Effect */}
                <CodeRain count={settings.codeRainCount} />

                {/* Camera Controller */}
                <CameraController />

                {/* Memoized 3D Zones */}
                <MemoizedEntryGate />
                <MemoizedAboutChamber />
                <MemoizedSkillsCore />
                <MemoizedProjectNodes />
                <MemoizedTimelineTunnel />
                <MemoizedBlogZone />
                <MemoizedTerminalCore />

                {/* Generative Digital DNA Splines */}
                {/* <DataSplines /> */}

                {/* Data Stream Rings */}
                <DataStream isMobile={isMobile} />

                <PostProcessing />

                <Preload all />
            </Suspense>
        </Canvas>
    );
}

// Data stream decoration
const DataStream = memo(function DataStream({ isMobile }: { isMobile: boolean }) {
    const positions = [-150, -300, -450, -600, -750];

    return (
        <group>
            {positions.map((z, i) => (
                <mesh key={i} position={[0, -6, z]} rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[6, 6.08, isMobile ? 24 : 48]} />
                    <meshBasicMaterial
                        color="#00d4ff"
                        transparent
                        opacity={0.1}
                    />
                </mesh>
            ))}
        </group>
    );
});

// Post-processing handling
const PostProcessing = memo(function PostProcessing() {
    const { cameraZ } = useWorldState();
    const lastCameraZ = useRef(cameraZ);
    const scrollVelocity = useRef(0);
    
    // Mutate this Vector2 directly across frames. R3F effects read by reference.
    const glitchOffset = useMemo(() => new THREE.Vector2(0.0015, 0.0015), []);

    useFrame(() => {
        const v = Math.abs(cameraZ - lastCameraZ.current);
        scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, v, 0.1);
        lastCameraZ.current = cameraZ;
        
        const offsetVal = 0.0015 + (scrollVelocity.current * 0.03);
        glitchOffset.set(offsetVal, offsetVal);
    });

    return (
        <EffectComposer multisampling={0}>
            <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.8} intensity={1.5} mipmapBlur />
            <ChromaticAberration offset={glitchOffset} />
            <Noise opacity={0.015} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
    );
});

// Infinite Architectural Grid
const GridBackground = memo(function GridBackground() {
    const gridRef = useRef<THREE.GridHelper>(null);
    const { cameraZ } = useWorldState();

    // Make the grid infinite by resetting its position modulo the grid size
    useFrame((state) => {
        if (gridRef.current) {
            // Constant forward movement independent of scroll
            const timeOffset = state.clock.elapsedTime * 2;
            // Scroll movement
            const scrollOffset = -cameraZ;
            // Modulo division by the grid square size (10) keeps it appearing infinite
            gridRef.current.position.z = (timeOffset + scrollOffset) % 10;
        }
    });

    return (
        <group position={[0, -10, 0]}>
            <gridHelper
                ref={gridRef}
                args={[
                    200, // Size
                    20,  // Divisions (10x10 squares)
                    '#1e1b4b', // Center line color (Tailwind indigo-950)
                    '#1e1b4b'  // Grid color
                ]}
                position={[0, 0, 0]}
            />
            {/* Ceiling Grid for symmetry */}
            <gridHelper
                args={[
                    200, 
                    20, 
                    '#1e1b4b', 
                    '#1e1b4b'
                ]}
                position={[0, 20, 0]}
            />
        </group>
    );
});

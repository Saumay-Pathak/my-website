import { Suspense, memo, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
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

    // Original rich settings
    const settings = useMemo(() => ({
        particleCount: isMobile ? 400 : 2000,
        starCount: isMobile ? 1000 : 3000,
        codeRainCount: isMobile ? 20 : 50,
        dpr: isMobile ? [0.75, 1] as [number, number] : [1, 2] as [number, number],
        fov: isMobile ? 65 : 55,
        far: isMobile ? 600 : 800,
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
            performance={{ min: 0.5 }}
        >
            <Suspense fallback={null}>
                {/* Adaptive Performance */}
                <AdaptiveDpr pixelated />
                <AdaptiveEvents />

                {/* Environment */}
                <color attach="background" args={['#050508']} />
                <fog attach="fog" args={['#050508', 15, isMobile ? 80 : 120]} />

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

                {/* Data Stream Rings */}
                <DataStream isMobile={isMobile} />

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

import { useRef, memo, useMemo } from 'react';
import { Html, Float, Instance, Instances } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { skills, zonePositions } from '../../data/portfolio';
import { useZoneVisibility } from '../../hooks/useZoneVisibility';
import { useIsMobile } from '../../hooks/useIsMobile';
import * as THREE from 'three';

export const SkillsCore = memo(function SkillsCore() {
    const z = zonePositions.skills.z;
    const isVisible = useZoneVisibility(z);
    const isMobile = useIsMobile();
    const orbitRef = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.Group>(null);

    const backendSkills = skills.filter(s => s.category === 'backend');
    const frontendSkills = skills.filter(s => s.category === 'frontend');

    // Generate particle positions for the core
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 100; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const r = 1.5 + Math.random() * 0.5;
            temp.push({
                pos: [r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)],
                scale: Math.random() * 0.05 + 0.02
            });
        }
        return temp;
    }, []);

    useFrame((state) => {
        if (orbitRef.current && isVisible && !isMobile) {
            orbitRef.current.rotation.y = state.clock.elapsedTime * 0.1;
            orbitRef.current.rotation.z = state.clock.elapsedTime * 0.05;
        }
        if (particlesRef.current && isVisible && !isMobile) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * -0.05;
            particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
        }
    });

    if (!isVisible) return null;

    return (
        <group position={[0, 0, z]}>
            <Html
                position={[0, isMobile ? 4.5 : 5, 0]}
                center
                transform
                distanceFactor={isMobile ? 8 : 12}
            >
                <div className={`text-center ${isMobile ? 'w-[280px]' : 'w-[400px]'}`}>
                    <span className="text-secondary font-mono text-xs tracking-widest uppercase">Skills</span>
                    <h2 className={`font-display font-bold mt-1 ${isMobile ? 'text-xl' : 'text-3xl'}`}>Technical Arsenal</h2>
                </div>
            </Html>

            {/* Mobile: Compact stacked panels */}
            {isMobile ? (
                <Html position={[0, 0, 0]} center transform distanceFactor={7}>
                    <div className="w-[260px] space-y-4">
                        <div className="p-4 rounded-xl glass">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                                <h3 className="font-bold text-xs">Backend</h3>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {backendSkills.slice(0, 6).map(skill => (
                                    <span key={skill.id} className="px-1.5 py-0.5 text-[9px] bg-cyan-500/10 border border-cyan-500/20 rounded text-cyan-400">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-3 rounded-xl glass">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                                <h3 className="font-bold text-xs">Frontend</h3>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {frontendSkills.slice(0, 5).map(skill => (
                                    <span key={skill.id} className="px-1.5 py-0.5 text-[9px] bg-purple-500/10 border border-purple-500/20 rounded text-purple-400">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Html>
            ) : (
                <>
                    {/* Desktop: Central Core Particles */}
                    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.2}>
                        <group ref={particlesRef}>
                            <Instances limit={100} range={100}>
                                <sphereGeometry args={[1, 16, 16]} />
                                <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2} toneMapped={false} />
                                {particles.map((p, i) => (
                                    <Instance key={i} position={p.pos as [number, number, number]} scale={p.scale} />
                                ))}
                            </Instances>
                        </group>
                    </Float>

                    {/* Desktop: Skill Panels */}
                    <Html position={[-5, 1, 0]} transform distanceFactor={12}>
                        <div className="w-[200px] p-4 rounded-xl glass border border-cyan-500/30 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#00e5ff]" />
                                <h3 className="font-bold text-sm text-cyan-100">Backend</h3>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {backendSkills.map(skill => (
                                    <span key={skill.id} className="px-2 py-0.5 text-[10px] bg-cyan-500/10 border border-cyan-500/40 rounded text-cyan-300 shadow-[0_0_5px_rgba(0,229,255,0.2)]">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Html>

                    <Html position={[5, 1, 0]} transform distanceFactor={12}>
                        <div className="w-[200px] p-4 rounded-xl glass border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                                <h3 className="font-bold text-sm text-purple-100">Frontend</h3>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {frontendSkills.map(skill => (
                                    <span key={skill.id} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/40 rounded text-purple-300 shadow-[0_0_5px_rgba(168,85,247,0.2)]">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Html>

                    {/* Orbiting rings */}
                    <group ref={orbitRef}>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <torusGeometry args={[4.5, 0.02, 16, 100]} />
                            <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1.5} toneMapped={false} />
                        </mesh>
                        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
                            <torusGeometry args={[3.5, 0.015, 16, 100]} />
                            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={2} toneMapped={false} />
                        </mesh>
                    </group>
                </>
            )}

            <pointLight position={[0, 0, 5]} intensity={0.3} color="#00d4ff" distance={20} />
        </group>
    );
});

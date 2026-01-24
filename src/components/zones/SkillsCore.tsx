import { useRef, memo } from 'react';
import { Html, Float } from '@react-three/drei';
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

    const backendSkills = skills.filter(s => s.category === 'backend');
    const frontendSkills = skills.filter(s => s.category === 'frontend');

    useFrame((state) => {
        if (orbitRef.current && isVisible && !isMobile) {
            orbitRef.current.rotation.y = state.clock.elapsedTime * 0.015;
        }
    });

    if (!isVisible) return null;

    return (
        <group position={[0, 0, z]}>
            {/* Section Header */}
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
                    <div className="w-[260px] space-y-3">
                        <div className="p-3 rounded-xl glass">
                            <div className="flex items-center gap-2 mb-2">
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
                    {/* Desktop: Central Core */}
                    <Float speed={0.3} rotationIntensity={0.02} floatIntensity={0.05}>
                        <mesh position={[0, 0, 0]}>
                            <icosahedronGeometry args={[1, 0]} />
                            <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
                        </mesh>
                    </Float>

                    {/* Desktop: Skill Panels */}
                    <Html position={[-5, 1, 0]} transform distanceFactor={12}>
                        <div className="w-[200px] p-4 rounded-xl glass">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-3 h-3 rounded-full bg-cyan-400" />
                                <h3 className="font-bold text-sm">Backend</h3>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {backendSkills.map(skill => (
                                    <span key={skill.id} className="px-2 py-0.5 text-[10px] bg-cyan-500/10 border border-cyan-500/20 rounded text-cyan-400">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Html>

                    <Html position={[5, 1, 0]} transform distanceFactor={12}>
                        <div className="w-[200px] p-4 rounded-xl glass">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-3 h-3 rounded-full bg-purple-500" />
                                <h3 className="font-bold text-sm">Frontend</h3>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {frontendSkills.map(skill => (
                                    <span key={skill.id} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/20 rounded text-purple-400">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Html>

                    {/* Orbiting rings */}
                    <group ref={orbitRef}>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <torusGeometry args={[4, 0.015, 6, 32]} />
                            <meshBasicMaterial color="#00d4ff" transparent opacity={0.2} />
                        </mesh>
                    </group>
                </>
            )}

            <pointLight position={[0, 0, 5]} intensity={0.3} color="#00d4ff" distance={20} />
        </group>
    );
});

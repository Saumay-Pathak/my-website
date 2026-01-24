import { Html, Float } from '@react-three/drei';
import { personalInfo, services, zonePositions } from '../../data/portfolio';
import { useWorldState } from '../../hooks/useWorldState';
import { useZoneVisibility } from '../../hooks/useZoneVisibility';
import { useIsMobile } from '../../hooks/useIsMobile';
import { memo } from 'react';

export const EntryGate = memo(function EntryGate() {
    const { navigateToZone } = useWorldState();
    const z = zonePositions.entry.z;
    const isVisible = useZoneVisibility(z);
    const isMobile = useIsMobile();

    if (!isVisible) return null;

    return (
        <group position={[0, 0, z]}>
            {/* Floating Terminal - hide on mobile */}
            {!isMobile && (
                <Float
                    speed={1}
                    rotationIntensity={0.02}
                    floatIntensity={0.1}
                    floatingRange={[-0.05, 0.05]}
                >
                    <mesh position={[6, 1, -8]}>
                        <boxGeometry args={[6, 4, 0.2]} />
                        <meshPhysicalMaterial
                            color="#0a0a0a"
                            metalness={0.1}
                            roughness={0.3}
                            transparent
                            opacity={0.9}
                        />
                    </mesh>

                    <Html
                        position={[6, 1, -7.8]}
                        transform
                        occlude
                        style={{
                            width: '280px',
                            pointerEvents: 'none',
                        }}
                    >
                        <div className="font-mono text-xs text-green-400 p-3 bg-black/90 rounded-lg border border-green-500/30">
                            <div className="mb-2 text-gray-500 text-[10px]">saumay-pathak — zsh</div>
                            <div className="space-y-0.5 text-[11px]">
                                <div>&gt; saumay.init()</div>
                                <div className="text-cyan-400">&gt; [OK] PHP 8.2 Engine</div>
                                <div className="text-cyan-400">&gt; [OK] Laravel v11</div>
                                <div className="text-green-400 font-bold">&gt; System online._</div>
                            </div>
                        </div>
                    </Html>
                </Float>
            )}

            {/* Main Hero Content */}
            <Html
                position={isMobile ? [0, 2, 0] : [-3, 1.5, 0]}
                transform
                center={isMobile}
                distanceFactor={isMobile ? 6 : 8}
            >
                <div className={isMobile ? "w-[280px] text-center" : "w-[500px]"}>
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs mb-3">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-gray-400 font-mono text-[10px]">
                            {isMobile ? 'Available' : personalInfo.status}
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className={`font-display font-bold leading-tight mb-3 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
                        Building the{' '}
                        <span className="text-gradient">backbone</span>
                        <br />of modern web.
                    </h1>

                    {/* Description */}
                    <p className={`text-gray-400 mb-4 ${isMobile ? 'text-xs' : 'text-sm max-w-md'}`}>
                        {isMobile
                            ? 'Full-Stack Developer specializing in scalable backend systems.'
                            : personalInfo.description
                        }
                    </p>

                    {/* CTAs */}
                    <div className={`flex gap-3 ${isMobile ? 'justify-center' : ''}`}>
                        <button
                            onClick={() => navigateToZone('projects')}
                            className={`bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2 ${isMobile ? 'px-4 py-2 text-xs' : 'px-6 py-3 text-sm'
                                }`}
                        >
                            View Projects
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            className={`glass font-bold rounded-xl flex items-center gap-2 ${isMobile ? 'px-4 py-2 text-xs' : 'px-6 py-3 text-sm'
                                }`}
                        >
                            Download CV
                        </a>
                    </div>
                </div>
            </Html>

            {/* Central Glowing Orb - smaller on mobile */}
            <mesh position={[0, isMobile ? -3 : -2, -12]}>
                <sphereGeometry args={[isMobile ? 1 : 1.5, 24, 24]} />
                <meshBasicMaterial
                    color="#00d4ff"
                    transparent
                    opacity={0.2}
                />
            </mesh>

            {/* Services Section - simplified on mobile */}
            <Html
                position={[0, isMobile ? -4.5 : -4, -5]}
                transform
                center
                distanceFactor={isMobile ? 8 : 10}
            >
                <div className={isMobile ? "w-[300px]" : "w-[700px]"}>
                    <div className="text-center mb-4">
                        <span className="text-primary font-mono text-xs tracking-widest uppercase">Services</span>
                        <h2 className={`font-display font-bold mt-1 ${isMobile ? 'text-lg' : 'text-2xl'}`}>Architecture & Code</h2>
                    </div>

                    <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-3 gap-4'}`}>
                        {services.slice(0, isMobile ? 2 : 3).map((service) => (
                            <div
                                key={service.id}
                                className={`rounded-xl glass text-center ${isMobile ? 'p-3' : 'p-4'}`}
                            >
                                <div className={`rounded-lg bg-white/5 flex items-center justify-center mb-2 mx-auto ${isMobile ? 'w-8 h-8' : 'w-10 h-10'
                                    }`}>
                                    {service.icon === 'server' && (
                                        <svg className={`text-primary ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                                        </svg>
                                    )}
                                    {service.icon === 'layout' && (
                                        <svg className={`text-secondary ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                                        </svg>
                                    )}
                                    {service.icon === 'smartphone' && (
                                        <svg className={`text-orange-500 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </div>
                                <h3 className={`font-bold mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>{service.title}</h3>
                                {!isMobile && <p className="text-gray-400 text-xs">{service.description}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </Html>

            {/* Simplified Lighting */}
            <pointLight position={[0, 5, 5]} intensity={0.3} color="#00d4ff" distance={30} />
        </group>
    );
});

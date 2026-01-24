import { Html, Float } from '@react-three/drei';
import { personalInfo, experiences, zonePositions } from '../../data/portfolio';
import { useZoneVisibility } from '../../hooks/useZoneVisibility';
import { useIsMobile } from '../../hooks/useIsMobile';
import { memo } from 'react';

export const AboutChamber = memo(function AboutChamber() {
    const z = zonePositions.about.z;
    const isVisible = useZoneVisibility(z);
    const isMobile = useIsMobile();

    if (!isVisible) return null;

    return (
        <group position={[0, 0, z]}>
            {/* Section Header */}
            <Html
                position={[0, isMobile ? 5 : 5.5, 0]}
                center
                transform
                distanceFactor={isMobile ? 8 : 10}
            >
                <div className={`text-center ${isMobile ? 'w-[280px]' : 'w-[500px]'}`}>
                    <span className="text-primary font-mono text-xs tracking-widest uppercase">About Me</span>
                    <h2 className={`font-display font-bold mt-2 ${isMobile ? 'text-xl' : 'text-3xl'}`}>
                        Crafting digital experiences with
                        <span className="text-gradient block">precision & passion.</span>
                    </h2>
                </div>
            </Html>

            {/* Mobile: Stacked layout */}
            {isMobile ? (
                <>
                    {/* Bio Panel */}
                    <Html position={[0, 1.5, 0]} center transform distanceFactor={7}>
                        <div className="w-[260px] p-3 rounded-xl glass">
                            <h3 className="text-xs font-bold mb-2 flex items-center gap-2">
                                <div className="w-1 h-3 bg-primary rounded-full" />
                                Who I Am
                            </h3>
                            <p className="text-gray-400 text-[10px] leading-relaxed">
                                Full-Stack Architect based in Gurugram, India. Passionate about scalable systems and modern web tech.
                            </p>
                        </div>
                    </Html>

                    {/* Info Cards - simplified */}
                    <Html position={[0, -1.5, 0]} center transform distanceFactor={8}>
                        <div className="flex gap-2">
                            <div className="p-2 rounded-lg glass text-center">
                                <div className="text-[9px] text-gray-500">Location</div>
                                <div className="text-[10px] font-medium">Gurugram</div>
                            </div>
                            <div className="p-2 rounded-lg glass text-center">
                                <div className="text-[9px] text-gray-500">Role</div>
                                <div className="text-[10px] font-medium">Full-Stack</div>
                            </div>
                            <div className="p-2 rounded-lg bg-primary/20 border border-primary/30 text-center">
                                <div className="text-green-400 text-[9px] font-bold">Available</div>
                            </div>
                        </div>
                    </Html>

                    {/* Experience - horizontal scroll */}
                    <Html position={[0, -4, 0]} center transform distanceFactor={9}>
                        <div className="w-[280px] text-center">
                            <h3 className="text-xs font-bold mb-2">Experience</h3>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {experiences.slice(0, 2).map((exp) => (
                                    <div key={exp.id} className="p-2 rounded-lg glass text-center flex-shrink-0 w-[120px]">
                                        <div className="text-primary font-mono text-[8px]">{exp.duration.split(' – ')[0]}</div>
                                        <h4 className="font-bold text-[10px]">{exp.role}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Html>
                </>
            ) : (
                <>
                    {/* Desktop: Side by side layout */}
                    <Float speed={0.8} rotationIntensity={0.01} floatIntensity={0.05}>
                        <Html position={[-4, 1.5, 0]} transform distanceFactor={10}>
                            <div className="w-[300px] p-4 rounded-xl glass">
                                <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-primary rounded-full" />
                                    Who I Am
                                </h3>
                                <div className="text-gray-400 text-[11px] leading-relaxed">
                                    {personalInfo.bio[0]}
                                </div>
                            </div>
                        </Html>
                    </Float>

                    <Float speed={0.6} rotationIntensity={0.01} floatIntensity={0.03}>
                        <Html position={[4, 1.5, 0]} transform distanceFactor={10}>
                            <div className="w-[200px] space-y-2">
                                <div className="p-3 rounded-lg glass">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-[9px] text-gray-500 font-mono uppercase">Location</div>
                                            <div className="text-xs font-medium">{personalInfo.location}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 rounded-lg glass">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-[9px] text-gray-500 font-mono uppercase">Role</div>
                                            <div className="text-xs font-medium">{personalInfo.title}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20">
                                    <div className="flex items-center gap-1.5">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        <span className="text-green-400 font-mono font-bold text-[10px]">OPEN FOR WORK</span>
                                    </div>
                                </div>
                            </div>
                        </Html>
                    </Float>

                    {/* Experience Preview */}
                    <Html position={[0, -3, 0]} center transform distanceFactor={12}>
                        <div className="w-[550px]">
                            <div className="text-center mb-3">
                                <h3 className="text-sm font-display font-bold">Experience Highlights</h3>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {experiences.slice(0, 3).map((exp) => (
                                    <div key={exp.id} className="p-3 rounded-lg glass text-center">
                                        <div className="text-primary font-mono text-[9px] mb-0.5">{exp.duration}</div>
                                        <h4 className="font-bold text-xs mb-0.5">{exp.role}</h4>
                                        <p className="text-gray-400 text-[10px]">{exp.company}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Html>
                </>
            )}

            <pointLight position={[0, 3, 5]} intensity={0.3} color="#ffffff" distance={25} />
        </group>
    );
});

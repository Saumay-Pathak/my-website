import { Html } from '@react-three/drei';
import { experiences, zonePositions } from '../../data/portfolio';
import { useZoneVisibility } from '../../hooks/useZoneVisibility';
import { useIsMobile } from '../../hooks/useIsMobile';
import { memo, useState } from 'react';

export const TimelineTunnel = memo(function TimelineTunnel() {
    const z = zonePositions.timeline.z;
    const isVisible = useZoneVisibility(z);
    const isMobile = useIsMobile();
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!isVisible) return null;

    return (
        <group position={[0, 0, z]}>
            <Html
                position={[0, isMobile ? 4.5 : 5, 0]}
                center
                transform
                distanceFactor={isMobile ? 8 : 10}
            >
                <div className={`text-center ${isMobile ? 'w-[280px]' : 'w-[500px]'}`}>
                    <span className="text-primary font-mono text-xs tracking-widest uppercase">Career</span>
                    <h2 className={`font-display font-bold mt-1 ${isMobile ? 'text-xl' : 'text-3xl'}`}>Experience</h2>
                </div>
            </Html>

            {/* Single centered card with navigation */}
            <Html
                position={[0, isMobile ? 0 : 0, 0]}
                center
                transform
                distanceFactor={isMobile ? 7 : 10}
            >
                <div className={`${isMobile ? 'w-[280px]' : 'w-[450px]'}`}>
                    {/* Current Experience Card */}
                    <div className="p-5 rounded-xl glass mb-4">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className={`font-bold ${isMobile ? 'text-sm' : 'text-base'}`}>
                                    {experiences[currentIndex].role}
                                </h3>
                                <p className="text-gray-400 text-xs">{experiences[currentIndex].company}</p>
                            </div>
                            <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 whitespace-nowrap">
                                {experiences[currentIndex].duration}
                            </span>
                        </div>

                        <ul className="space-y-1.5 mt-3">
                            {experiences[currentIndex].description.map((desc, i) => (
                                <li key={i} className="text-gray-400 text-xs flex items-start gap-2">
                                    <span className="mt-1 w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                                    <span>{desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Navigation Dots & Arrows */}
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                            disabled={currentIndex === 0}
                            className="w-8 h-8 rounded-full glass flex items-center justify-center disabled:opacity-30"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div className="flex gap-2">
                            {experiences.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-primary w-4' : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentIndex(prev => Math.min(experiences.length - 1, prev + 1))}
                            disabled={currentIndex === experiences.length - 1}
                            className="w-8 h-8 rounded-full glass flex items-center justify-center disabled:opacity-30"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Position indicator */}
                    <div className="text-center mt-3 text-gray-500 text-xs font-mono">
                        {currentIndex + 1} / {experiences.length}
                    </div>
                </div>
            </Html>

            <pointLight position={[0, 0, 5]} intensity={0.3} color="#00d4ff" distance={20} />
        </group>
    );
});

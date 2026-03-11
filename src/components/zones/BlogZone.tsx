import { Html } from '@react-three/drei';
import { blogPosts, zonePositions } from '../../data/portfolio';
import { useZoneVisibility } from '../../hooks/useZoneVisibility';
import { useIsMobile } from '../../hooks/useIsMobile';
import { memo, useState } from 'react';

export const BlogZone = memo(function BlogZone() {
    const z = zonePositions.blog.z;
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
                    <span className="text-primary font-mono text-xs tracking-widest uppercase">Blog</span>
                    <h2 className={`font-display font-bold mt-1 ${isMobile ? 'text-xl' : 'text-3xl'}`}>
                        Technical <span className="text-gradient">Writings</span>
                    </h2>
                </div>
            </Html>

            {/* Single centered blog card with navigation */}
            <Html
                position={[0, isMobile ? 0 : 0, 0]}
                center
                transform
                distanceFactor={isMobile ? 7 : 10}
            >
                <div className={`${isMobile ? 'w-[280px]' : 'w-[400px]'}`}>
                    {/* Current Blog Card */}
                    <article className="p-5 rounded-xl glass mb-4">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 mb-3 border-b border-white/5 pb-2">
                            <span className="px-2 py-0.5 bg-white/5 rounded">{blogPosts[currentIndex].date}</span>
                            <span>{blogPosts[currentIndex].readTime}</span>
                        </div>

                        <h3 className={`font-bold mb-2 leading-tight ${isMobile ? 'text-sm' : 'text-base'}`}>
                            {blogPosts[currentIndex].title}
                        </h3>

                        <p className="text-gray-400 text-xs leading-relaxed mb-3">
                            {blogPosts[currentIndex].excerpt}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                            {blogPosts[currentIndex].tags.map((tag) => (
                                <span key={tag} className="text-[9px] px-2 py-0.5 bg-white/5 rounded text-gray-400">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </article>

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
                            {blogPosts.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-primary w-4' : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentIndex(prev => Math.min(blogPosts.length - 1, prev + 1))}
                            disabled={currentIndex === blogPosts.length - 1}
                            className="w-8 h-8 rounded-full glass flex items-center justify-center disabled:opacity-30"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Position indicator */}
                    <div className="text-center mt-3 text-gray-500 text-xs font-mono">
                        {currentIndex + 1} / {blogPosts.length}
                    </div>
                </div>
            </Html>

            <pointLight position={[0, 3, 5]} intensity={0.25} color="#ffffff" distance={20} />
        </group>
    );
});

import { Html, Float } from '@react-three/drei';
import { projects, zonePositions } from '../../data/portfolio';
import { useZoneVisibility } from '../../hooks/useZoneVisibility';
import { useIsMobile } from '../../hooks/useIsMobile';
import { memo } from 'react';

export const ProjectNodes = memo(function ProjectNodes() {
    const z = zonePositions.projects.z;
    const isVisible = useZoneVisibility(z);
    const isMobile = useIsMobile();

    if (!isVisible) return null;

    return (
        <group position={[0, 0, z]}>
            <Html
                position={[0, isMobile ? 4.5 : 5, 0]}
                center
                transform
                distanceFactor={isMobile ? 8 : 14}
            >
                <div className={`text-center ${isMobile ? 'w-[280px]' : 'w-[500px]'}`}>
                    <span className="text-primary font-mono text-xs tracking-widest uppercase">Portfolio</span>
                    <h2 className={`font-display font-bold mt-1 ${isMobile ? 'text-xl' : 'text-3xl'}`}>
                        Featured <span className="text-gradient">Work</span>
                    </h2>
                    {!isMobile && (
                        <p className="text-gray-400 text-sm mt-2">
                            Projects showcasing my technical capabilities.
                        </p>
                    )}
                </div>
            </Html>

            {/* Mobile: Vertical stacked cards */}
            {isMobile ? (
                <Html position={[0, -1.5, 0]} center transform distanceFactor={7}>
                    <div className="w-[260px] space-y-4">
                        {projects.slice(0, 2).map((project) => (
                            <div key={project.id} className="p-3 rounded-xl glass">
                                <span className="inline-block text-[9px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 mb-2">
                                    {project.category}
                                </span>
                                <h3 className="text-sm font-bold mb-1">{project.title}</h3>
                                <p className="text-gray-400 text-[10px] leading-relaxed mb-2">
                                    {project.description.slice(0, 80)}...
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {project.techStack.slice(0, 3).map((tech) => (
                                        <span key={tech} className="px-1.5 py-0.5 text-[8px] bg-white/5 rounded text-gray-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Html>
            ) : (
                /* Desktop: Horizontal cards */
                projects.map((project, index) => {
                    const xOffset = (index - 1) * 8.5;

                    return (
                        <Float
                            key={project.id}
                            speed={0.6}
                            rotationIntensity={0.01}
                            floatIntensity={0.03}
                        >
                            <Html
                                position={[xOffset, -2.5, 0]}
                                transform
                                distanceFactor={14}
                            >
                                <div className="w-[220px] p-5 rounded-xl glass">
                                    <span className="inline-block text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 mb-3">
                                        {project.category}
                                    </span>
                                    <h3 className="text-base font-bold mb-2 leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 text-xs leading-relaxed mb-3">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1 pt-3 border-t border-white/5">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-1.5 py-0.5 text-[9px] bg-white/5 border border-white/10 rounded text-gray-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Html>
                        </Float>
                    );
                })
            )}

            <pointLight position={[0, 3, 5]} intensity={0.3} color="#ffffff" distance={25} />
        </group>
    );
});

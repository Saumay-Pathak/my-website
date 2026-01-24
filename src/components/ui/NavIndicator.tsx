import { useWorldState } from '../../hooks/useWorldState';
import { zonePositions, type ZoneKey } from '../../data/portfolio';
import { useIsMobile } from '../../hooks/useIsMobile';

export function NavIndicator() {
    const { currentZone, navigateToZone, scrollProgress } = useWorldState();
    const isMobile = useIsMobile();

    const zones = Object.entries(zonePositions) as [ZoneKey, { z: number; label: string }][];

    // On mobile, show only key zones
    const displayZones = isMobile
        ? zones.filter(([key]) => ['entry', 'about', 'projects', 'contact'].includes(key))
        : zones;

    return (
        <div className={`fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-end ${isMobile ? 'gap-4' : 'gap-3'
            }`}>
            {displayZones.map(([key, value]) => {
                const isActive = currentZone === key;

                return (
                    <button
                        key={key}
                        onClick={() => navigateToZone(key)}
                        className={`group flex items-center gap-2 md:gap-3 transition-all ${isActive ? 'scale-105' : 'opacity-50 hover:opacity-100'
                            }`}
                    >
                        {/* Label - hidden on mobile, show on hover desktop */}
                        <span
                            className={`text-[10px] md:text-xs font-mono tracking-wider transition-all ${isActive
                                    ? 'text-primary opacity-100 translate-x-0'
                                    : 'text-white opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                                } ${isMobile ? 'hidden' : ''}`}
                        >
                            {value.label}
                        </span>

                        {/* Dot indicator */}
                        <div
                            className={`rounded-full transition-all ${isActive
                                    ? 'bg-primary glow-primary'
                                    : 'bg-white/30 group-hover:bg-white/60'
                                } ${isMobile
                                    ? isActive ? 'w-2.5 h-2.5' : 'w-2 h-2'
                                    : isActive ? 'w-2 h-2 scale-150' : 'w-2 h-2'
                                }`}
                        />
                    </button>
                );
            })}

            {/* Progress Bar */}
            <div className={`bg-white/10 rounded-full mt-3 md:mt-4 overflow-hidden ${isMobile ? 'w-0.5 h-12' : 'w-0.5 h-20'
                }`}>
                <div
                    className="w-full bg-primary rounded-full transition-all duration-300"
                    style={{ height: `${scrollProgress * 100}%` }}
                />
            </div>
        </div>
    );
}

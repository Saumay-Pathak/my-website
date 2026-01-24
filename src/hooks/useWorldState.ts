import { create } from 'zustand';
import { zonePositions, type ZoneKey } from '../data/portfolio';

interface WorldState {
    currentZone: ZoneKey;
    targetZ: number;
    cameraZ: number;
    isTransitioning: boolean;
    scrollProgress: number;
    reducedMotion: boolean;

    setCurrentZone: (zone: ZoneKey) => void;
    setTargetZ: (z: number) => void;
    setCameraZ: (z: number) => void;
    setIsTransitioning: (value: boolean) => void;
    setScrollProgress: (progress: number) => void;
    setReducedMotion: (value: boolean) => void;
    navigateToZone: (zone: ZoneKey) => void;
}

export const useWorldState = create<WorldState>((set) => ({
    currentZone: 'entry',
    targetZ: 0,
    cameraZ: 0,
    isTransitioning: false,
    scrollProgress: 0,
    reducedMotion: false,

    setCurrentZone: (zone) => set({ currentZone: zone }),
    setTargetZ: (z) => set({ targetZ: z }),
    setCameraZ: (z) => set({ cameraZ: z }),
    setIsTransitioning: (value) => set({ isTransitioning: value }),
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    setReducedMotion: (value) => set({ reducedMotion: value }),

    navigateToZone: (zone) => {
        const position = zonePositions[zone];
        set({
            currentZone: zone,
            targetZ: position.z,
            isTransitioning: true,
        });
    },
}));

// Helper to get zone from Z position
export function getZoneFromZ(z: number): ZoneKey {
    const zones = Object.entries(zonePositions) as [ZoneKey, { z: number }][];
    let closestZone: ZoneKey = 'entry';
    let minDistance = Infinity;

    for (const [key, value] of zones) {
        const distance = Math.abs(z - value.z);
        if (distance < minDistance) {
            minDistance = distance;
            closestZone = key;
        }
    }

    return closestZone;
}

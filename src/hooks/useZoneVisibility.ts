import { useWorldState } from './useWorldState';
import { ZONE_VISIBILITY_THRESHOLD } from '../data/portfolio';

/**
 * Hook to check if a zone should be visible based on camera distance
 * @param zoneZ - The Z position of the zone
 * @returns boolean - Whether the zone should be rendered
 */
export function useZoneVisibility(zoneZ: number): boolean {
    const { cameraZ } = useWorldState();
    const distance = Math.abs(cameraZ - zoneZ);
    return distance < ZONE_VISIBILITY_THRESHOLD;
}

/**
 * Hook to get opacity based on camera distance from zone
 * @param zoneZ - The Z position of the zone
 * @returns number - Opacity value 0-1
 */
export function useZoneOpacity(zoneZ: number): number {
    const { cameraZ } = useWorldState();
    const distance = Math.abs(cameraZ - zoneZ);

    if (distance > ZONE_VISIBILITY_THRESHOLD) return 0;

    // Fade in/out smoothly
    const fadeStart = ZONE_VISIBILITY_THRESHOLD * 0.7;
    if (distance < fadeStart) return 1;

    return 1 - (distance - fadeStart) / (ZONE_VISIBILITY_THRESHOLD - fadeStart);
}

import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useWorldState, getZoneFromZ } from '../../hooks/useWorldState';
import { zonePositions } from '../../data/portfolio';
import * as THREE from 'three';

export function CameraController() {
    const { camera } = useThree();
    const { targetZ, setCurrentZone, setIsTransitioning, setScrollProgress, setCameraZ, navigationTrigger } = useWorldState();
    const currentZ = useRef(0);
    const targetCameraZ = useRef(0);
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const scrollVelocity = useRef(0);
    const lastStateUpdate = useRef(0);
    const touchStartY = useRef(0);
    const isTouching = useRef(false);

    // Calculate total scroll range
    const maxZ = Math.min(...Object.values(zonePositions).map(z => z.z));
    const minZ = 0;

    // Handle scroll with smooth dampening
    useEffect(() => {
        let accumulatedDelta = 0;
        let scrollTimeout: ReturnType<typeof setTimeout>;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            // Accumulate scroll delta for smoother control
            accumulatedDelta += e.deltaY * 0.08;

            // Clamp accumulated delta
            accumulatedDelta = THREE.MathUtils.clamp(accumulatedDelta, -15, 15);

            // Apply accumulated delta smoothly
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                scrollVelocity.current += accumulatedDelta;
                scrollVelocity.current = THREE.MathUtils.clamp(scrollVelocity.current, -50, 50);
                accumulatedDelta = 0;
            }, 10);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            const speed = 25;
            switch (e.key) {
                case 'ArrowDown':
                case 's':
                case 'S':
                    scrollVelocity.current += speed;
                    break;
                case 'ArrowUp':
                case 'w':
                case 'W':
                    scrollVelocity.current -= speed;
                    break;
            }
            scrollVelocity.current = THREE.MathUtils.clamp(scrollVelocity.current, -50, 50);
        };

        // Touch handling for mobile - smoother
        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 1) {
                touchStartY.current = e.touches[0].clientY;
                isTouching.current = true;
                scrollVelocity.current = 0; // Reset velocity on new touch
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isTouching.current || e.touches.length !== 1) return;
            e.preventDefault();

            const touchY = e.touches[0].clientY;
            const delta = (touchStartY.current - touchY) * 0.15;
            touchStartY.current = touchY;

            scrollVelocity.current += delta;
            scrollVelocity.current = THREE.MathUtils.clamp(scrollVelocity.current, -50, 50);
        };

        const handleTouchEnd = () => {
            isTouching.current = false;
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            clearTimeout(scrollTimeout);
        };
    }, []);

    // Handle mouse parallax (desktop only) - subtle effect
    useEffect(() => {
        let targetMouseX = 0;
        let targetMouseY = 0;
        let animationId: number;

        const handleMouseMove = (e: MouseEvent) => {
            targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        };

        const updateMouse = () => {
            mouseX.current += (targetMouseX - mouseX.current) * 0.05;
            mouseY.current += (targetMouseY - mouseY.current) * 0.05;
            animationId = requestAnimationFrame(updateMouse);
        };

        // Only add mouse listeners on non-touch devices
        if (!('ontouchstart' in window)) {
            window.addEventListener('mousemove', handleMouseMove);
            animationId = requestAnimationFrame(updateMouse);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    // Handle navigation to specific zone - smooth easing
    useEffect(() => {
        if (navigationTrigger > 0) {
            const startZ = currentZ.current;
            const startTime = performance.now();
            const duration = 1200; // Smooth 1.2 second transition

            const animate = () => {
                const elapsed = performance.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Smooth ease-in-out cubic
                const eased = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                currentZ.current = startZ + (targetZ - startZ) * eased;
                targetCameraZ.current = currentZ.current;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setIsTransitioning(false);
                }
            };

            // Reset scroll velocity when navigating
            scrollVelocity.current = 0;
            requestAnimationFrame(animate);
        }
    }, [navigationTrigger, targetZ, setIsTransitioning]);

    // Main animation frame - ultra smooth
    useFrame((_, delta) => {
        const dt = Math.min(delta, 0.033);

        // Apply scroll velocity with very smooth decay
        if (Math.abs(scrollVelocity.current) > 0.001) {
            // Increased speed multiplier (4x) for longer distances
            targetCameraZ.current -= scrollVelocity.current * dt * 4;
            targetCameraZ.current = THREE.MathUtils.clamp(targetCameraZ.current, maxZ, minZ);

            // Smooth exponential decay for natural feel (0.95 preserves momentum better)
            scrollVelocity.current *= 0.95;

            if (Math.abs(scrollVelocity.current) < 0.001) {
                scrollVelocity.current = 0;
            }
        }

        // Ultra smooth camera Z interpolation
        currentZ.current = THREE.MathUtils.lerp(currentZ.current, targetCameraZ.current, 0.06);

        // Camera position with very smooth interpolation
        const camZ = currentZ.current + 15;
        const camX = mouseX.current * 0.8;
        const camY = mouseY.current * 0.4 + 0.5;

        camera.position.z = THREE.MathUtils.lerp(camera.position.z, camZ, 0.06);
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, camX, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, camY, 0.04);

        // Smooth look-at
        camera.lookAt(0, 0, currentZ.current - 20);

        // Throttled state updates (every 100ms)
        const now = performance.now();
        if (now - lastStateUpdate.current > 100) {
            lastStateUpdate.current = now;

            const progress = Math.abs(currentZ.current - minZ) / Math.abs(maxZ - minZ);
            setScrollProgress(progress);

            const zone = getZoneFromZ(currentZ.current);
            setCurrentZone(zone);
            setCameraZ(currentZ.current);
        }
    });

    return null;
}

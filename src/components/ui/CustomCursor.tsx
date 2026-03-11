import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Track mouse position
        const mouse = { x: 0, y: 0 };
        // Track ring position (smoothed)
        const ring = { x: 0, y: 0 };

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            // Instantly move the dot
            if (dotRef.current) {
                dotRef.current.style.left = `${mouse.x}px`;
                dotRef.current.style.top = `${mouse.y}px`;
            }
        };

        // Custom animation loop for smooth ring follow
        let animationFrameId: number;
        const animateRing = () => {
            // LERP (Linear Interpolation) formula for smooth following
            ring.x += (mouse.x - ring.x) * 0.15;
            ring.y += (mouse.y - ring.y) * 0.15;

            if (ringRef.current) {
                ringRef.current.style.left = `${ring.x}px`;
                ringRef.current.style.top = `${ring.y}px`;
            }

            animationFrameId = requestAnimationFrame(animateRing);
        };

        // Hover detection logic
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Native elements that should trigger hover
            const isClickable = target.closest('a') !== null ||
                              target.closest('button') !== null ||
                              target.closest('input') !== null ||
                              getComputedStyle(target).cursor === 'pointer';
            
            setIsHovering(isClickable);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);
        animateRing();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Only render on desktop to avoid mobile touch issues
    const isMobile = useIsMobile();
    if (isMobile) return null;

    return (
        <>
            <div ref={dotRef} className={`cyber-cursor-dot ${isHovering ? 'hovering' : ''}`} />
            <div ref={ringRef} className={`cyber-cursor-ring ${isHovering ? 'hovering' : ''}`} />
        </>
    );
}

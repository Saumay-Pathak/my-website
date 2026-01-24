import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CodeRainProps {
    count?: number;
}

// Matrix-style falling code effect
export const CodeRain = memo(function CodeRain({ count = 50 }: CodeRainProps) {
    const groupRef = useRef<THREE.Group>(null);

    // Generate rain drop positions
    const drops = useMemo(() => {
        return Array.from({ length: count }, () => ({
            x: (Math.random() - 0.5) * 80,
            y: Math.random() * 40 - 20,
            z: -Math.random() * 600,
            speed: Math.random() * 0.3 + 0.1,
            length: Math.random() * 3 + 1,
            opacity: Math.random() * 0.3 + 0.1,
        }));
    }, [count]);

    // Animate rain drops falling
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.children.forEach((child, i) => {
                const drop = drops[i];
                child.position.y -= drop.speed;

                // Reset to top when reaching bottom
                if (child.position.y < -20) {
                    child.position.y = 20;
                    child.position.x = (Math.random() - 0.5) * 80;
                }
            });
        }
    });

    return (
        <group ref={groupRef}>
            {drops.map((drop, i) => (
                <mesh key={i} position={[drop.x, drop.y, drop.z]}>
                    <boxGeometry args={[0.03, drop.length, 0.03]} />
                    <meshBasicMaterial
                        color="#00d4ff"
                        transparent
                        opacity={drop.opacity}
                    />
                </mesh>
            ))}
        </group>
    );
});

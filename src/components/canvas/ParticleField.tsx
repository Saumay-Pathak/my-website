import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
    count?: number;
    spread?: number;
    depth?: number;
}

// Full particle field with rich visuals
export const ParticleField = memo(function ParticleField({
    count = 2000,
    spread = 60,
    depth = 700
}: ParticleFieldProps) {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate rich particle data
    const [positions, colors, sizes] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Distributed spread
            positions[i3] = (Math.random() - 0.5) * spread;
            positions[i3 + 1] = (Math.random() - 0.5) * spread;
            positions[i3 + 2] = -Math.random() * depth;

            // Cyan to purple gradient with variation
            const t = Math.random();
            colors[i3] = 0 + t * 0.49;      // R: 0 to 0.49
            colors[i3 + 1] = 0.83 - t * 0.6; // G: 0.83 to 0.23
            colors[i3 + 2] = 1;              // B: 1

            // Varied sizes for depth
            sizes[i] = Math.random() * 0.15 + 0.05;
        }

        return [positions, colors, sizes];
    }, [count, spread, depth]);

    // Smooth continuous rotation
    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
            pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
});

import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform vec2 uMouse;
  uniform float uTime;
  
  attribute vec3 color;
  varying vec3 vColor;

  void main() {
    vColor = color;
    
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    
    // Map NDC mouse to approximate world coordinates at this depth scale.
    // The camera has fov~55, at z~15, so the visible world width is roughly 30 units wide.
    vec2 mouseWorld = uMouse * vec2(15.0, 10.0);
    
    // Only repel particles that are relatively close to the camera (e.g. z > -100)
    // so background stars don't fly around insanely.
    float depthFactor = smoothstep(-150.0, 0.0, worldPosition.z);
    
    // Calculate distance and force
    float dist = distance(worldPosition.xy, mouseWorld);
    float force = smoothstep(8.0, 0.0, dist) * depthFactor;
    
    if (force > 0.0) {
      vec2 dir = normalize(worldPosition.xy - mouseWorld);
      worldPosition.xy += dir * force * 4.0; 
      worldPosition.z += force * 2.0; // slightly push forward
    }

    vec4 mvPosition = viewMatrix * worldPosition;
    gl_Position = projectionMatrix * mvPosition;
    
    // Scale particles by depth (simulating sizeAttenuation)
    gl_PointSize = 25.0 * (1.0 / -mvPosition.z);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    // Make particles circular with soft edges
    vec2 p = gl_PointCoord - vec2(0.5);
    float dist = length(p);
    if (dist > 0.5) discard;
    
    float alpha = smoothstep(0.5, 0.1, dist) * 0.8;
    
    // Intense glowing core
    vec3 finalColor = mix(vColor, vec3(1.0), smoothstep(0.3, 0.0, dist));
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

interface ParticleFieldProps {
    count?: number;
    spread?: number;
    depth?: number;
}

export const ParticleField = memo(function ParticleField({
    count = 2000,
    spread = 60,
    depth = 700
}: ParticleFieldProps) {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // Track mouse for physics
    const mouse = useRef(new THREE.Vector2(0, 0));

    // Generate rich particle data
    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

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
        }

        return [positions, colors];
    }, [count, spread, depth]);

    const uniforms = useMemo(() => ({
        uMouse: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 }
    }), []);

    useFrame((state, delta) => {
        // Smooth continuous rotation
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
            pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.02;
        }
        
        // Update shader uniforms
        if (materialRef.current) {
            // Smoothly interpolate mouse for fluid physics
            mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.1);
            mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.1);
            
            materialRef.current.uniforms.uMouse.value.copy(mouse.current);
            materialRef.current.uniforms.uTime.value += delta;
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
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
});

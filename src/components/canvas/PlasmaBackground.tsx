import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorldState } from '../../hooks/useWorldState';
import { useIsMobile } from '../../hooks/useIsMobile';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uScrollVelocity;
  uniform vec2 uMouse;
  
  varying vec2 vUv;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = vUv;
    
    // Base time movement
    float time = uTime * 0.2;
    
    // Add aggressive movement based on scroll velocity
    time += uScrollVelocity * 0.05;

    // Fluid distortion
    vec2 q = vec2(0.);
    q.x = snoise(st + vec2(time * 0.5, time * 0.2));
    q.y = snoise(st + vec2(time * 0.1, time * 0.6));

    vec2 r = vec2(0.);
    r.x = snoise(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * time);
    r.y = snoise(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * time);
    
    // Mouse interaction (repel fluid)
    float distToMouse = distance(st, uMouse * 0.5 + 0.5);
    float mouseInfluence = smoothstep(0.4, 0.0, distToMouse);
    r += mouseInfluence * 0.5 * uScrollVelocity;

    float f = snoise(st + r);

    // Cyberpunk Color Palette 
    // Deep dark space to vibrant cyan/magenta highlights
    vec3 color = vec3(0.02, 0.02, 0.04); // Base very dark blue/black
    
    // Magenta and Cyan fluid highlights
    color = mix(color, vec3(1.0, 0.0, 0.627), clamp(f * f * 4.0, 0.0, 1.0)); // Hot Magenta
    color = mix(color, vec3(0.0, 0.898, 1.0), clamp(length(q) * 0.5, 0.0, 1.0)); // Cyan
    
    // Make mostly transparent the further from center it gets to blend with particles
    float alpha = smoothstep(1.2, 0.2, length(st - 0.5));
    
    // Intense emission based on noise
    vec3 emissive = color * smoothstep(0.4, 0.8, f) * 2.0;
    
    gl_FragColor = vec4(color + emissive, alpha * 0.4);
  }
`;

export function PlasmaBackground() {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { cameraZ } = useWorldState();
    const lastCameraZ = useRef(cameraZ);
    const scrollVelocity = useRef(0);
    const isMobile = useIsMobile();
    
    const mouse = useRef(new THREE.Vector2(0, 0));

    // Listen to mouse movement
    useMemo(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', handleMouseMove);
        }
    }, []);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uScrollVelocity: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) }
        }),
        []
    );

    useFrame((_, delta) => {
        if (materialRef.current) {
            // Update time
            materialRef.current.uniforms.uTime.value += delta;
            
            // Calculate pseudo scroll velocity
            const currentVelocity = Math.abs(cameraZ - lastCameraZ.current);
            scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, currentVelocity, 0.1);
            lastCameraZ.current = cameraZ;
            
            materialRef.current.uniforms.uScrollVelocity.value = scrollVelocity.current;
            
            // Smooth mouse follow
            materialRef.current.uniforms.uMouse.value.lerp(mouse.current, 0.05);
        }
    });

    return (
        <mesh position={[0, 0, -50]}>
            <planeGeometry args={[isMobile ? 100 : 200, isMobile ? 100 : 200, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

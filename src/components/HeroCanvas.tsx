import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/**
 * Elegant flowing shader plane — soft aurora-like waves in ink & amber.
 * No wireframes, no grid noise on geometry. Cinematic and calm.
 */
function AuroraPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uSignal: { value: new THREE.Color("#f0a860") },
      uInk: { value: new THREE.Color("#0d0f14") },
      uBone: { value: new THREE.Color("#f2ede0") },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value.lerp(
      new THREE.Vector2(state.pointer.x, state.pointer.y),
      0.04
    );
    materialRef.current.uniforms.uResolution.value.set(
      state.size.width,
      state.size.height
    );
  });

  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = /* glsl */ `
    precision highp float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uSignal;
    uniform vec3 uInk;
    uniform vec3 uBone;
    uniform vec2 uResolution;

    // hash / value noise
    vec2 hash2(vec2 p){ p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3))); return -1.0+2.0*fract(sin(p)*43758.5453); }
    float noise(in vec2 p){
      const float K1 = 0.366025404;
      const float K2 = 0.211324865;
      vec2 i = floor(p + (p.x+p.y)*K1);
      vec2 a = p - i + (i.x+i.y)*K2;
      vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
      vec2 b = a - o + K2;
      vec2 c = a - 1.0 + 2.0*K2;
      vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
      vec3 n = h*h*h*h*vec3(dot(a,hash2(i)), dot(b,hash2(i+o)), dot(c,hash2(i+1.0)));
      return dot(n, vec3(70.0));
    }
    float fbm(vec2 p){
      float v = 0.0; float a = 0.5;
      for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
      return v;
    }

    void main(){
      vec2 uv = vUv;
      float aspect = uResolution.x / max(uResolution.y, 1.0);
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

      float t = uTime * 0.08;
      vec2 q = vec2(fbm(p*1.6 + t), fbm(p*1.6 - t + vec2(3.2,1.7)));
      vec2 r = vec2(
        fbm(p*2.4 + q*1.4 + uMouse*0.35 + vec2(1.7,9.2) + t*1.3),
        fbm(p*2.4 + q*1.4 + uMouse*0.35 + vec2(8.3,2.8) - t*1.1)
      );
      float f = fbm(p*3.0 + r);

      // soft aurora band
      float band = smoothstep(0.15, 0.9, f);
      // subtle radial vignette bias
      float rad = length(p);
      float glow = smoothstep(1.2, 0.1, rad);

      vec3 col = mix(uInk, uInk*1.6, band);
      col = mix(col, uSignal, smoothstep(0.55, 0.95, f) * 0.55 * glow);
      col = mix(col, uBone*0.55, smoothstep(0.75, 1.0, f) * 0.25 * glow);

      // deep vignette
      col *= mix(0.35, 1.0, glow);

      // subtle film grain
      float grain = (fract(sin(dot(uv*uResolution, vec2(12.9898,78.233)))*43758.5453) - 0.5) * 0.03;
      col += grain;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
      />
    </mesh>
  );
}

function DriftingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 600;
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      sizes[i] = Math.random() * 0.6 + 0.2;
    }
    return { positions, sizes };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    const geo = ref.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(time * 0.2 + i) * 0.0008;
      pos[i * 3] += Math.cos(time * 0.15 + i * 0.5) * 0.0006;
    }
    geo.attributes.position.needsUpdate = true;
    ref.current.rotation.z = time * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#f2ede0"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
    >
      <AuroraPlane />
      <DriftingParticles />
    </Canvas>
  );
}

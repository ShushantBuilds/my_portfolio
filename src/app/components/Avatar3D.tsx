'use client';
import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// ==========================================
// OPTION 1: THE BIO-DIGITAL CORE
// Updated: Bright Platinum with a persistent inner glow
// ==========================================
function BioDigitalCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * (hovered ? 0.8 : 0.2); 
    
    const targetScale = hovered ? 1.1 : 0.9;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
        <torusKnotGeometry args={[0.8, 0.25, 128, 16]} />
        <meshPhysicalMaterial 
          color="#ffffff" // Bright silver base
          metalness={1} 
          roughness={0.15}
          clearcoat={1}
          emissive="#ffffff"
          emissiveIntensity={hovered ? 0.6 : 0.15} // Persistent slight glow, intensifies on hover
          wireframe={hovered} 
        />
      </mesh>
    </Float>
  );
}

// ==========================================
// OPTION 2: THE EVOLVING RELIC
// Updated: Polished Chrome core with a bright white holographic shell
// ==========================================
function EvolvingRelic() {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (innerRef.current && outerRef.current) {
      innerRef.current.rotation.y += delta * 0.2;
      innerRef.current.rotation.x += delta * 0.1;
      
      outerRef.current.rotation.y -= delta * 0.4;
      outerRef.current.rotation.z += delta * 0.1;

      const targetOuterScale = hovered ? 1.4 : 0.8;
      outerRef.current.scale.lerp(new THREE.Vector3(targetOuterScale, targetOuterScale, targetOuterScale), 0.1);
      
      const material = outerRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = THREE.MathUtils.lerp(material.opacity, hovered ? 0.8 : 0, 0.1);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={2}>
      <group onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
        {/* Polished Chrome Core */}
        <mesh ref={innerRef}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#ffffff" roughness={0.05} metalness={1} />
        </mesh>
        
        {/* Holographic Projection */}
        <mesh ref={outerRef}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#ffffff" 
            wireframe 
            transparent 
            opacity={0} 
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ==========================================
// OPTION 3: THE FRACTURED MONOLITH
// Updated: Bright White Ceramic/Glass blocks that pop instantly
// ==========================================
function FracturedMonolith() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);

  const blocks = useMemo(() => {
    const positions = [];
    for (let x of [-1, 1]) {
      for (let y of [-1, 1]) {
        for (let z of [-1, 1]) {
          positions.push(new THREE.Vector3(x * 0.4, y * 0.4, z * 0.4));
        }
      }
    }
    return positions;
  }, []);

  const blockRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Slow idle rotation
    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.rotation.x += delta * 0.1;

    const expansion = hovered ? 1.5 : 1; 
    
    blocks.forEach((basePos, i) => {
      const mesh = blockRefs.current[i];
      if (mesh) {
        const targetPos = basePos.clone().multiplyScalar(expansion);
        mesh.position.lerp(targetPos, 0.15); 
      }
    });
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group 
        ref={groupRef} 
        onPointerOver={() => setHover(true)} 
        onPointerOut={() => setHover(false)}
        scale={0.8}
      >
        {/* Glowing Cyan Core */}
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshBasicMaterial color="#00e5ff" /> 
        </mesh>

        {/* 🚀 THE FIX: Bright, highly visible segments 🚀 */}
        {blocks.map((pos, i) => (
          <mesh 
            key={i} 
            ref={(el) => { blockRefs.current[i] = el; }} 
            position={pos}
          >
            <boxGeometry args={[0.78, 0.78, 0.78]} />
            <meshPhysicalMaterial 
              color="#ffffff"           // Pure white base
              roughness={0.1}           // Very smooth
              metalness={0.1}           // Dropped heavily so it stops reflecting the black void
              clearcoat={1}             // Adds a premium glass-like outer shine
              clearcoatRoughness={0.1} 
              emissive="#ffffff"        // Emits its own light
              emissiveIntensity={0.2}   // Guarantees it stays bright even on the shadowed sides
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
export default function Avatar3D({ onClick }: { onClick?: () => void }) {
  return (
    // 1. INCREASED SIZE: Changed from w-12/h-12 to w-20 h-20 (mobile) and md:w-24 md:h-24 (desktop)
    <div onClick={onClick} className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-white/20 bg-neutral-900/50 backdrop-blur-sm cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-transform hover:scale-105">
      {/* 2. CAMERA ADJUSTMENT: Moved the camera slightly back (z: 5) to accommodate the larger container without clipping */}
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.8} /> {/* Brightened ambient light */}
        <directionalLight position={[2, 5, 2]} intensity={3} /> {/* Brightened directional light */}
        <pointLight position={[-2, -2, -2]} intensity={1.5} color="#ffffff" />
        
        {/* 🚀 TEST OPTIONS HERE: Uncomment ONE at a time 🚀 */}
        
        {/* <BioDigitalCore /> */}
        {/* <EvolvingRelic /> */}
        <FracturedMonolith />

      </Canvas>
    </div>
  );
}
import { OrbitControls, useTexture, useMatcapTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
``;
import { useRef } from "react";
import * as THREE from "three";

export default function Experience() {
  const texture = useTexture("/test3.png");
  const [matcapTexture] = useMatcapTexture("0A0A0A_A9A9A9_525252_747474", 256);

  const groupRef = useRef<THREE.Group | null>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <group ref={groupRef} scale={0.9}>
        <mesh rotation={[Math.PI * 0.5, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.2, 100, 1]} />
          <meshMatcapMaterial matcap={matcapTexture} />
        </mesh>
        <mesh position={[0, 0, 0.11]} scale={1.2}>
          <circleGeometry args={[1, 100]} />
          <meshBasicMaterial map={texture} />
        </mesh>
        <mesh position={[0, 0, -0.11]} scale={1.2} rotation-y={Math.PI}>
          <circleGeometry args={[1, 100]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      </group>
    </>
  );
}

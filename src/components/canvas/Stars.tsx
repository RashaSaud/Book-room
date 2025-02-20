import { PointMaterial, Points, Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { Suspense, useRef, useState } from "react";

const Stars = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>();
  const [sphere] = useState(() => {
    const positions = random.inSphere(new Float64Array(5000 * 3), {
      radius: 1.1,
    });

    return new Float32Array(positions);
  });

  useFrame((_state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    // eslint-disable-next-line react/no-unknown-property
    <group>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="white"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
    // <group rotation={[0, 0, Math.PI / 4]}>
    //   <Points ref={ref} positions={sphere} stride={3} frustumCulled>
    //     <PointMaterial
    //       transparent
    //       color='white'
    //       size={0.002}
    //       sizeAttenuation={true}
    //       depthWrite={false}
    //     />
    //   </Points>
    // </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;

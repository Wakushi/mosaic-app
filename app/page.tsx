"use client";
import Experience from "@/components/canvas/Canvas";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen px-10">
      <div className="w-1/2 flex justify-center items-center flex-col">
        <div className="w-1/2">
          <h1 className="text-8xl">Mosaic</h1>
        <p className=" break-words text-xl">
          gkjbsdfkgbqkdfgjqsdfkgqksdfgkbqsdkfgbqg
        </p>
        </div>
        
      </div>
      <div className="w-1/2">
        <Canvas>
        <Experience />
      </Canvas>
      </div>
      
    </div>
  );
}

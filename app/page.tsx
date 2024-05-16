"use client";
import Experience from "@/components/canvas/Canvas";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <div className="flex pl-14 pb-20 bg-gradient-to-r from-white to-gray-300 border-b">
      <div className="w-1/2 flex flex-col mt-24">
        <div className="flex flex-col gap-10">
          <h1 className="text-8xl">Mosaic</h1>
          <p className="break-words text-slate-400">gkjbsdfkgbq</p>
          <h2 className="text-5xl">Security and traceability</h2>
          <p className="text-lg break-words w-2/3 mt-10">
            Tokenize your artworks for enhanced security and traceability,
            allowing galleries to secure their collections and individuals to
            invest by purchasing shares of tokenized art. Mosaic offers a new
            way to secure and track artworks while enabling multiple people to
            become co-owners.
          </p>
        </div>
      </div>
      <div className="w-1/2 mt-24 ">
        <Canvas>
          <Experience />
        </Canvas>
      </div>
    </div>
  );
}

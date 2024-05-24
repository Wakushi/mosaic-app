"use client"
import Experience from "@/components/canvas/Canvas"
import { Canvas } from "@react-three/fiber"

export default function Home() {
  return (
    <div className="flex pl-14 pb-20 border-b min-h-screen justify-center ">
      <div className="w-1/2 flex flex-col mt-24 justify-center">
        <div className="flex flex-col gap-5">
          <h1 className="text-9xl pb-20">Mosaic</h1>
          <p className="break-words text-slate-400">gkjbsdfkgbq</p>
          <h2 className="text-6xl">Security and traceability</h2>
          <p className="text-xl break-words mt-10">
            Tokenize your artworks for enhanced security and traceability,
            allowing galleries to secure their collections and individuals to
            invest by purchasing shares of tokenized art. Mosaic offers a new
            way to secure and track artworks while enabling multiple people to
            become co-owners.
          </p>
        </div>
      </div>
      <div className="w-1/2 h-[70vh] mt-24">
        <Canvas>
          <Experience />
        </Canvas>
      </div>
    </div>
  )
}

"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export default function Hero() {
  const router = useRouter()
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center p-8 min-h-[100vh]">
      <div className="flex flex-col justify-center items-center p-8 animate-fadeIn">
        <h1 className="text-[6vw] leading-none text-gray-800 font-bold uppercase mb-4 flex flex-col text-center drop-shadow-xl ">
          <span>
            <span>Tokenize</span>{" "}
            <span className="bg-gradient-to-r from-black dark:from-indigo-200 dark:via-sky-400 dark:to-indigo-200 via-sky-600 to-black bg-clip-text font-display tracking-tight text-transparent">
              {" "}
              Masterpieces{" "}
            </span>
          </span>
          <span className="text-[5vw]">Invest with Confidence</span>
        </h1>
        <p className="text-3xl max-w-[60%] text-gray-600 text-center mb-[3rem] drop-shadow-xl">
          Bringing transparency and security to physical art investments
          on-chain.
        </p>
        <div className="flex gap-4 w-full items-center justify-center">
          <Button
            className="w-full max-w-[200px] text-[1.1rem]"
            onClick={() => router.push("")}
          >
            I'm an art collector
          </Button>
          <Button
            className="w-full max-w-[200px] text-[1.1rem]"
            onClick={() => router.push("/marketplace")}
          >
            I'm an investor
          </Button>
        </div>
      </div>
    </div>
  )
}
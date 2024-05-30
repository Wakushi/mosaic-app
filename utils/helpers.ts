import sharp from "sharp"
import satori from "satori"

import React from "react"
import { WorkStatus } from "@/types/artwork"

export async function getOptimizedFrame(frameComponent: React.ReactElement) {
  const jerseyFontResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/fonts/Roboto-Regular.ttf`
  )
  const jerseyFont = await jerseyFontResponse.arrayBuffer()

  const svg = await satori(frameComponent, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: "Jersey20-Regular.ttf",
        data: jerseyFont,
        weight: 700,
        style: "normal",
      },
    ],
  })

  const svgBuffer = Buffer.from(svg)
  const png = sharp(svgBuffer).png()
  const response = await png.toBuffer()
  return response
}

export function getVerificationStepStatus(
  verificationStep: number
): WorkStatus {
  switch (verificationStep) {
    case 0:
      return "pending certificate extraction"
    case 1:
      return "certificate extracted"
    case 2:
      return "pending verification"
    case 3:
      return "work verified"
    case 4:
      return "tokenized"
    default:
      return "submitted"
  }
}

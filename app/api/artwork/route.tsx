import { NextRequest, NextResponse } from "next/server"
import {
  addArtwork,
  getAllArtworks,
  getArtworksByClientAddress,
} from "@/utils/firebase-data"
import { Artwork, TokenizationRequest, WorkStatus } from "@/types/artwork"
import { getTokenizationRequestById } from "@/utils/contract-interactions"

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const {
      clientAddress,
      title,
      artist,
      owner,
      price,
    }: Omit<Artwork, "id" | "status" | "createdAt"> = await req.json()
    const newArtwork: Omit<Artwork, "id"> = {
      clientAddress,
      status: "submitted",
      createdAt: Date.now(),
      title,
      artist,
      owner,
      price,
    }
    await addArtwork(newArtwork)
    return NextResponse.json({ message: "Artwork added successfully" })
  } catch (error) {
    console.error("API error:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url)
    const clientAddress = searchParams.get("clientAddress")

    if (clientAddress) {
      const artworks = await getArtworksByClientAddress(clientAddress)
      return NextResponse.json(artworks)
    } else {
      const artworks = await getAllArtworks()
      await Promise.all(
        artworks.map(async (artwork) => {
          // If the tokenization request was opened, we grab the real status and the tokenization request data
          if (artwork.tokenizationRequestId) {
            const tokenizedWork: TokenizationRequest =
              await getTokenizationRequestById(artwork.tokenizationRequestId)
            artwork.status = getVerificationStepStatus(
              tokenizedWork.verificationStep
            )
            artwork.tokenizationRequest = tokenizedWork
          }
        })
      )
      return NextResponse.json(artworks)
    }
  } catch (error) {
    console.error("API error:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
  }
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
      return "pending tokenization"
    case 5:
      return "tokenized"
    default:
      return "submitted"
  }
}

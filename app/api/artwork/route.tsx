import { NextRequest, NextResponse } from "next/server"
import {
  addArtwork,
  deleteArtworkTokenizationRequest,
  getAllArtworks,
  getArtworksByClientAddress,
} from "@/utils/firebase-data"
import { Artwork, TokenizationRequest } from "@/types/artwork"
import { getTokenizationRequestById } from "@/utils/contract-interactions"
import { getVerificationStepStatus } from "@/utils/helpers"

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
    let artworks: Artwork[]
    if (clientAddress) {
      artworks = await getArtworksByClientAddress(clientAddress)
    } else {
      artworks = await getAllArtworks()
    }
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
  } catch (error) {
    console.error("API error:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url)
    const tokenizationRequestId = searchParams.get("tokenizationRequestId")
    if (!tokenizationRequestId) {
      throw new Error("Tokenization request ID is required")
    }

    const deleted = await deleteArtworkTokenizationRequest(
      tokenizationRequestId
    )

    if (!deleted) {
      throw new Error("Tokenization request not found")
    }

    return NextResponse.json({ message: "Artwork deleted successfully" })
  } catch (error) {
    console.error("API error:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
  }
}

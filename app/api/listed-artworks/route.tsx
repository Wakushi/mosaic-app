import { NextRequest, NextResponse } from "next/server"
import { fetchListedArtworks } from "@/utils/contract-interactions"

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const listedArtworks = await fetchListedArtworks()
    return NextResponse.json(listedArtworks)
  } catch (error) {
    console.error("API error:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
  }
}

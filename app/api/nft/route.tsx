import { DWORK_SHARES_ADDRESS_POLYGON } from "@/lib/contract"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url)
    const clientAddress = searchParams.get("clientAddress")

    if (!clientAddress) {
      return NextResponse.json(
        { error: "Client address is required" },
        { status: 400 }
      )
    }

    const nftRequest = await fetch(
      `https://polygon-amoy.g.alchemy.com/nft/v3/${process.env.ALCHEMY_API_KEY}/getNFTsForOwner?owner=${clientAddress}`
    )
    const response = await nftRequest.json()
    const filteredNfts = response.ownedNfts.filter(
      (nft: any) =>
        nft.contract.address.toLowerCase() ===
        DWORK_SHARES_ADDRESS_POLYGON.toLowerCase()
    )

    return NextResponse.json(filteredNfts)
  } catch (error) {
    console.error("API error:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
  }
}

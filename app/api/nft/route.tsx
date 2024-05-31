import { DWORK_SHARES_ADDRESS_POLYGON } from "@/lib/contract"
import { MoralisNft } from "@/types/moralis-nft"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const clientAddress = searchParams.get("clientAddress")
  try {
    if (!clientAddress) {
      return NextResponse.json(
        { error: "Client address is required" },
        { status: 400 }
      )
    }

    const apiKey = process.env.MORALIS_API_KEY

    if (!apiKey) {
      throw new Error("MORALIS_API_KEY is not defined")
    }
    const url = `https://deep-index.moralis.io/api/v2.2/${clientAddress}/nft?chain=polygon%20amoy`
    console.log("API request:", url)
    const nftRequest = await fetch(url, {
      headers: {
        "x-api-key": apiKey,
      },
    })
    const response = await nftRequest.json()
    const filteredNfts = response.result.filter((nft: MoralisNft) => {
      return (
        nft.token_address.toLowerCase() ===
        DWORK_SHARES_ADDRESS_POLYGON.toLowerCase()
      )
    })
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

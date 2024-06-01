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

    const ownedNfts: { token_id: string; amount: string }[] = []

    const apiKey = process.env.MORALIS_API_KEY

    if (!apiKey) {
      throw new Error("MORALIS_API_KEY is not defined")
    }
    const url = `https://deep-index.moralis.io/api/v2.2/${clientAddress}/nft?chain=polygon%20amoy`
    const nftMoralisRequest = await fetch(url, {
      headers: {
        "x-api-key": apiKey,
      },
    })
    const moralisResponse = await nftMoralisRequest.json()
    const moralisFilteredNfts = moralisResponse.result.filter(
      (nft: MoralisNft) => {
        return (
          nft.token_address.toLowerCase() ===
          DWORK_SHARES_ADDRESS_POLYGON.toLowerCase()
        )
      }
    )

    if (moralisFilteredNfts.length) {
      moralisFilteredNfts.forEach((nft: MoralisNft) => {
        ownedNfts.push({
          token_id: nft.token_id,
          amount: nft.amount,
        })
      })
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
    if (filteredNfts.length) {
      filteredNfts.forEach((nft: any) => {
        if (ownedNfts.find((ownedNft) => ownedNft.token_id === nft.tokenId))
          return
        ownedNfts.push({
          token_id: nft.tokenId,
          amount: nft.balance,
        })
      })
    }

    return NextResponse.json(ownedNfts)
  } catch (error) {
    console.error("API error:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
  }
}

import { NextRequest, NextResponse } from "next/server"
import { getListedShares } from "@/utils/contract-interactions"

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const listedShares = await getListedShares()
    return NextResponse.json(listedShares)
  } catch (error) {
    console.error("API error:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
  }
}

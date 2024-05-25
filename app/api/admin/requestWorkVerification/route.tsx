import { NextRequest, NextResponse } from "next/server"
import { requestWorkVerification } from "@/utils/contract-interactions"

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { tokenizationRequestId, title } = await req.json()

    if (!tokenizationRequestId || !title) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const result = await requestWorkVerification(tokenizationRequestId)
    return NextResponse.json({
      message: "Work verification requested successfully",
      result,
    })
  } catch (error) {
    console.error("API error:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
  }
}

import { getListedItemById } from "@/utils/contract-interactions"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  context: { params: Params }
): Promise<NextResponse> {
  try {
    const id = context.params.id
    const listedItem = await getListedItemById(id)
    return NextResponse.json(listedItem)
  } catch (error) {
    console.error("API error:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
  }
}

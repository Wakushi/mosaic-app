import { NextRequest, NextResponse } from "next/server";
import { performUpkeep } from "@/utils/contract-interactions";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { tokenizationRequestId } = await req.json();

    if (typeof tokenizationRequestId !== 'number') {
      return NextResponse.json(
        { error: "Invalid request, tokenizationRequestId must be a number" },
        { status: 400 }
      );
    }

    const result = await performUpkeep(tokenizationRequestId);
    return NextResponse.json({
      message: "Upkeep performed successfully",
      result,
    });
  } catch (error) {
    console.error("API error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}


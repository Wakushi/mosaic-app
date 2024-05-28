import { NextRequest, NextResponse } from "next/server";
import { listMarketShareitem } from "@/utils/user-contract-interactions";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { sharesTokenId, amount, priceUsd, value } = await req.json();

    if (!sharesTokenId || !amount || !priceUsd || !value) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transaction = await listMarketShareitem(
      sharesTokenId,
      amount,
      priceUsd,
      BigInt(value) 
    );

    return NextResponse.json(transaction);
  } catch (error) {
    console.error("API error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}




// app/api/getArtworks/route.tsx
import { NextRequest, NextResponse } from "next/server";
import { getArtworksByClientAddress } from "@/utils/firebase-data";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const clientAddress = searchParams.get("clientAddress");

    if (!clientAddress) {
      return NextResponse.json(
        { error: "Client address is required" },
        { status: 400 }
      );
    }

    const artworks = await getArtworksByClientAddress(clientAddress);
    return NextResponse.json(artworks);
  } catch (error) {
    console.error("API error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}

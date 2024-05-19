import { NextRequest, NextResponse } from "next/server";
import { getHashesByTitle } from "@/utils/firebase-data";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const hashes = await getHashesByTitle(title);

    if (!hashes) {
      return NextResponse.json(
        { error: "Hashes not found for the given title" },
        { status: 404 }
      );
    }

    return NextResponse.json(hashes);
  } catch (error) {
    console.error("API error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}
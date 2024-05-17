import { NextRequest, NextResponse } from 'next/server';
import { getAllArtworks } from '@/utils/firebase-data'; 

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const artworks = await getAllArtworks();
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
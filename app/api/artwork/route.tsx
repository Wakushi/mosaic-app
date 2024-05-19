import { NextRequest, NextResponse } from "next/server";
import {
  addArtwork,
  getAllArtworks,
  getArtworksByClientAddress,
} from "@/utils/firebase-data";
import { Artwork } from "@/types/artwork";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const {
      clientAddress,
      title,
      artist,
      owner,
      price,
    }: Omit<Artwork, "id" | "status" | "createdAt"> = await req.json();
    const newArtwork: Omit<Artwork, "id"> = {
      clientAddress,
      status: "pending",
      createdAt: Date.now(),
      title,
      artist,
      owner,
      price,
    };
    await addArtwork(newArtwork);
    return NextResponse.json({ message: "Artwork added successfully" });
  } catch (error) {
    console.error("API error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const clientAddress = searchParams.get("clientAddress");

    if (clientAddress) {
      const artworks = await getArtworksByClientAddress(clientAddress);
      return NextResponse.json(artworks);
    } else {
      const artworks = await getAllArtworks();
      return NextResponse.json(artworks);
    }
  } catch (error) {
    console.error("API error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}

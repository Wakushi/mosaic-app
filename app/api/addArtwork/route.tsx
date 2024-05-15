import { NextRequest, NextResponse } from 'next/server';
import { addArtwork } from '@/utils/firebase-data'; 
import { Artwork } from '@/types/artwork'; 

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { clientAddress, title, artist, owner }: Omit<Artwork, 'id' | 'status' | 'createdAt'> = await req.json();
    const newArtwork: Omit<Artwork, 'id'> = {
      clientAddress,
      status: 'pending',
      createdAt: Date.now(),
      title,
      artist,
      owner,
    };
    await addArtwork(newArtwork);
    return NextResponse.json({ message: 'Artwork added successfully' });
  } catch (error) {
    console.error('API error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}

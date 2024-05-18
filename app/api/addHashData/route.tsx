import { NextRequest, NextResponse } from 'next/server';
import { addHashData } from '@/utils/firebase-data';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { clientAddress, title, hashReport, hashArtwork, hashCertificate } = await req.json();

    if (!clientAddress || !title || !hashReport || !hashArtwork || !hashCertificate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await addHashData(clientAddress, title, hashReport, hashArtwork, hashCertificate);
    return NextResponse.json({ message: 'Hash data added successfully' });
  } catch (error) {
    console.error('API error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}


import { NextRequest, NextResponse } from 'next/server';
import getOptimizedFrame from '@/utils/helpers';
import CertificateAuthentificity from '@/components/certificat-authentificity';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { title, artist } = await req.json();

    if (!title || !artist) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const certificateBuffer = await getOptimizedFrame(<CertificateAuthentificity title={title} artist={artist} />);

    return NextResponse.json({ certificateBuffer: certificateBuffer.toString('base64') });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to generate certificate' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { openTokenizationRequest } from '@/utils/contract-interactions';
import { updateArtworkTokenizationRequest } from '@/utils/firebase-data';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { customerSubmissionIPFSHash, appraiserReportIPFSHash, certificateIPFSHash, clientAddress, artworkTitle } = await req.json();

    if (!customerSubmissionIPFSHash || !appraiserReportIPFSHash || !certificateIPFSHash || !clientAddress || !artworkTitle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await openTokenizationRequest(customerSubmissionIPFSHash, appraiserReportIPFSHash, certificateIPFSHash, clientAddress, artworkTitle);

    await updateArtworkTokenizationRequest(artworkTitle, result.toString());

    return NextResponse.json({ message: 'Tokenization request opened successfully', result });
  } catch (error) {
    console.error('API error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}




import { NextRequest, NextResponse } from 'next/server';
import { createShares } from '@/utils/contract-interactions';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { tokenizationRequestId , shareSupply, sharePriceUsd, artworkTitle } = await req.json();

    if (!tokenizationRequestId || !shareSupply || !sharePriceUsd || !artworkTitle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await createShares(tokenizationRequestId, shareSupply, sharePriceUsd, artworkTitle);
    return NextResponse.json({ message: 'Shares created successfully', result });
  } catch (error) {
    console.error('API error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}

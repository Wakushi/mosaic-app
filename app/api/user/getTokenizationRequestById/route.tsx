import { NextRequest, NextResponse } from 'next/server';
import { getTokenizationRequestById } from '@/utils/contract-interactions';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("requestId");

    if (!requestId) {
      return NextResponse.json({ error: 'Request ID is required' }, { status: 400 });
    }

    const requestDetails = await getTokenizationRequestById(BigInt(requestId));
    return NextResponse.json(requestDetails);
  } catch (error) {
    console.error('API error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}

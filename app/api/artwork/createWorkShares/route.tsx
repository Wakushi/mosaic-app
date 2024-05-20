import { NextRequest, NextResponse } from 'next/server';
import { createWorkShares } from '@/utils/contract-interactions';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { contractAddress, totalShares } = await req.json();

    if (!contractAddress || !totalShares) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await createWorkShares(contractAddress, totalShares);
    return NextResponse.json({ message: 'Work shares created successfully', result });
  } catch (error) {
    console.error('API error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}
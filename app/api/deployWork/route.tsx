import { NextRequest, NextResponse } from 'next/server';
import { deployWork } from '@/utils/contract-interactions';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { clientAddress, workName, workSymbol, customerSubmissionIPFSHash, appraiserReportIPFSHash } = await req.json();

    if (!clientAddress || !workName || !workSymbol || !customerSubmissionIPFSHash || !appraiserReportIPFSHash) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await deployWork(clientAddress, workName, workSymbol, customerSubmissionIPFSHash, appraiserReportIPFSHash);
    return NextResponse.json({ message: 'Work deployed successfully', result });
  } catch (error) {
    console.error('API error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}

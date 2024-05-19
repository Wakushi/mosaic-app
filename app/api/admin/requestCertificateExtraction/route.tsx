import { NextRequest, NextResponse } from 'next/server';
import { requestCertificateExtraction } from '@/utils/contract-interactions'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { args } = await req.json();

    if (!args || !Array.isArray(args) || args.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await requestCertificateExtraction(args);
    return NextResponse.json({ message: 'Certificate extraction requested successfully', result });
  } catch (error) {
    console.error('API error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}
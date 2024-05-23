import { NextRequest, NextResponse } from "next/server";
import { getAllSharesDetails, getShareDetail } from "@/utils/contract-interactions";
import { buyInitialShare } from '@/utils/contract-interactions';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const shareDetail = await getShareDetail(Number(id));
      return NextResponse.json(shareDetail);
    } else {
      const sharesDetails = await getAllSharesDetails();
      return NextResponse.json(sharesDetails);
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

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { sharesTokenId, shareAmount, value } = await req.json();

    if (typeof sharesTokenId !== 'number' || typeof shareAmount !== 'number' || typeof value !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const result = await buyInitialShare(sharesTokenId, shareAmount, BigInt(value));

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('API error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getListedItems } from "@/utils/contract-interactions"; 

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const listedItems = await getListedItems(); 
    return NextResponse.json(listedItems);
  } catch (error) {
    console.error("API error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}
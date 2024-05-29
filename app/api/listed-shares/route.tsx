import { NextRequest, NextResponse } from "next/server";
import { getListedItems } from "@/utils/contract-interactions"; // Assurez-vous que cette fonction existe et est correctement importée

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const listedItems = await getListedItems(); // Cette fonction doit renvoyer les items listés
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
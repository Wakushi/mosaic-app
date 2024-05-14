// pages/api/addClient.ts
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@/types/client';
import { addClient } from '@/utils/firebase-data';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const clientData: Client = await req.json();
    await addClient(clientData);
    return NextResponse.json({ message: 'Client added successfully' });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: 'Failed to add client' }, { status: 500 });
  }
}
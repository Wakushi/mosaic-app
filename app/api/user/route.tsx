import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@/types/client';
import { addClient, getUserByAddress } from '@/utils/firebase-data';

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

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const clientAddress = searchParams.get("clientAddress");

    if (!clientAddress) {
      return NextResponse.json({ error: 'Client address is required' }, { status: 400 });
    }

    const user = await getUserByAddress(clientAddress);

    if (!user) {
      return NextResponse.json({ isRegistered: false }, { status: 404 });
    }

    const response = NextResponse.json({ isRegistered: true, user });

    response.cookies.set('isAdmin', (user.role === 'admin').toString(), { httpOnly: true });
    response.cookies.set('userType', user.userType, { httpOnly: true });

    return response;
  } catch (error) {
    console.error('API error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}


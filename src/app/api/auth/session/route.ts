import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    
    if (session && session.isAuthenticated) {
      return NextResponse.json({ 
        authenticated: true,
        username: session.username 
      });
    }
    
    return NextResponse.json({ 
      authenticated: false 
    });
  } catch {
    return NextResponse.json({ 
      authenticated: false 
    });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { login, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Please enter both username and password' },
        { status: 400 }
      );
    }

    const result = await login(username, password);

    if (result.success && result.token) {
      const response = NextResponse.json({ 
        success: true, 
        message: result.message 
      });

      response.cookies.set(COOKIE_NAME, result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: result.message },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong in the realm of love...' },
      { status: 500 }
    );
  }
}

// auth route for username
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const username = formData.get('username') as string;
    const userId = formData.get('userId') as string;

    if (!username || !userId) {
      return NextResponse.json(
        { success: false, error: 'Username and userId are required' },
        { status: 400 }
      );
    }

    const response = NextResponse.json({ success: true, username });

    // ✅ Set both username and userId as cookies
    response.cookies.set('username', username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
    });

    response.cookies.set('userId', userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error('API Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}

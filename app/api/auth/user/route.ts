import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get session and user data
    const sessionData = getSession(sessionToken);
    if (!sessionData) {
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: sessionData.user.id,
        email: sessionData.user.email,
        firstName: sessionData.user.firstName,
        lastName: sessionData.user.lastName,
        phone: sessionData.user.phone,
        dateOfBirth: sessionData.user.dateOfBirth,
        emailVerified: sessionData.user.emailVerified
      }
    });

  } catch (error) {
    console.error('User API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
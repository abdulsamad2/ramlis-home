import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, setPasswordResetToken, initializeDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Initialize database
    initializeDatabase();
    
    // Check if user exists
    const user = getUserByEmail(email);
    
    if (!user) {
      // For security, always return success even if email doesn't exist
      return NextResponse.json(
        { message: 'If an account with that email exists, we have sent reset instructions.' },
        { status: 200 }
      );
    }

    // Generate a simple reset token (in production, use crypto.randomBytes or similar)
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour from now

    // Store reset token in database
    setPasswordResetToken(email, resetToken, resetExpires.toISOString());

    // In a real application, you would send an email here
    // For development, log the reset link to console
    console.log(`\n=== PASSWORD RESET REQUEST ===`);
    console.log(`Email: ${email}`);
    console.log(`Reset token: ${resetToken}`);
    console.log(`Reset URL: http://localhost:3000/account/reset-password?token=${resetToken}`);
    console.log(`This link expires in 1 hour.`);
    console.log(`================================\n`);

    return NextResponse.json(
      { message: 'If an account with that email exists, we have sent reset instructions.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
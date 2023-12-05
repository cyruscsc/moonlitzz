import { getUserById, updateUser, deleteUser } from '@/lib/action';
import { authOptions } from '@/lib/next-auth';
import { SessionUser } from '@/types/auth.types';
import { Session, getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

// Get user by session
export async function GET(req: NextRequest) {
  try {
    const session: (Session & { user: SessionUser }) | null =
      await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({
        status: 401,
      });
    }
    const user = await getUserById(session.user.id);
    if (!user) {
      return NextResponse.json({
        status: 404,
      });
    }
    return NextResponse.json({
      status: 200,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
    });
  }
}

// Update user by session
export async function PUT(req: NextRequest) {
  try {
    const session: (Session & { user: SessionUser }) | null =
      await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({
        status: 401,
        error: 'You have to sign in first!',
      });
    }
    const user = await getUserById(session.user.id);
    if (!user) {
      return NextResponse.json({
        status: 404,
        error: 'User not found!',
      });
    }
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({
        status: 400,
        error: 'Name missing!',
      });
    }
    const updatedUser = await updateUser(user.id, { name });
    return NextResponse.json({
      status: 200,
      message: 'User updated!',
      user: updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: 'Sorry, this is our fault!',
    });
  }
}

// Delete user by session
export async function DELETE(req: NextRequest) {
  try {
    const session: (Session & { user: SessionUser }) | null =
      await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({
        status: 401,
        error: 'You have to sign in first!',
      });
    }
    const user = await getUserById(session.user.id);
    if (!user) {
      return NextResponse.json({
        status: 404,
        error: 'User not found!',
      });
    }
    await deleteUser(user.id);
    return NextResponse.json({
      status: 200,
      message: 'User deleted!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: 'Sorry, this is our fault!',
    });
  }
}

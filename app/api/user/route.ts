import { getUserById, updateUser, deleteUser } from '@/lib/action';
import { authOptions } from '@/lib/next-auth';
import { SessionUser } from '@/types/auth.types';
import { Session, getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session: (Session & { user: SessionUser }) | null =
      await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({ status: 401 });
    }
    const user = await getUserById(session.user.id);
    if (!user) {
      return NextResponse.json({ status: 404 });
    }
    return NextResponse.json({ status: 200, user });
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error.message });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session: (Session & { user: SessionUser }) | null =
      await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({ status: 401 });
    }
    const user = await getUserById(session.user.id);
    if (!user) {
      return NextResponse.json({ status: 404 });
    }
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ status: 400 });
    }
    const updatedUser = await updateUser(user.id, { name });
    return NextResponse.json({ status: 200, user: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error.message });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session: (Session & { user: SessionUser }) | null =
      await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({ status: 401 });
    }
    const user = await getUserById(session.user.id);
    if (!user) {
      return NextResponse.json({ status: 404 });
    }
    await deleteUser(user.id);
    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error.message });
  }
}

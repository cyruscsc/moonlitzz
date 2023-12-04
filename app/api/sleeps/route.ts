import { createSleep, getSleeps } from '@/lib/action';
import { authOptions } from '@/lib/next-auth';
import { SessionUser } from '@/types/auth.types';
import { SleepCreateInput } from '@/types/data.types';
import { Session, getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session: (Session & { user: SessionUser }) | null =
      await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({ status: 401 });
    }
    const sleeps = await getSleeps(session.user.id);
    if (!sleeps) {
      return NextResponse.json({ status: 404 });
    }
    return NextResponse.json({ status: 200, sleeps });
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session: (Session & { user: SessionUser }) | null =
      await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({ status: 401 });
    }
    const data = await req.json();
    if (!data) {
      return NextResponse.json({ status: 400 });
    }
    const newSleepData: SleepCreateInput = {
      ...data,
      userId: session.user.id,
    };
    const newSleep = await createSleep(newSleepData);
    return NextResponse.json({ status: 201, newSleep });
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error.message });
  }
}

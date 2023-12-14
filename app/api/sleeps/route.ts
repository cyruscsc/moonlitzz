import { endpoints } from '@/constants';
import { createSleep, getSleeps } from '@/lib/action';
import { authOptions } from '@/lib/next-auth';
import { SessionUser } from '@/types/auth.types';
import { SleepCreateInput } from '@/types/data.types';
import { Session, getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

// Get all sleep records
export async function GET(req: NextRequest) {
  try {
    const skip =
      parseInt(req.nextUrl.searchParams.get('skip') as string) ||
      endpoints.options.skip;
    const take =
      parseInt(req.nextUrl.searchParams.get('take') as string) ||
      endpoints.options.take;
    const order =
      (req.nextUrl.searchParams.get('order') as 'asc' | 'desc') ||
      endpoints.options.order;
    const session: (Session & { user: SessionUser }) | null =
      await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({
        status: 401,
        error: 'You have to sign in first!',
      });
    }
    const sleeps = await getSleeps(session.user.id, skip, take, order);
    if (!sleeps) {
      return NextResponse.json({ status: 404, error: 'No sleep records!' });
    }
    return NextResponse.json({
      status: 200,
      sleeps,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: 'Sorry, this is our fault!',
    });
  }
}

// Create new sleep record
export async function POST(req: NextRequest) {
  try {
    const session: (Session & { user: SessionUser }) | null =
      await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({
        status: 401,
        error: 'You have to sign in first!',
      });
    }
    const data = await req.json();
    if (!data) {
      return NextResponse.json({
        status: 400,
        error: 'Sleep record data missing!',
      });
    }
    const newSleepData: SleepCreateInput = {
      ...data,
      userId: session.user.id,
    };
    const newSleep = await createSleep(newSleepData);
    return NextResponse.json({
      status: 201,
      message: 'Sleep record created!',
      newSleep,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: 'Sorry, this is our fault!',
    });
  }
}

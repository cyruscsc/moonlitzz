import { getSleep, updateSleep, deleteSleep } from '@/lib/action';
import { authOptions } from '@/lib/next-auth';
import { SessionUser } from '@/types/auth.types';
import { SleepUpdateInput } from '@/types/data.types';
import { Session, getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface ParamsProps {
  id: string;
}

// Get sleep record by id
export async function GET(
  req: NextRequest,
  { params }: { params: ParamsProps }
) {
  try {
    const session: (Session & { user: SessionUser }) | null =
      await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({
        status: 401,
        error: 'You have to sign in first!',
      });
    }
    if (!params.id) {
      return NextResponse.json({
        status: 400,
        error: 'Sleep record id missing!',
      });
    }
    const sleep = await getSleep(params.id);
    if (!sleep) {
      return NextResponse.json({
        status: 404,
        error: 'Sleep record not found!',
      });
    }
    if (sleep.userId !== session.user.id) {
      return NextResponse.json({
        status: 403,
        error: 'You can only retrieve your own sleep records!',
      });
    }
    return NextResponse.json({
      status: 200,
      sleep,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: 'Sorry, this is our fault!',
    });
  }
}

// Update sleep record by id
export async function PUT(
  req: NextRequest,
  { params }: { params: ParamsProps }
) {
  try {
    const session: (Session & { user: SessionUser }) | null =
      await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({
        status: 401,
        error: 'You have to sign in first!',
      });
    }
    if (!params.id) {
      return NextResponse.json({
        status: 400,
        error: 'Sleep record id missing!',
      });
    }
    const data: SleepUpdateInput = await req.json();
    if (!data) {
      return NextResponse.json({
        status: 400,
        error: 'Sleep record data missing!',
      });
    }
    const sleep = await getSleep(params.id);
    if (!sleep) {
      return NextResponse.json({
        status: 404,
        error: 'Sleep record not found!',
      });
    }
    if (sleep.userId !== session.user.id) {
      return NextResponse.json({
        status: 403,
        error: 'You can only update your own sleep records!',
      });
    }
    const updatedSleep = await updateSleep(params.id, data);
    return NextResponse.json({
      status: 200,
      message: 'Sleep record updated!',
      updatedSleep,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: 'Sorry, this is our fault!',
    });
  }
}

// Delete sleep record by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: ParamsProps }
) {
  try {
    const session: (Session & { user: SessionUser }) | null =
      await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({
        status: 401,
        error: 'You have to sign in first!',
      });
    }
    if (!params.id) {
      return NextResponse.json({
        status: 400,
        error: 'Sleep record id missing!',
      });
    }
    const sleep = await getSleep(params.id);
    if (!sleep) {
      return NextResponse.json({
        status: 404,
        error: 'Sleep record not found!',
      });
    }
    if (sleep.userId !== session.user.id) {
      return NextResponse.json({
        status: 403,
        error: 'You can only delete your own sleep records!',
      });
    }
    const deletedSleep = await deleteSleep(params.id);
    return NextResponse.json({
      status: 200,
      message: 'Sleep record deleted!',
      deletedSleep,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: 'Sorry, this is our fault!',
    });
  }
}

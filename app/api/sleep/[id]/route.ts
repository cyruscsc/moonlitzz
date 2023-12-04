import { getSleep, updateSleep, deleteSleep } from '@/lib/action';
import { authOptions } from '@/lib/next-auth';
import { SessionUser } from '@/types/auth.types';
import { SleepUpdateInput } from '@/types/data.types';
import { NextApiRequest } from 'next';
import { Session, getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextApiRequest) {
  try {
    const session: (Session & { user: SessionUser }) | null =
      await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({ status: 401 });
    }
    const { id } = req.query as { id: string };
    if (!id) {
      return NextResponse.json({ status: 400 });
    }
    const sleep = await getSleep(id);
    if (!sleep) {
      return NextResponse.json({ status: 404 });
    }
    if (sleep.userId !== session.user.id) {
      return NextResponse.json({ status: 403 });
    }
    return NextResponse.json({ status: 200, sleep });
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error.message });
  }
}

export async function PUT(req: NextRequest & NextApiRequest) {
  try {
    const session: (Session & { user: SessionUser }) | null =
      await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({ status: 401 });
    }
    const { id } = req.query as { id: string };
    if (!id) {
      return NextResponse.json({ status: 400 });
    }
    const data: SleepUpdateInput = await req.json();
    if (!data) {
      return NextResponse.json({ status: 400 });
    }
    const sleep = await getSleep(id);
    if (!sleep) {
      return NextResponse.json({ status: 404 });
    }
    if (sleep.userId !== session.user.id) {
      return NextResponse.json({ status: 403 });
    }
    const updatedSleep = await updateSleep(id, data);
    return NextResponse.json({ status: 200, updatedSleep });
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error.message });
  }
}

export async function DELETE(req: NextApiRequest) {
  try {
    const session: (Session & { user: SessionUser }) | null =
      await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({ status: 401 });
    }
    const { id } = req.query as { id: string };
    if (!id) {
      return NextResponse.json({ status: 400 });
    }
    const sleep = await getSleep(id);
    if (!sleep) {
      return NextResponse.json({ status: 404 });
    }
    if (sleep.userId !== session.user.id) {
      return NextResponse.json({ status: 403 });
    }
    const deletedSleep = await deleteSleep(id);
    return NextResponse.json({ status: 200, deletedSleep });
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error.message });
  }
}

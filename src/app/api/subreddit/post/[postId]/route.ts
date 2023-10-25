import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function DELETE(req: Request, { params }: { params: { postId: string } }) {
  try {
    const { searchParams } = new URL(req.url);

    const session = await getAuthSession();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await db.post.delete({
      where: {
        id: params.postId,
      },
    });

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 });
    }

    return new Response('Could not delete this posts.', { status: 500 });
  }
}

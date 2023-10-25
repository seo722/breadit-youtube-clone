import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { CommentValidator } from '@/lib/validators/comment';
import { useParams } from 'next/navigation';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { postId, text, replyToId } = CommentValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    await db.comment.create({
      data: {
        text,
        postId,
        authorId: session.user.id,
        replyToId,
      },
    });

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 });
    }

    return new Response('Could not create comment at this time, please try again later.', { status: 500 });
  }
}

// interface contextProps {
//   params:{postId: string}
// }

// export async function DELETE(req: Request, context: contextProps) {
//   try {
//     const body = await req.json();

//     const session = await getAuthSession();

//     if (!session?.user) {
//       return new Response('Unauthorized', { status: 401 });
//     }

//     await db.post.delete({
//       where: {
//         id: ,
//       },
//     });

//     return new Response('OK');
//   } catch (error) {}
// }

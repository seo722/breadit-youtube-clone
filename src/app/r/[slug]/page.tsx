import { FC } from 'react';
import { notFound } from 'next/navigation';

import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import MiniCreatePost from '@/components/MiniCreatePost';
import PostFeed from '@/components/PostFeed';

interface PageProps {
  params: {
    slug: string;
  };
}

const Page: FC<PageProps> = async ({ params }: PageProps) => {
  const { slug } = params;

  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        orderBy: {
          createdAt: 'desc',
        }, // add this orderby to desc to avoid post duplicated

        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });

  if (!subreddit) return notFound();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">r/{subreddit.name}</h1>
      <MiniCreatePost session={session} />
      {/* todo: show post in user feed */}
      <PostFeed subredditName={subreddit.name} initialPosts={subreddit.posts} />
      {/* infinite scrolling */}
    </>
  );
};

export default Page;

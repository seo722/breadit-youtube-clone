'use client';

import { FC } from 'react';
import { Session } from 'next-auth';
import { usePathname, useRouter } from 'next/navigation';

import { ImageIcon, Link2 } from 'lucide-react';
import UserAvatar from './UserAvatar';
import { Input } from '@/components/ui/Input';
import { Button } from './ui/Button';

interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }: MiniCreatePostProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <li className="overflow-hidden rounded-md bg-white shadow">
      <div className="h-full px-6 py-4 flex justify-between gap-6">
        <div className="relative">
          <UserAvatar user={{ name: session?.user.name || null, image: session?.user.image || null }} />
        </div>

        <Input readOnly onClick={() => router.push(pathname + '/submit')} placeholder="Create Post" />

        <Button variant="ghost" onClick={() => router.push(pathname + '/submit')}>
          <ImageIcon className="text-zinc-600" />
        </Button>

        <Button variant="ghost" onClick={() => router.push(pathname + '/submit')}>
          <Link2 className="text-zinc-600" />
        </Button>
      </div>
    </li>
  );
};

export default MiniCreatePost;

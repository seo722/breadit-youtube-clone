import { User } from 'next-auth';
import { FC } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import Image from 'next/image';
import { Icons } from './Icons';
import { AvatarProps } from '@radix-ui/react-avatar';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'name' | 'image'>;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  console.log(user);
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image src={user.image} alt="profile picture" referrerPolicy="no-referrer" fill priority />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">
            {user?.name}
            <Icons.user className="h-4 w-4" />
          </span>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
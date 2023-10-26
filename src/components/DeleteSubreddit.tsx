'use client';

import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Button } from './ui/Button';
import { MoreHorizontal } from 'lucide-react';

interface DeleteSubredditProps {
  slug: string;
}

const DeleteSubreddit: FC<DeleteSubredditProps> = ({ slug }) => {
  const router = useRouter();

  const { mutate: deleteS, isLoading } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/subreddit/${slug}`);
    },

    onError: () => {
      return toast({
        title: 'Something went wrong',
        description: 'Your community was not deleted, please try again later.',
        variant: 'destructive',
      });
    },

    onSuccess: () => {
      router.refresh();

      return toast({
        description: 'Your community has been deleted.',
      });
    },
  });

  return (
    <Button
      isLoading={isLoading}
      onClick={() => deleteS()}
      variant="ghost"
      size="sm"
      className="rounded-full hover:bg-blue-200"
    >
      <MoreHorizontal className="w-4 h-4" />
    </Button>
  );
};

export default DeleteSubreddit;

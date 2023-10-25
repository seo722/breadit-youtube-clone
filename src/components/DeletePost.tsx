'use client';

import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Button } from './ui/Button';
import { Trash } from 'lucide-react';

interface DeletePostProps {
  postId: string;
}

const DeletePost: FC<DeletePostProps> = ({ postId }) => {
  const router = useRouter();

  const { mutate: deleteP, isLoading } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/subreddit/post/${postId}`);
    },

    onError: () => {
      return toast({
        title: 'Something went wrong',
        description: 'Your post was not deleted, please try again later.',
        variant: 'destructive',
      });
    },

    onSuccess: () => {
      router.push('/');

      return toast({
        description: 'Your post has been deleted.',
      });
    },
  });

  return (
    <Button isLoading={isLoading} onClick={() => deleteP()} variant="outline" size="sm" className="text-zinc-700">
      <Trash className="h-4 w-4 mr-2" />
      Delete
    </Button>
  );
};

export default DeletePost;

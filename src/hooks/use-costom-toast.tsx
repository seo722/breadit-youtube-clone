import Link from 'next/link';
import { toast } from './use-toast';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button';

export const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Login required.',
      description: 'You need to be logged in to do that.',
      variant: 'destructive',
      action: (
        <Link className={cn(buttonVariants({ variant: 'outline' }))} href="/sign-in" onClick={() => dismiss()}>
          Login
        </Link>
      ),
    });
  };

  return { loginToast };
};

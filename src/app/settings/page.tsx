import UserNameForm from '@/components/UserNameForm';
import { authOptions, getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Settings',
  description: 'Manage account and website settings.',
};

const page = async ({}) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || '/sign-in');
  }

  return (
    <div className="sm:container flex flex-col items-center h-full max-w-3xl mx-auto sm:pt-6">
      <div className="w-full mx-auto ">
        <div className="grid items-start gap-8 pb-6 pl-2">
          <h1 className="font-bold text-3xl md:text-4xl">Settings</h1>
        </div>

        <div className=" ">
          <UserNameForm user={{ id: session.user.id, username: session.user.username || '' }} />
        </div>
      </div>
    </div>
  );
};

export default page;

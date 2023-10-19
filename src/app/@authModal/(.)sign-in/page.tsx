import CloseModal from '@/components/CloseModal';
import SignIn from '@/components/SignIn';
import { FC } from 'react';

interface PageProps {}

const Page: FC<PageProps> = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white w-full h-fit py-20 px-2 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default Page;

// 실제 sign-in 페이지로 가기 전에
// 페이지를 intercept 해서 여기로 온 다음
// reload 했을 때 그제서야 실제 sign-in 페이지로 보내줌

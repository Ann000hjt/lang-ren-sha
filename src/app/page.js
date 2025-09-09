'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/home');
  };

  return (
    <div 
      onClick={handleEnter}
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center cursor-pointer"
      style={{
        backgroundImage: "url('/狼人杀封面.jpg')"
      }}
    >
      <div className="text-black text-2xl font-bold pointer-events-none">
        点击进入
      </div>
    </div>
  );
}
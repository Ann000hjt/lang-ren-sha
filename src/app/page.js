'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/home');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url('/狼人杀封面.jpg')"
      }}
    >
      <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-8">
        <button
          onClick={handleEnter}
          className="text-white text-2xl font-bold px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          点击进入
        </button>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page1() {
  const router = useRouter();
  const [playerNames, setPlayerNames] = useState(Array(9).fill(''));

  useEffect(() => {
    const savedNames = localStorage.getItem('playerNames');
    if (savedNames) {
      setPlayerNames(JSON.parse(savedNames));
    }
  }, []);

  const handleNameChange = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
    
    const players = newNames.map((name, i) => name.trim() || String(i + 1) + '号');
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('playerNames', JSON.stringify(newNames));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="bg-white shadow-md rounded-lg mb-6 p-4">
        <div className="flex gap-6">
          <button
            onClick={() => router.push('/home')}
            className="px-4 py-2 text-gray-600 hover:text-blue-600"
          >
            Home
          </button>
          <button
            onClick={() => router.push('/page1')}
            className="px-4 py-2 text-blue-600 font-semibold border-b-2 border-blue-600"
          >
            Page1
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">角色配置</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-800">平民数量：4</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="font-semibold text-red-800">狼人数量：3</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="font-semibold text-purple-800">女巫数量：1</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="font-semibold text-green-800">预言家数量：1</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">玩家姓名</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 9 }, (_, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg bg-gray-50">
                <span className="text-lg font-semibold text-black w-6">
                  {index + 1}
                </span>
                <input
                  type="text"
                  value={playerNames[index]}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={String(index + 1) + '号'}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
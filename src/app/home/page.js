'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [players, setPlayers] = useState(Array.from({ length: 9 }, (_, i) => String(i + 1) + '号'));
  const [roles, setRoles] = useState({});
  const [roleConfig, setRoleConfig] = useState({
    狼人: 3,
    预言家: 1,
    女巫: 1,
    猎人: 0,
    守卫: 0,
    平民: 4
  });

  useEffect(() => {
    const savedPlayers = localStorage.getItem('players');
    const savedRoles = localStorage.getItem('roles');
    const savedRoleConfig = localStorage.getItem('roleConfig');
    
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    } else {
      setPlayers(Array.from({ length: 9 }, (_, i) => String(i + 1) + '号'));
    }
    
    if (savedRoles) {
      setRoles(JSON.parse(savedRoles));
    }
    
    if (savedRoleConfig) {
      setRoleConfig(JSON.parse(savedRoleConfig));
    }
  }, []);

  const assignRoles = () => {
    const roleImageMap = {
      '狼人': '/狼人.jpg',
      '预言家': '/预言家.jpg',
      '女巫': '/女巫.jpg',
      '平民': '/平民.jpg',
      '猎人': '/猎人.jpg',
      '守卫': '/守卫.jpg'
    };

    const allRoles = [];
    Object.entries(roleConfig).forEach(([roleName, count]) => {
      for (let i = 0; i < count; i++) {
        allRoles.push({
          name: roleName,
          image: roleImageMap[roleName]
        });
      }
    });

    const shuffledRoles = allRoles.sort(() => Math.random() - 0.5);
    const newRoles = {};
    shuffledRoles.forEach((role, index) => {
      newRoles[index] = role;
    });

    setRoles(newRoles);
    localStorage.setItem('roles', JSON.stringify(newRoles));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="bg-white shadow-md rounded-lg mb-6 p-4">
        <div className="flex gap-6">
          <button
            onClick={() => router.push('/home')}
            className="px-4 py-2 text-blue-600 font-semibold border-b-2 border-blue-600"
          >
            Home
          </button>
          <button
            onClick={() => router.push('/page1')}
            className="px-4 py-2 text-gray-600 hover:text-blue-600"
          >
            Page1
          </button>
        </div>
      </nav>

      <div className="grid grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
        {Array.from({ length: 9 }, (_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-square bg-gray-200 flex items-center justify-center">
              {roles[index] ? (
                <img
                  src={roles[index].image}
                  alt={roles[index].name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-4xl text-gray-400">?</div>
              )}
            </div>
            <div className="p-4 text-center bg-gray-50">
              <p className="text-lg font-medium text-black">
                {players[index] || String(index + 1) + '号'}
              </p>
              {roles[index] && (
                <p className="text-sm text-gray-600 mt-1">
                  {roles[index].name}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={assignRoles}
          className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          开始抽选
        </button>
      </div>
    </div>
  );
}
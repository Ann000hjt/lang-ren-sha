'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page1() {
  const router = useRouter();
  const [playerNames, setPlayerNames] = useState(Array(9).fill(''));
  const [roleConfig, setRoleConfig] = useState({
    狼人: 3,
    预言家: 1,
    女巫: 1,
    猎人: 0,
    守卫: 0,
    平民: 4
  });

  useEffect(() => {
    const savedNames = localStorage.getItem('playerNames');
    const savedRoleConfig = localStorage.getItem('roleConfig');
    
    if (savedNames) {
      setPlayerNames(JSON.parse(savedNames));
    }
    
    if (savedRoleConfig) {
      setRoleConfig(JSON.parse(savedRoleConfig));
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

  const handleRoleConfigChange = (roleName, count) => {
    const newConfig = { ...roleConfig };
    newConfig[roleName] = Math.max(0, count);
    
    // 计算其他角色总数
    const otherRoles = Object.keys(newConfig).filter(role => role !== '平民');
    const otherTotal = otherRoles.reduce((sum, role) => sum + newConfig[role], 0);
    
    // 平民数量 = 9 - 其他角色总数
    newConfig['平民'] = Math.max(0, 9 - otherTotal);
    
    setRoleConfig(newConfig);
    localStorage.setItem('roleConfig', JSON.stringify(newConfig));
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(roleConfig).map(([roleName, count]) => {
              const colorMap = {
                平民: 'bg-blue-50 text-blue-800 border-blue-200',
                狼人: 'bg-red-50 text-red-800 border-red-200',
                女巫: 'bg-purple-50 text-purple-800 border-purple-200',
                预言家: 'bg-green-50 text-green-800 border-green-200',
                猎人: 'bg-orange-50 text-orange-800 border-orange-200',
                守卫: 'bg-indigo-50 text-indigo-800 border-indigo-200'
              };
              
              return (
                <div key={roleName} className={`p-4 rounded-lg border-2 ${colorMap[roleName]}`}>
                  <div className="text-center mb-3">
                    <p className="font-semibold text-lg">{roleName}</p>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleRoleConfigChange(roleName, count - 1)}
                      disabled={roleName === '平民' || count <= 0}
                      className="w-8 h-8 rounded-full bg-white border-2 border-current flex items-center justify-center font-bold text-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="font-bold text-xl w-8 text-center">{count}</span>
                    <button
                      onClick={() => handleRoleConfigChange(roleName, count + 1)}
                      disabled={roleName === '平民' || (Object.values(roleConfig).reduce((sum, c) => sum + c, 0) - roleConfig['平民'] >= 9)}
                      className="w-8 h-8 rounded-full bg-white border-2 border-current flex items-center justify-center font-bold text-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-gray-700">
              总计: {Object.values(roleConfig).reduce((sum, count) => sum + count, 0)} / 9 人
            </p>
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
import React from 'react';
import { users, currentUser } from '../../data/mockData';

const RightSidebar: React.FC = () => {
  const suggestions = Object.values(users).slice(0, 4);

  return (
    <aside className="hidden lg:block w-[320px] pl-8 py-8 h-screen sticky top-0 overflow-y-auto z-10">
      {/* Current User Switcher */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img src={currentUser.avatar} alt={currentUser.username} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <p className="font-bold text-sm text-gray-900">{currentUser.username}</p>
            <p className="text-gray-500 text-sm">{currentUser.name}</p>
          </div>
        </div>
        <button className="text-xs font-semibold text-blue-500 hover:text-blue-700">Chuyển</button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-500 font-bold text-sm">Gợi ý cho bạn</h3>
        <button className="text-xs font-semibold text-gray-900 hover:text-gray-600">Xem tất cả</button>
      </div>

      <div className="space-y-4">
        {suggestions.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                 <span className="text-sm font-semibold hover:underline cursor-pointer">{user.username}</span>
                 <span className="text-xs text-gray-400">Gợi ý mới</span>
              </div>
            </div>
            <button className="text-xs font-bold text-blue-500 hover:text-blue-700">Theo dõi</button>
          </div>
        ))}
      </div>

      <footer className="mt-8">
        <p className="text-xs text-gray-300 leading-5">
          Giới thiệu • Trợ giúp • Báo chí • API • Việc làm • Quyền riêng tư • Điều khoản
        </p>
        <p className="text-xs text-gray-300 mt-4">© 2024 VIBECHECK FROM META</p>
      </footer>
    </aside>
  );
};

export default RightSidebar;
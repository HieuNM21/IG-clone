import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, Heart, UserCircle, MessageCircle, Menu, Compass } from 'lucide-react';
import { currentUser } from '../../data/mockData';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Trang chủ', path: '/' },
    { icon: Search, label: 'Tìm kiếm', path: '/explore' },
    { icon: Compass, label: 'Khám phá', path: '/discover', desktopOnly: true },
    { icon: MessageCircle, label: 'Tin nhắn', path: '/messages' },
    { icon: Heart, label: 'Thông báo', path: '/notifications', desktopOnly: true },
    { icon: PlusSquare, label: 'Tạo mới', path: '/create' },
  ];

  const DesktopLogo = () => (
    <div className="mb-8 px-2 hidden md:block">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent italic tracking-tighter">
        VibeCheck
      </h1>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar - Left */}
      <aside className="hidden md:flex flex-col w-[245px] h-screen sticky top-0 border-r border-gray-100 bg-white/80 backdrop-blur-xl px-4 py-6 z-50">
        <DesktopLogo />
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'font-bold text-gray-900 bg-gray-50' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <item.icon
                      size={24}
                      className={isActive ? 'text-pink-600' : 'group-hover:text-gray-900'}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </motion.div>
                  <span className="text-base">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
          
          <NavLink
             to="/profile"
             className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive ? 'font-bold' : 'text-gray-500 hover:bg-gray-50'
                }`
              }
          >
            <div className={`rounded-full p-[2px] ${location.pathname === '/profile' ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600' : 'bg-transparent'}`}>
                <img src={currentUser.avatar} alt="Me" className="w-6 h-6 rounded-full border border-white" />
            </div>
            <span>Hồ sơ</span>
          </NavLink>
        </nav>

        <div className="mt-auto px-4">
          <button className="flex items-center gap-4 text-gray-500 hover:text-gray-900 py-3 w-full">
            <Menu size={24} />
            <span>Xem thêm</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white/90 backdrop-blur-lg border-t border-gray-200 z-50 px-4 py-3 flex justify-between items-center safe-area-bottom">
        {navItems.filter(i => !i.desktopOnly).map((item) => (
            <NavLink key={item.path} to={item.path} className="flex flex-col items-center justify-center w-full">
              {({ isActive }) => (
                 <motion.div whileTap={{ scale: 0.8 }}>
                    <item.icon
                      size={26}
                      className={isActive ? 'text-pink-600' : 'text-gray-400'}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                 </motion.div>
              )}
            </NavLink>
        ))}
        <NavLink to="/profile" className="flex flex-col items-center justify-center w-full">
            <div className={`rounded-full p-[2px] ${location.pathname === '/profile' ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600' : 'bg-transparent'}`}>
                <img src={currentUser.avatar} alt="Me" className="w-7 h-7 rounded-full border border-white object-cover" />
            </div>
        </NavLink>
      </nav>
    </>
  );
};

export default Sidebar;
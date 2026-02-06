import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, Heart, MessageCircle, Menu, Compass, Settings, Activity, Bookmark, Moon, AlertTriangle, LogOut, Repeat } from 'lucide-react';
import { currentUser } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const navItems = [
    { icon: Home, label: 'Trang chủ', path: '/' },
    { icon: Search, label: 'Tìm kiếm', path: '/explore' },
    { icon: Compass, label: 'Khám phá', path: '/discover', desktopOnly: true },
    { icon: MessageCircle, label: 'Tin nhắn', path: '/messages' },
    { icon: Heart, label: 'Thông báo', path: '/notifications', desktopOnly: true },
    { icon: PlusSquare, label: 'Tạo mới', path: '/create' },
  ];

  const moreMenuItems = [
    { icon: Settings, label: 'Cài đặt' },
    { icon: Activity, label: 'Hoạt động của bạn' },
    { icon: Bookmark, label: 'Đã lưu' },
    { icon: Moon, label: 'Chuyển chế độ' },
    { icon: AlertTriangle, label: 'Báo cáo sự cố' },
    { icon: Repeat, label: 'Chuyển tài khoản', separator: true },
    { icon: LogOut, label: 'Đăng xuất' },
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

        <div className="mt-auto relative" ref={menuRef}>
          <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute bottom-16 left-0 w-[260px] bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-2 overflow-hidden z-50"
                >
                    {moreMenuItems.map((item, index) => (
                        <React.Fragment key={index}>
                        {item.separator && <div className="h-[4px] bg-gray-50 my-1 mx-0" />}
                        <button className="flex items-center gap-3 w-full p-3.5 text-left hover:bg-gray-50 rounded-lg transition-colors group">
                            <item.icon size={20} className="text-gray-500 group-hover:text-gray-900" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{item.label}</span>
                        </button>
                        </React.Fragment>
                    ))}
                </motion.div>
            )}
          </AnimatePresence>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center gap-4 py-3 px-4 w-full rounded-xl transition-all duration-200 ${
                isMenuOpen ? 'bg-gray-50 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Menu size={24} className={isMenuOpen ? 'text-gray-900' : ''} strokeWidth={isMenuOpen ? 2.5 : 2} />
            <span className={isMenuOpen ? 'font-bold' : 'text-base'}>Xem thêm</span>
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
import React, { useState } from 'react';
import { chatSessions, users, currentUser } from '../data/mockData';
import { Search, Edit, Phone, Video, Info, Send, Smile, Image } from 'lucide-react';
import { motion } from 'framer-motion';

const DirectMessages: React.FC = () => {
  const [activeChatId, setActiveChatId] = useState<string | null>(chatSessions[0].id);
  
  const activeSession = chatSessions.find(c => c.id === activeChatId);
  const activePartner = activeSession ? users[activeSession.partnerId] : null;

  return (
    <div className="flex w-full h-screen bg-white md:rounded-3xl md:h-[calc(100vh-2rem)] md:my-4 md:border md:border-gray-200 overflow-hidden shadow-sm">
      
      {/* Sidebar / Chat List */}
      <div className={`${activeChatId ? 'hidden md:flex' : 'flex'} w-full md:w-[350px] flex-col border-r border-gray-100 bg-white`}>
        <div className="p-5 flex items-center justify-between border-b border-gray-50">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="font-bold text-xl">{currentUser.username}</span>
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L6 6L11 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <Edit size={24} />
        </div>

        <div className="p-2">
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2">
                <Search size={18} className="text-gray-400" />
                <input type="text" placeholder="Tìm kiếm tin nhắn..." className="bg-transparent outline-none text-sm w-full" />
            </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex justify-between px-5 py-3">
             <span className="font-bold text-base">Tin nhắn</span>
             <span className="text-gray-500 text-sm">Tin nhắn chờ</span>
          </div>

          {chatSessions.map((session) => {
            const partner = users[session.partnerId];
            return (
              <div 
                key={session.id}
                onClick={() => setActiveChatId(session.id)}
                className={`flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition ${activeChatId === session.id ? 'bg-gray-50' : ''}`}
              >
                <div className="relative">
                    <img src={partner.avatar} alt="" className="w-14 h-14 rounded-full object-cover" />
                    {partner.isOnline && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>}
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="font-medium text-sm truncate">{partner.name}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span className={`truncate ${session.unreadCount > 0 ? 'font-bold text-black' : ''}`}>{session.lastMessage}</span>
                        <span>• {session.updatedAt}</span>
                    </div>
                </div>
                {session.unreadCount > 0 && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      {activeSession && activePartner ? (
        <div className={`${!activeChatId ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-white h-full`}>
            {/* Chat Header */}
            <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <button className="md:hidden" onClick={() => setActiveChatId(null)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <div className="flex items-center gap-3">
                        <img src={activePartner.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                        <div>
                            <p className="font-bold text-sm">{activePartner.name}</p>
                            <p className="text-xs text-gray-500">{activePartner.isOnline ? 'Đang hoạt động' : 'Hoạt động 5p trước'}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-6 text-gray-800">
                    <Phone size={24} />
                    <Video size={24} />
                    <Info size={24} />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <img src={activePartner.avatar} className="w-24 h-24 rounded-full object-cover mb-3" />
                    <h3 className="font-bold text-lg">{activePartner.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{activePartner.username} • VibeCheck</p>
                    <button className="bg-gray-100 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-200">Xem trang cá nhân</button>
                </div>
                
                {activeSession.messages.map((msg) => (
                    <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex w-full ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                    >
                         {!msg.isMe && (
                             <img src={activePartner.avatar} className="w-7 h-7 rounded-full mr-2 self-end mb-1" />
                         )}
                         <div 
                            className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                                msg.isMe 
                                    ? 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white rounded-br-none' 
                                    : 'bg-gray-100 text-gray-900 rounded-bl-none'
                            }`}
                         >
                            {msg.text}
                         </div>
                    </motion.div>
                ))}
            </div>

            {/* Input */}
            <div className="p-4 shrink-0">
                <div className="flex items-center gap-3 bg-gray-100 rounded-3xl px-4 py-2 border border-transparent focus-within:border-gray-300 transition">
                    <div className="bg-blue-500 p-1.5 rounded-full text-white cursor-pointer hover:bg-blue-600">
                         <Image size={16} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Nhắn tin..." 
                        className="flex-1 bg-transparent outline-none text-sm min-h-[24px]"
                    />
                    <button className="text-gray-500 hover:text-gray-900 font-semibold text-sm">
                        <Smile size={24} />
                    </button>
                    {/* Only show send if typing, otherwise show mic/image - keeping simple here */}
                </div>
            </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center flex-col">
            <div className="w-24 h-24 rounded-full border-2 border-gray-800 flex items-center justify-center mb-4">
                <Send size={40} className="-ml-1 mt-1 -rotate-45" />
            </div>
            <h2 className="text-xl font-medium">Tin nhắn của bạn</h2>
            <p className="text-gray-500 text-sm mt-2">Gửi ảnh và tin nhắn riêng tư cho bạn bè.</p>
            <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600">Gửi tin nhắn</button>
        </div>
      )}
    </div>
  );
};

export default DirectMessages;
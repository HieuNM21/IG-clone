import React from 'react';
import { stories, users, currentUser } from '../../data/mockData';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const StoryRail: React.FC = () => {
  return (
    <div className="w-full bg-white/50 backdrop-blur-sm md:bg-transparent pt-4 pb-6 overflow-x-auto hide-scrollbar">
      <div className="flex gap-4 px-4 md:px-0">
        
        {/* My Story Add Button */}
        <div className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer">
          <div className="relative">
             <div className="w-[66px] h-[66px] rounded-full p-[2px] bg-white">
                <img src={currentUser.avatar} alt="Me" className="w-full h-full rounded-full object-cover border border-gray-200" />
             </div>
             <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-0.5 border-2 border-white">
                <Plus size={14} strokeWidth={4} />
             </div>
          </div>
          <span className="text-xs text-gray-500 font-medium truncate w-[70px] text-center">Tin của bạn</span>
        </div>

        {/* Other Stories */}
        {stories.map((story) => {
          const user = story.userId === 'me' ? currentUser : users[story.userId];
          if (!user) return null;

          return (
            <motion.div 
              key={story.id} 
              className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className={`w-[70px] h-[70px] rounded-full p-[3px] ${story.hasUnseen ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' : 'bg-gray-200'}`}>
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                  <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                </div>
              </div>
              <span className="text-xs text-gray-600 truncate w-[74px] text-center">{user.username}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StoryRail;
import React from 'react';
import StoryRail from '../components/Feed/StoryRail';
import PostCard from '../components/Feed/PostCard';
import { posts } from '../data/mockData';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-[630px] mx-auto min-h-screen pb-20 md:pb-0">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex justify-between items-center">
         <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent italic tracking-tighter">
            VibeCheck
         </h1>
         <div className="flex gap-4">
            <div className="relative">
                <i className="w-2 h-2 bg-red-500 rounded-full absolute -top-0.5 -right-0.5 border border-white"></i>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
         </div>
      </div>

      <div className="w-full mb-6 mt-2">
        <StoryRail />
      </div>

      <div className="w-full px-0 md:px-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
        
        {/* End of Feed */}
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p>Bạn đã xem hết các bài viết mới</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
import React, { useState } from 'react';
import { Post, User } from '../../types';
import { users } from '../../data/mockData';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const user = users[post.userId];
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleDoubleTap = () => {
    setIsLiked(true);
    setShowHeartOverlay(true);
    setTimeout(() => setShowHeartOverlay(false), 800);
  };

  if (!user) return null;

  return (
    <article className="bg-white md:rounded-3xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
             <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full border-2 border-white object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{user.username}</span>
                <span className="text-gray-400 text-xs">• {post.timestamp}</span>
            </div>
            {post.location && <p className="text-xs text-gray-500">{post.location}</p>}
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-900">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image / Media */}
      <div 
        className="relative w-full aspect-square bg-gray-100 overflow-hidden cursor-pointer"
        onDoubleClick={handleDoubleTap}
      >
        <img src={post.imageUrl} alt="Post Content" className="w-full h-full object-cover" />
        
        {/* Double Tap Heart Animation */}
        <AnimatePresence>
            {showHeartOverlay && (
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <Heart size={100} className="text-white fill-white drop-shadow-lg" />
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
                <motion.button 
                    whileTap={{ scale: 0.8 }}
                    onClick={handleLike}
                    className="focus:outline-none"
                >
                    <Heart 
                        size={28} 
                        className={isLiked ? "text-red-500 fill-red-500" : "text-gray-800 hover:text-gray-500"} 
                        strokeWidth={isLiked ? 0 : 2}
                    />
                </motion.button>
                <button className="hover:opacity-60 transition">
                    <MessageCircle size={28} className="text-gray-800" strokeWidth={2} />
                </button>
                <button className="hover:opacity-60 transition">
                    <Send size={28} className="text-gray-800 -rotate-45 mb-1" strokeWidth={2} />
                </button>
            </div>
            <motion.button 
                whileTap={{ scale: 0.8 }}
                onClick={() => setIsSaved(!isSaved)}
            >
                <Bookmark 
                    size={28} 
                    className={isSaved ? "text-gray-800 fill-gray-800" : "text-gray-800 hover:text-gray-500"} 
                    strokeWidth={2} 
                />
            </motion.button>
        </div>

        {/* Likes Count */}
        <div className="font-bold text-sm mb-2">
            {isLiked ? (post.likes + 1).toLocaleString() : post.likes.toLocaleString()} lượt thích
        </div>

        {/* Caption */}
        <div className="mb-2">
            <span className="font-bold text-sm mr-2">{user.username}</span>
            <span className="text-sm text-gray-800">{post.caption}</span>
        </div>

        {/* Comments Preview */}
        {post.comments.length > 0 && (
            <div className="text-gray-500 text-sm mb-2 cursor-pointer hover:text-gray-800">
                Xem tất cả {post.comments.length + 15} bình luận
            </div>
        )}
        
        {/* Add Comment Input */}
        <div className="flex items-center gap-2 mt-2">
            <input 
                type="text" 
                placeholder="Thêm bình luận..." 
                className="w-full text-sm outline-none bg-transparent placeholder-gray-400"
            />
            <button className="text-blue-500 font-semibold text-sm opacity-50 hover:opacity-100">Đăng</button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
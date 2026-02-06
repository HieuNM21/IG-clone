import React, { useState, useEffect } from 'react';
import StoryRail from '../components/Feed/StoryRail';
import PostCard from '../components/Feed/PostCard';
import { motion } from 'framer-motion';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Bắt đầu gọi API..."); // LOG 1
        const response = await fetch('/api/images/post?pageIdx=1&pageSize=100');
        const data = await response.json();
        
        console.log("Dữ liệu thô từ API:", data); // LOG 2: Kiểm tra data gốc

        if (data && data.Object) {
          // MAPPING QUAN TRỌNG: Phải khớp với JSON trả về
          const mappedPosts = data.Object.map(item => {
            return {
              id: item.id,
              // Xử lý User
              username: item.user?.username || 'Người dùng ẩn',
              userAvatar: item.user?.photo || `https://ui-avatars.com/api/?name=${item.user?.username || 'User'}&background=random`,
              
              // Xử lý nội dung (Check kỹ phần này)
              content: item.text,   // API trả về 'text', ta gán vào 'content'
              image: item.photo,    // API trả về 'photo', ta gán vào 'image'
              timestamp: item.createTime,
              
              // Các chỉ số giả lập (vì API chưa có)
              likes: 120, 
              comments: 5,
              isPinned: item.isPinned
            };
          });

          console.log("Dữ liệu sau khi map:", mappedPosts); // LOG 3: Kiểm tra data trước khi render
          setPosts(mappedPosts);
        }
      } catch (err) {
        console.error("Lỗi fetch:", err);
        setError("Lỗi tải trang");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="p-10 text-center">Đang tải...</div>;

  return (
    <div className="flex flex-col items-center w-full max-w-[630px] mx-auto min-h-screen pb-20">
      <div className="w-full mb-6 mt-2">
        <StoryRail />
      </div>

      <div className="w-full px-0 md:px-4 space-y-4">
        {posts.length > 0 ? (
            posts.map((post) => (
              // Bỏ motion.div tạm thời, dùng div thường
              <div key={post.id}>
                 {/* Truyền cả object post vào */}
                <PostCard post={post} /> 
              </div>
            ))
        ) : (
            <div className="text-center py-10 text-gray-500">
                Không có bài viết nào (Length = 0)
            </div>
        )}
        
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <p>Bạn đã xem hết các bài viết mới</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
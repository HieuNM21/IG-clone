import { User, Post, Story, ChatSession } from '../types';

export const currentUser: User = {
  id: 'me',
  username: 'minh_chau_ne',
  name: 'Minh Châu',
  avatar: 'https://picsum.photos/id/64/200/200',
};

export const users: Record<string, User> = {
  'u1': { id: 'u1', username: 'thanh_tung_dev', name: 'Thanh Tùng', avatar: 'https://picsum.photos/id/1012/200/200', isOnline: true },
  'u2': { id: 'u2', username: 'linh_cat', name: 'Khánh Linh', avatar: 'https://picsum.photos/id/338/200/200', isOnline: true },
  'u3': { id: 'u3', username: 'hoang_nam_vlog', name: 'Hoàng Nam', avatar: 'https://picsum.photos/id/1005/200/200', isOnline: false },
  'u4': { id: 'u4', username: 'trang_makeup', name: 'Thu Trang', avatar: 'https://picsum.photos/id/342/200/200', isOnline: true },
  'u5': { id: 'u5', username: 'duc_photo', name: 'Minh Đức', avatar: 'https://picsum.photos/id/237/200/200', isOnline: false },
};

export const stories: Story[] = [
  { id: 's1', userId: 'me', imageUrl: 'https://picsum.photos/id/40/300/500', hasUnseen: false },
  { id: 's2', userId: 'u1', imageUrl: 'https://picsum.photos/id/41/300/500', hasUnseen: true },
  { id: 's3', userId: 'u2', imageUrl: 'https://picsum.photos/id/42/300/500', hasUnseen: true },
  { id: 's4', userId: 'u3', imageUrl: 'https://picsum.photos/id/43/300/500', hasUnseen: false },
  { id: 's5', userId: 'u4', imageUrl: 'https://picsum.photos/id/44/300/500', hasUnseen: true },
];

export const posts: Post[] = [
  {
    id: 'p1',
    userId: 'u2',
    imageUrl: 'https://picsum.photos/id/28/800/800',
    caption: 'Cuối tuần chill phết 🌿☕️ #weekend #vibes',
    likes: 1240,
    comments: [
      { id: 'c1', userId: 'u1', text: 'View đẹp quá em ơi!', timestamp: '10p' },
      { id: 'c2', userId: 'u3', text: 'Ở đâu thế?', timestamp: '5p' }
    ],
    timestamp: '2 giờ trước',
    location: 'Đà Lạt, Việt Nam'
  },
  {
    id: 'p2',
    userId: 'u1',
    imageUrl: 'https://picsum.photos/id/180/800/600',
    caption: 'Coding all night long 💻🚀 Dự án mới sắp ra mắt nha cả nhà!',
    likes: 856,
    comments: [],
    timestamp: '5 giờ trước',
    location: 'Hà Nội'
  },
  {
    id: 'p3',
    userId: 'u4',
    imageUrl: 'https://picsum.photos/id/325/800/1000',
    caption: 'Mùa thu Hà Nội thật đẹp 🍂',
    likes: 2300,
    comments: [
      { id: 'c3', userId: 'u5', text: 'Xinh xỉu lun', timestamp: '1h' }
    ],
    timestamp: '1 ngày trước'
  }
];

export const chatSessions: ChatSession[] = [
  {
    id: 'chat1',
    partnerId: 'u1',
    lastMessage: 'Oke chốt kèo tối nay nhé!',
    unreadCount: 2,
    updatedAt: '10:30 AM',
    messages: [
      { id: 'm1', senderId: 'u1', text: 'Alo tối nay rảnh không?', timestamp: '10:25 AM', isMe: false },
      { id: 'm2', senderId: 'me', text: 'Rảnh nha, đi đâu thế?', timestamp: '10:26 AM', isMe: true },
      { id: 'm3', senderId: 'u1', text: 'Đi xem phim đi, suất 8h', timestamp: '10:28 AM', isMe: false },
      { id: 'm4', senderId: 'u1', text: 'Oke chốt kèo tối nay nhé!', timestamp: '10:30 AM', isMe: false },
    ]
  },
  {
    id: 'chat2',
    partnerId: 'u2',
    lastMessage: 'Cảm ơn cậu nhiều nha ❤️',
    unreadCount: 0,
    updatedAt: 'Hôm qua',
    messages: [
      { id: 'm5', senderId: 'me', text: 'Chúc mừng sinh nhật nhé!', timestamp: 'Yesterday', isMe: true },
      { id: 'm6', senderId: 'u2', text: 'Cảm ơn cậu nhiều nha ❤️', timestamp: 'Yesterday', isMe: false },
    ]
  },
  {
    id: 'chat3',
    partnerId: 'u5',
    lastMessage: 'Gửi ảnh hôm qua đi ông ơi',
    unreadCount: 0,
    updatedAt: '2 ngày',
    messages: []
  }
];
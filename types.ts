export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  isOnline?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  location?: string;
}

export interface Story {
  id: string;
  userId: string;
  imageUrl: string;
  hasUnseen: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface ChatSession {
  id: string;
  partnerId: string;
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
  messages: Message[];
}
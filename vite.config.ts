import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // --- CẤU HÌNH PROXY ĐỂ FIX CORS ---
        proxy: {
          '/api': {
            target: 'http://10.2.22.23:1234', // Địa chỉ Backend của bạn
            changeOrigin: true,
            secure: false,
            // Đoạn này sẽ xóa chữ '/api' đi trước khi gửi sang Backend
            // Ví dụ: Client gọi /api/images/post -> Server nhận /images/post
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
        // ----------------------------------
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
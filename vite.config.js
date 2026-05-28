import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // تنظیمات Build برای سرعت بیشتر
  build: {
    chunkSizeWarningLimit: 1600,     // جلوگیری از هشدار حجم چانک
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // جدا کردن لایبرری‌های اصلی
        },
      },
    },
  },

  // تنظیمات سرور (برای لوکال)
  server: {
    port: 5174,
    strictPort: true,
  },

  // برای Vercel بهتره
  preview: {
    port: 5174,
  }
})

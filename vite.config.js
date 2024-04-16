import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/SGA_Club_Tracker/',
  plugins: [vue()],

  define: {
    'process.env.VITE_NOTION_KEY': JSON.stringify('your-notion-api-key'),
    'process.env.VITE_NOTION_DATABASE_ID': JSON.stringify('your-notion-database-id'),
  },
  
})


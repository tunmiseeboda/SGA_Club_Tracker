import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";

dotenv.config();


const notionKey = process.env.VITE_NOTION_KEY;
const notionDatabaseId = process.env.VITE_NOTION_DATABASE_ID;

// https://vitejs.dev/config/
export default defineConfig({
  base: "/SGA_Club_Tracker",
  plugins: [vue()],

  define: {
    "process.env.VITE_NOTION_KEY": JSON.stringify(notionKey),
    "process.env.VITE_NOTION_DATABASE_ID": JSON.stringify(notionDatabaseId),
  },
});



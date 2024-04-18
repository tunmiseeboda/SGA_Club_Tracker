// config.js

// Load environment variables
require('dotenv').config();

// Configuration object
const config = {
  notionKey: process.env.VITE_NOTION_KEY,
  notionDatabaseId: process.env.VITE_NOTION_DATABASE_ID,
  port: process.env.PORT || 3001,
};

module.exports = config;



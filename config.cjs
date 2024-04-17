// config.js

// Load environment variables
require('dotenv').config();

// Configuration object
const config = {
  notionKey: process.env.NOTION_KEY,
  notionDatabaseId: process.env.NOTION_DATABASE_ID,
  port: process.env.PORT || 3001,
};

module.exports = config;


console.log(this.notionKey, this.notionDatabaseId)
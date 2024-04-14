// Backend server setup
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");
app.use(cors());

// Proxy endpoint
app.get("/api/notion", async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  //   try {
  //     // Make a request to the Notion API
  //     const response = await axios.get("https://api.notion.com/v1/pages", {
  //       headers: {
  //         res.setHeader("Access-Control-Allow-Origin", "https://yoursite.com");
  //         Authorization: `TOKEN_KEY`,
  //         "Content-Type": "application/json",

  //       },
  //     });

  //     // Forward the response back to the frontend
  //     res.json(response.data);
  //   } catch (error) {
  //     // Handle errors
  //     console.error("Error:", error.response.data);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// // Backend server setup
// const express = require("express");
// const axios = require("axios");
// const app = express();
// const PORT = process.env.PORT || 3000;

// const cors = require("cors");
// app.use(cors({
//   //origin: http://localhost:5173,
//   methods: ["GET", "POST", "PUT", "DELETE"],
// }));

// // Proxy endpoint
// app.get("/api/notion", async (req, res, next) => {
//   console.log(" i am in /api/notion");
//     try {
//       // Make a request to the Notion API
//       const response = await axios.get("https://api.notion.com/v1/pages", {
//         headers: {
//           Authorization: `secret_i9GWbI3pNPT1P65znDCxhUVXG52golKm1lkjSB462WJ`,
//           "Content-Type": "application/json",
//         },
//       });

//       // Forward the response back to the frontend
//       res.json(response.data);
//     } catch (error) {
//       // Handle errors
//       console.error("Error:", error.response.data);
//       res.status(500).json({ error: "Internal server error" });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json())

app.post('/api-create-database', async (req, res) => {
 
  const { clubName, costCenter, amountSpent, amountApproved, date, notes } = req.body;
  const clubInfo = req.body;
  console.log("clubInfo", clubInfo);
  try {
    // Make a request to the Notion API to create the page
    // Replace 'YOUR_NOTION_API_KEY' with your actual Notion API key
    const response = await axios.post(
      "https://api.notion.com/v1/databases",
      {
        headers: {
          Authorization: "secret_i9GWbI3pNPT1P65znDCxhUVXG52golKm1lkjSB462WJ",
          "Content-Type": "application/json",
          notion_version: "2022-06-28",
        },
        parent: {
          type: "database_id",
          database_id: "daa2e649c8d84146acad051dc483731f",
        },
        properties: {
          "Club Name": { title: [{ text: { content: clubInfo.clubName } }] },
          "Cost Center": {
            rich_text: [{ text: { content: clubInfo.costCenter } }],
          },
          "Amount Spent": { number: parseFloat(clubInfo.amountSpent) },
          "Amount Approved": { number: parseFloat(clubInfo.amountApproved) },
          "Date": { date: { start: clubInfo.date } },
          "Notes": { rich_text: [{ text: { content: clubInfo.notes } }] },
        },
      },
    );

    // Respond with the data received from the Notion API
    res.json(response.data);
  }  catch (error) {
  if (error.response && error.response.data) {
    console.error("Error creating Notion page:", error.response.data);
    res.status(500).json({ error: "Internal server error" });
  } else {
    console.error("Error creating Notion page:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

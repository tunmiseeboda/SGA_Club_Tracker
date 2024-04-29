// This file contains the server-side code for the Notion API integration


// Import the express and axios modules and the config file
const express = require("express");
const axios = require("axios");
const config = require('./config.cjs');

// Create an express application
const app = express();
const PORT = config.port; // Set the port to 3001
const cors = require("cors"); // Import the cors module
const bodyParser = require("body-parser"); // Import the body-parser module


// Use the cors middleware
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all HTTP methods
  })
);

app.use(express.json()); // Use express.json() middleware to parse JSON requests

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json())

// Create a POST route to create a Notion database
app.post('/api-create-database', async (req, res) => {
 
  const { clubName, costCenter, amountSpent, amountApproved, date, notes } = req.body; // Destructure the clubInfo object from the request body
  const clubInfo = req.body; // Get the clubInfo object from the request body

  const amountLeftover = parseFloat(clubInfo.amountApproved) - parseFloat(clubInfo.amountSpent);



  try {
    // Make a request to the Notion API to create the page
    const response = await axios.post( 
      "https://api.notion.com/v1/pages/", 
      {
        "parent": {"database_id": config.notionDatabaseId},
        "properties": {
          "Club Name": {"title": [{"text": {"content": clubInfo.clubName } }] },
          "Cost Center": {"rich_text": [{"text": {"content": clubInfo.costCenter } }],},
          "Amount Spent": {"number": parseFloat(clubInfo.amountSpent) },
          "Amount Approved": {"number": parseFloat(clubInfo.amountApproved) },
          "Amount Leftover": {"number": amountLeftover},
          "Date": {"date": {"start": clubInfo.date } },
          "Notes": {"rich_text": [{"text": {"content": clubInfo.notes } }] },
        },
      },
      {
      headers: {
          Authorization:`Bearer ${config.notionKey}`,
          "Content-Type": "application/json",
          "Notion-Version": "2021-05-13",
        }
      }
    );

    // Respond with the data received from the Notion API
    res.json(response.data);
  }  catch (error) {
    // Handle errors
  if (error.response && error.response.data) {
    console.error("Error creating Notion page:", error.response.data);
    res.status(500).json({ error: "Internal server error" });
  } else {
    console.error("Error creating Notion page:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

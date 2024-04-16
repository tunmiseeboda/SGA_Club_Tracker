// "use strict";

// // Importing axios and Client from 'axios' and '@notionhq/client' packages
// import axios from "axios";
// import { Client } from "@notionhq/client";

// // Defining $ function to emulate querySelector
// const $ = (selector) => document.querySelector(selector);

// // Function to get club information
// async function getClubInfo() {
//   console.log(" i am in getClubInfo");
//   const ClubInfo = {
//     "clubName": $("#Club-Name").value,
//     "costCenter": $("#Cost-Center").value,
//     "amountSpent": $("#Amount-Spent").value,
//     "amountApproved": $("#Amount-Approved").value,
//     "date": $("#Date").value,
//     "notes": $("#Notes").value,
//   };
//   return ClubInfo;
// }

// // Function to clear form entries
// function clearEntries() {
//   $("#Club-Name").value = "";
//   $("#Cost-Center").value = "";
//   $("#Amount-Spent").value = "";
//   $("#Amount-Approved").value = "";
//   $("#Date").value = "";
//   $("#Notes").value = "";
// }

// // Function to create a Notion page
// async function createNotionPage() {
//   console.log(" i am in createNotionPage");
//   try {
//     const notion = new Client({ auth: import.meta.env.VITE_NOTION_KEY });
//     const ClubInfo = await getClubInfo();

//     const response = await notion.pages.create({
//       parent: {
//         database_id: import.meta.env.VITE_NOTION_DATABASE_ID,
//       },
//       properties: {
//         "Club Name": [
//           {
//             text: {
//               content: "shoe",
//              // content: ClubInfo.clubName,
//             },
//           },
//         ],
//         cost_center: [
//           {
//             rich_text: {
//               content: ClubInfo.costCenter,
//             },
//           },
//         ],
//         amount_spent: [
//           {
//             number: ClubInfo.amountSpent,
//           },
//         ],
//         amount_approved: [
//           {
//             number: ClubInfo.amountApproved,
//           },
//         ],
//         date: [
//           {
//             date: {
//               start: ClubInfo.date,
//             },
//           },
//         ],
//         notes: [
//           {
//             rich_text: {
//               content: ClubInfo.notes,
//             },
//           },
//         ],
//       },
//     });
//     console.log(response);
//   } catch (error) {
//     console.error('Error creating club in Notion:', error)
//   }
// }

// // Event listeners for submit and clear buttons
// const submitButton = document.querySelector('button[type="submit"]');
// const clearButton = document.querySelector('button[type="reset"]');
// submitButton.addEventListener("click", async () => {
//   await createNotionPage();
// });
// clearButton.addEventListener("click", () => {
//   clearEntries();
// });

const $ = (selector) => document.querySelector(selector);

async function createNotionPage() {
  console.log(" i am in createNotionPage");
  const clubInfo = {
    clubName: $("#Club-Name").value,
    costCenter: $("#Cost-Center").value,
    amountSpent: $("#Amount-Spent").value,
    amountApproved: $("#Amount-Approved").value,
    date: $("#Date").value,
    notes: $("#Notes").value,

  };
  //  console.log("clubInfo", clubInfo);
  //  console.log(JSON.stringify(clubInfo))


  try {
    const response = await fetch('http://localhost:3001/api-create-database', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clubName: clubInfo.clubName,
        costCenter: clubInfo.costCenter,
        amountSpent: clubInfo.amountSpent,
        amountApproved: clubInfo.amountApproved,
        date: clubInfo.date,
        notes: clubInfo.notes,
      }),
    });
    console.log("response", response);
   
    if (!response.ok) {
      throw new Error("Failed to create Notion page");
    }

    const data = await response.json();
    console.log("Notion page created:", data);
  } catch (error) {
    console.error("Error creating Notion page:", error);
  }
}

// Function to clear form entries
function clearEntries() {
  $("#Club-Name").value = "";
  $("#Cost-Center").value = "";
  $("#Amount-Spent").value = "";
  $("#Amount-Approved").value = "";
  $("#Date").value = "";
  $("#Notes").value = "";
}

const submitButton = document.querySelector('button[type="submit"]');
const clearButton = document.querySelector('button[type="reset"]');
submitButton.addEventListener("click", async () => {
  console.log(" i am in submitButton");
  await createNotionPage();
});
clearButton.addEventListener("click", () => {
  clearEntries();
});
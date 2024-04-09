"use strict";
const $ = (selector) => document.querySelector(selector);

import axios from "axios";
import { Client } from "@notionhq/client";

(async () => {
  const notion = new Client({ auth: import.meta.env.VITE_NOTION_KEY });

  const ClubInfo = [];

  async function getClubInfo() {
    const clubData = {
      "clubName": $("#Club-Name").value,
      "costCenter": $("#Cost-Center").value,
      "amountSpent": $("#Amount-Spent").value,
      "amountApproved": $("#Amount-Approved").value,
      "date": $("#Date").value,
      "notes": $("#Notes").value,
    };
    ClubInfo.push(clubData);
    console.log(ClubInfo);

	await createNotionPage();
  }

  const submitButton = document.querySelector('button[type="submit"]');
  const clearButton = document.querySelector('button[type="reset"]');
  submitButton.addEventListener("click", async () => {
    await getClubInfo();
  });
  clearButton.addEventListener("click", () => {
	clearEntries()
  })
  function clearEntries() {
    $("#Club-Name").value = "";
    $("#Cost-Center").value = "";
    $("#Amount-Spent").value = "";
    $("#Amount-Approved").value = "";
    $("#Date").value = "";
    $("#Notes").value = "";
  }

  // create notion page 
  async function createNotionPage() {
	for (let club of ClubInfo) {
	const response = await notion.pages.create({
	  "parent": {
		"type": "database_id",
		"database_id": import.meta.env.VITE_NOTION_DATABASE_ID,
	  },
	  "properties": {
		"Club Name": {
		  "title": [
			{
			"type" : "text",
			  "text": {
				"content": club.clubName,
			  },
			},
		  ],
		},
		"Cost Center": {
		  "rich_text": [
			{
			"type": "text",
			  "text": {
				"content": club.costCenter,
			  },
			},
		  ],
		},
		"Amount Spent": {
		  "number": club.amountSpent,
		},
		"Amount Approved": {
		  "number": club.amountApproved,
		},
		"Date": {
		  "date": {
			"start": club.date,
		  },
		},
		"Notes": {
		  "rich_text": [
			{
			"type": "text",
			  "text": {
				"content": club.notes,
			  },
			},
		  ],
		},
	  },
	});
	console.log(response);

	}
  }
  
})();

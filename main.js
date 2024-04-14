"use strict";
const $ = (selector) => document.querySelector(selector);

import axios from "axios";
import { Client } from "@notionhq/client";
// import cors from "cors";


//  app.use(cors())

(async () => {
  const notion = new Client({ auth: import.meta.env.VITE_NOTION_KEY });

  const ClubInfo = [];

  async function getClubInfo() {
    
    console.log("I am in club info")
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

    createNotionPage();
  }

  const submitButton = document.querySelector('button[type="submit"]');
  const clearButton = document.querySelector('button[type="reset"]');
  submitButton.addEventListener("click", async () => {
	getClubInfo();
  });
    clearButton.addEventListener("click", () => {
      clearEntries();
    });
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
      try {
         for (let club of ClubInfo) {
      }
    }
  } // Add this closing curly brace

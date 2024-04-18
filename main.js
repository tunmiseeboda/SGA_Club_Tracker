const $ = (selector) => document.querySelector(selector);


// Function to create a Notion page
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

// try and catch block to handle errors, and post the data to the server
  try {

    // Make a request to the server to create the Notion page
    const response = await fetch('http://localhost:3001/api-create-database/', {
      method: "POST", // Use the POST method
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },

      // Convert the clubInfo object to a JSON string
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


   // Throw an error if the response is not OK
    if (!response.ok) {
      throw new Error("Failed to create Notion page");
    }

    // Log the data received from the server
    const data = await response.json();
    console.log("Notion page created:", data); // Log the data received from the server

    // catch block to handle errors
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


// Event listeners for the submit and clear buttons
const submitButton = document.querySelector('button[type="submit"]');
const clearButton = document.querySelector('button[type="reset"]');
submitButton.addEventListener("click", async () => {
  console.log(" i am in submitButton");
  await createNotionPage();
});
clearButton.addEventListener("click", () => {
  clearEntries();
});
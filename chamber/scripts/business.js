// ======================================================
// business.js
// WDD 231 - Chamber of Commerce
//
// This script loads all chamber business members from
// the JSON data source and displays them on the
// Directory page.
//
// Features:
// - Dynamically creates business cards
// - Displays company information
// - Supports grid/list view switching
// ======================================================


// ------------------------------------------------------
// JSON Data Source
// ------------------------------------------------------
const businessURL =
    "https://anuchaj.github.io/wdd231/chamber/data/members.json";


// ------------------------------------------------------
// Retrieve business data
// ------------------------------------------------------
async function getBusinesses() {

    try {

        const response = await fetch(businessURL);

        if (!response.ok) {
            throw new Error("Unable to load business data.");
        }

        const data = await response.json();

        // Access companies array from JSON file
        const businesses = data.companies;


        // Create a card for each business
        businesses.forEach(displayCard);


    } catch (error) {

        console.error("Business Directory Error:", error);

    }

}


// ------------------------------------------------------
// Create Business Card
// ------------------------------------------------------
function displayCard(business) {


    // Create card elements
    const card = document.createElement("section");
    const businessName = document.createElement("p");
    const address = document.createElement("p");
    const phoneNumber = document.createElement("p");
    const website = document.createElement("a");
    const logo = document.createElement("img");


    // Add business information
    businessName.textContent = business.name;
    address.textContent = business.address;
    phoneNumber.textContent = business.phone;

    // Create website link
    // Add https:// if the JSON data does not contain it
    let websiteURL = business.website;

    if (!websiteURL.startsWith("http")) {
        websiteURL = `https://${websiteURL}`;
    }

    website.href = websiteURL;
    website.textContent = business.website;
    website.target = "_blank";
    website.rel = "noopener noreferrer";

    // Add image information
    logo.src = business.imageurl;
    logo.alt = `Logo of ${business.name}`;
    logo.loading = "lazy";

    // Add elements to the card
    card.appendChild(logo);
    card.appendChild(businessName);
    card.appendChild(address);
    card.appendChild(phoneNumber);
    card.appendChild(website);


    // Add card to directory container
    document.querySelector("#cards").appendChild(card);

}


// ------------------------------------------------------
// Grid View
// ------------------------------------------------------
function gridView() {

    const cards = document.querySelector("#cards");
    const gridButton = document.querySelector("#grid");

    if (cards && gridButton) {

        cards.classList.remove("open");
        gridButton.classList.add("open");

    }

}


// ------------------------------------------------------
// List View
// ------------------------------------------------------
function listView() {

    const cards = document.querySelector("#cards");
    const listButton = document.querySelector("#list");

    if (cards && listButton) {

        cards.classList.add("open");
        listButton.classList.add("open");

    }

}


// ------------------------------------------------------
// Add event listeners after page loads
// ------------------------------------------------------
function setupViewButtons() {

    const listButton = document.querySelector("#list");
    const gridButton = document.querySelector("#grid");


    if (listButton && gridButton) {

        listButton.addEventListener("click", listView);
        gridButton.addEventListener("click", gridView);

    }

}


// ------------------------------------------------------
// Start Directory Script
// ------------------------------------------------------
getBusinesses();

setupViewButtons();

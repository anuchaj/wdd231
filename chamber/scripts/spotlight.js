// ======================================================
// spotlight.js
// WDD 231 - Chamber of Commerce
//
// This script loads chamber member data from the JSON
// file and randomly displays three Gold or Silver
// members in the Spotlight section.
// ======================================================

// ------------------------------------------------------
// JSON Data Source
// ------------------------------------------------------
const spotlightURL =
    "https://anuchaj.github.io/wdd231/chamber/data/members.json";

// ------------------------------------------------------
// Retrieve member data
// ------------------------------------------------------
async function getSpotlightMembers() {

    try {

        const response = await fetch(spotlightURL);

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const data = await response.json();

        // Access the companies array
        const companies = data.companies;

        displaySpotlights(companies);

    } catch (error) {

        console.error("Spotlight Error:", error);

    }

}

// ------------------------------------------------------
// Select three random Gold/Silver members
// ------------------------------------------------------
function displaySpotlights(companies) {

    // Keep only Gold and Silver members
    const qualifiedMembers = companies.filter(company =>
        company.membership === "Gold" ||
        company.membership === "Silver"
    );

    // Shuffle the array randomly
    qualifiedMembers.sort(() => Math.random() - 0.5);

    // Select the first three members
    const selectedMembers = qualifiedMembers.slice(0, 3);

    // Display each spotlight card
    selectedMembers.forEach(createSpotlightCard);

}

// ------------------------------------------------------
// Create a Spotlight Card
// ------------------------------------------------------
function createSpotlightCard(company) {

    // Locate the spotlight container
    const spotlightContainer = document.querySelector(".spotlight");

    // Create card elements
    const card = document.createElement("section");
    const logo = document.createElement("img");
    const companyName = document.createElement("h3");
    const address = document.createElement("p");
    const phone = document.createElement("p");
    const membership = document.createElement("p");
    const website = document.createElement("a");
    const divider = document.createElement("hr");

    // Add class for CSS styling
    card.classList.add("spots");

    // Company information
    companyName.textContent = company.name;
    address.textContent = company.address;
    phone.textContent = company.phone;
    membership.textContent = `${company.membership} Member`;

    // Website link
    website.href = company.website;
    website.target = "_blank";
    website.rel = "noopener";
    website.textContent = company.website;

    // Company logo
    logo.src = company.imageurl;
    logo.alt = `Logo of ${company.name}`;
    logo.loading = "lazy";

    // Assemble the card
    card.appendChild(logo);
    card.appendChild(companyName);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(membership);
    card.appendChild(website);
    card.appendChild(divider);

    // Display on the page
    spotlightContainer.appendChild(card);

}

// ------------------------------------------------------
// Initialize Spotlight Section
// ------------------------------------------------------
getSpotlightMembers();
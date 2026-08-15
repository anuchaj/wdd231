// EXPRESS HANDS - Business Directory

import { getBusinesses } from "./modules/data.js";

// ELEMENTS
const businessGrid = document.querySelector("#business-grid");
const loadingMessage = document.querySelector("#loading-message");
const errorMessage = document.querySelector("#error-message");
const noResults = document.querySelector("#no-results");
const resultsCount = document.querySelector("#results-count");
const searchInput = document.querySelector("#business-search");
const categoryFilter = document.querySelector("#category-filter");
const locationFilter = document.querySelector("#location-filter");
const ratingFilter = document.querySelector("#rating-filter");
const sortFilter = document.querySelector("#sort-filter");
const resetButton = document.querySelector("#reset-filters");

// PAGINATION
const pagination = document.querySelector("#pagination");
const previousPageButton = document.querySelector("#previous-page");
const nextPageButton = document.querySelector("#next-page");
const paginationNumbers = document.querySelector("#pagination-numbers");

// APPLICATION STATE
let allBusinesses = [];
let currentPage = 1;
const businessesPerPage = 6;

// INITIALIZE
async function initializeDirectory() {
    try {
        showLoading();
        allBusinesses = await getBusinesses();
        populateFilters(allBusinesses);
        applyURLParameters();
        updateDirectory();
        hideLoading();
    } catch (error) {
        console.error("Unable to initialize business directory:", error);
        showError();
    }
}

// LOADING STATE
function showLoading() {
    loadingMessage.hidden = false;
    errorMessage.hidden = true;
    noResults.hidden = true;
    pagination.hidden = true;
    businessGrid.innerHTML = "";
}

function hideLoading() {
    loadingMessage.hidden = true;
}

// ERROR STATE
function showError() {
    loadingMessage.hidden = true;
    errorMessage.hidden = false;
    noResults.hidden = true;
    pagination.hidden = true;
    businessGrid.innerHTML = "";
    resultsCount.textContent = "0";
}

// POPULATE FILTERS
function populateFilters(businesses) {
    const categories = [
        ...new Set(businesses.map((business) => business.category))
    ].sort();

    const locations = [
        ...new Set(businesses.map((business) => business.location))
    ].sort();

    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    locations.forEach((location) => {
        const option = document.createElement("option");
        option.value = location;
        option.textContent = location;
        locationFilter.appendChild(option);
    });
}

// URL PARAMETERS
function applyURLParameters() {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    const location = params.get("location");
    const category = params.get("category");

    if (search) {
        searchInput.value = search;
    }

    if (location) {
        const matchingLocation = [...locationFilter.options].find(
            (option) => option.value.toLowerCase() === location.toLowerCase()
        );

        if (matchingLocation) {
            locationFilter.value = matchingLocation.value;
        }
    }

    if (category) {
        const matchingCategory = [...categoryFilter.options].find(
            (option) => option.value.toLowerCase() === category.toLowerCase()
        );

        if (matchingCategory) {
            categoryFilter.value = matchingCategory.value;
        }
    }
}

// FILTER BUSINESSES
function getFilteredBusinesses() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const location = locationFilter.value;
    const minimumRating = Number(ratingFilter.value);

    return allBusinesses.filter((business) => {
        const searchableText = [
            business.name,
            business.category,
            business.location,
            business.description,
            ...business.services
        ].join(" ").toLowerCase();

        const matchesSearch =
            !searchTerm || searchableText.includes(searchTerm);

        const matchesCategory =
            category === "all" || business.category === category;

        const matchesLocation =
            location === "all" || business.location === location;

        const matchesRating =
            business.rating >= minimumRating;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesLocation &&
            matchesRating
        );
    });
}

// SORT BUSINESSES
function sortBusinesses(businesses) {
    const sortOption = sortFilter.value;
    const sorted = [...businesses];

    if (sortOption === "rating") {
        sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "reviews") {
        sorted.sort((a, b) => b.reviews - a.reviews);
    } else if (sortOption === "name") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sorted;
}

// UPDATE DIRECTORY
function updateDirectory() {
    const filtered = getFilteredBusinesses();
    const sorted = sortBusinesses(filtered);
    const totalPages = Math.ceil(sorted.length / businessesPerPage);

    // Return to the last valid page when filtering reduces the page count.
    if (totalPages > 0 && currentPage > totalPages) {
        currentPage = totalPages;
    }

    if (sorted.length === 0) {
        currentPage = 1;
    }

    renderBusinesses(sorted);
    renderPagination(sorted.length);
}

// RENDER BUSINESSES
function renderBusinesses(businesses) {
    businessGrid.innerHTML = "";
    resultsCount.textContent = businesses.length;

    if (businesses.length === 0) {
        noResults.hidden = false;
        pagination.hidden = true;
        return;
    }

    noResults.hidden = true;

    const startIndex = (currentPage - 1) * businessesPerPage;
    const endIndex = startIndex + businessesPerPage;
    const pageBusinesses = businesses.slice(startIndex, endIndex);

    pageBusinesses.forEach((business) => {
        const card = createBusinessCard(business);
        businessGrid.appendChild(card);
    });
}

// PAGINATION
function renderPagination(totalBusinesses) {
    const totalPages = Math.ceil(totalBusinesses / businessesPerPage);

    paginationNumbers.innerHTML = "";

    if (totalBusinesses === 0 || totalPages <= 1) {
        pagination.hidden = true;
        return;
    }

    pagination.hidden = false;
    previousPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;

    for (let page = 1; page <= totalPages; page++) {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "pagination-number";
        button.textContent = page;
        button.setAttribute("aria-label", `Go to page ${page}`);

        if (page === currentPage) {
            button.classList.add("active");
            button.setAttribute("aria-current", "page");
        }

        button.addEventListener("click", () => {
            currentPage = page;
            updateDirectory();
            scrollToResults();
        });

        paginationNumbers.appendChild(button);
    }
}

// PAGINATION NAVIGATION
previousPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        updateDirectory();
        scrollToResults();
    }
});

nextPageButton.addEventListener("click", () => {
    const filtered = getFilteredBusinesses();
    const totalPages = Math.ceil(filtered.length / businessesPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        updateDirectory();
        scrollToResults();
    }
});

function scrollToResults() {
    const directory = document.querySelector(".directory");

    if (directory) {
        directory.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

// CREATE BUSINESS CARD
function createBusinessCard(business) {
    const article = document.createElement("article");
    article.className = "business-card";

    const imageContainer = document.createElement("div");
    imageContainer.className = "business-card-image";

    const image = document.createElement("img");
    image.src = business.image;
    image.alt = `${business.name} business`;
    image.loading = "lazy";

    const status = document.createElement("span");
    status.className = "business-status";

    if (business.status.toLowerCase() !== "open") {
        status.classList.add("closed");
    }

    status.textContent = business.status;

    imageContainer.appendChild(image);
    imageContainer.appendChild(status);

    const content = document.createElement("div");
    content.className = "business-card-content";

    const category = document.createElement("p");
    category.className = "business-category";
    category.textContent = business.category;

    const title = document.createElement("h2");
    title.textContent = business.name;

    const rating = document.createElement("div");
    rating.className = "business-rating";
    rating.setAttribute(
        "aria-label",
        `${business.rating} out of 5 stars from ${business.reviews} reviews`
    );

    const stars = document.createElement("span");
    stars.className = "rating-stars";
    stars.setAttribute("aria-hidden", "true");
    stars.textContent = getStars(business.rating);

    const ratingValue = document.createElement("span");
    ratingValue.className = "rating-value";
    ratingValue.textContent = business.rating;

    const reviewCount = document.createElement("span");
    reviewCount.className = "review-count";
    reviewCount.textContent = `(${business.reviews} reviews)`;

    rating.appendChild(stars);
    rating.appendChild(ratingValue);
    rating.appendChild(reviewCount);

    const location = document.createElement("p");
    location.className = "business-location";
    location.innerHTML =
        `<span aria-hidden="true">📍</span><span>${business.location}, ${business.state}</span>`;

    const description = document.createElement("p");
    description.className = "business-description";
    description.textContent = business.description;

    const services = document.createElement("div");
    services.className = "business-services";

    business.services.slice(0, 3).forEach((service) => {
        const tag = document.createElement("span");
        tag.className = "service-tag";
        tag.textContent = service;
        services.appendChild(tag);
    });

    const footer = document.createElement("div");
    footer.className = "business-card-footer";

    const hours = document.createElement("span");
    hours.className = "review-count";
    hours.textContent = business.hours;

    const viewLink = document.createElement("a");
    viewLink.className = "view-business";
    viewLink.href =
        `business.html?id=${encodeURIComponent(business.id)}`;
    viewLink.textContent = "View Profile";

    footer.appendChild(hours);
    footer.appendChild(viewLink);

    content.appendChild(category);
    content.appendChild(title);
    content.appendChild(rating);
    content.appendChild(location);
    content.appendChild(description);
    content.appendChild(services);
    content.appendChild(footer);

    article.appendChild(imageContainer);
    article.appendChild(content);

    return article;
}

// STAR DISPLAY
function getStars(rating) {
    const roundedRating = Math.round(rating);

    return (
        "★".repeat(roundedRating) +
        "☆".repeat(5 - roundedRating)
    );
}

// FILTER EVENT LISTENERS
searchInput.addEventListener("input", () => {
    currentPage = 1;
    updateDirectory();
});

categoryFilter.addEventListener("change", () => {
    currentPage = 1;
    updateDirectory();
});

locationFilter.addEventListener("change", () => {
    currentPage = 1;
    updateDirectory();
});

ratingFilter.addEventListener("change", () => {
    currentPage = 1;
    updateDirectory();
});

sortFilter.addEventListener("change", () => {
    currentPage = 1;
    updateDirectory();
});

// RESET FILTERS
resetButton.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "all";
    locationFilter.value = "all";
    ratingFilter.value = "0";
    sortFilter.value = "default";
    currentPage = 1;
    updateDirectory();
});

// START APPLICATION
initializeDirectory();

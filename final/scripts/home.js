/* =================================
   EXPRESS HANDS
   HOME PAGE MODULE
==================================== */

import { getBusinesses } from "./modules/data.js";

const featuredContainer = document.querySelector("#featured-businesses");

/* INITIALIZE FEATURED BUSINESSES */

async function loadFeaturedBusinesses() {
    if (!featuredContainer) {
        return;
    }

    try {
        const businesses = await getBusinesses();

        /*
         * Select the highest-rated businesses.
         * This means the homepage automatically reflects
         * changes made to businesses.json.
         */
        const featuredBusinesses = [...businesses]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3);

        renderFeaturedBusinesses(featuredBusinesses);
    } catch (error) {
        console.error("Unable to load featured businesses:", error);

        featuredContainer.innerHTML = `
            <p class="featured-error">
                Featured businesses could not be loaded.
                Please try again later.
            </p>
        `;
    }
}

/* RENDER FEATURED BUSINESSES */
function renderFeaturedBusinesses(businesses) {
    featuredContainer.innerHTML = "";

    businesses.forEach((business) => {
        const card = document.createElement("article");
        card.className = "business-card";

        /* IMAGE */
        const imageContainer = document.createElement("div");
        imageContainer.className = "business-card-image";

        const image = document.createElement("img");
        image.src = business.image;
        image.alt = `${business.name} business`;
        image.loading = "eager";

        /*
         * Featured businesses are visible immediately
         * on the homepage, so we do not lazy-load them.
         */
        const status = document.createElement("span");
        status.className = "business-status";

        if (business.status.toLowerCase() !== "open") {
            status.classList.add("closed");
        }

        status.textContent = business.status;

        imageContainer.appendChild(image);
        imageContainer.appendChild(status);

        /* CONTENT */
        const content = document.createElement("div");
        content.className = "business-card-content";

        const category = document.createElement("p");
        category.className = "business-category";
        category.textContent = business.category;

        const title = document.createElement("h3");
        title.textContent = business.name;

        /* RATING */
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

        /* LOCATION */
        const location = document.createElement("p");
        location.className = "business-location";

        const locationIcon = document.createElement("span");
        locationIcon.setAttribute("aria-hidden", "true");
        locationIcon.textContent = "📍";

        const locationText = document.createElement("span");
        locationText.textContent = `${business.location}, ${business.state}`;

        location.appendChild(locationIcon);
        location.appendChild(locationText);

        /* DESCRIPTION */
        const description = document.createElement("p");
        description.className = "business-description";
        description.textContent = business.description;

        /* SERVICES */
        const services = document.createElement("div");
        services.className = "business-services";

        business.services.slice(0, 3).forEach((service) => {
            const tag = document.createElement("span");
            tag.className = "service-tag";
            tag.textContent = service;
            services.appendChild(tag);
        });

        /* FOOTER */
        const footer = document.createElement("div");
        footer.className = "business-card-footer";

        const hours = document.createElement("span");
        hours.className = "review-count";
        hours.textContent = business.hours;

        const viewLink = document.createElement("a");
        viewLink.className = "view-business";
        viewLink.href = `business.html?id=${encodeURIComponent(business.id)}`;
        viewLink.textContent = "View Profile";

        footer.appendChild(hours);
        footer.appendChild(viewLink);

        /* BUILD CARD */
        content.appendChild(category);
        content.appendChild(title);
        content.appendChild(rating);
        content.appendChild(location);
        content.appendChild(description);
        content.appendChild(services);
        content.appendChild(footer);

        card.appendChild(imageContainer);
        card.appendChild(content);

        featuredContainer.appendChild(card);
    });
}

/* STAR DISPLAY */
function getStars(rating) {
    const roundedRating = Math.round(rating);

    return "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);
}

/* START */
loadFeaturedBusinesses();

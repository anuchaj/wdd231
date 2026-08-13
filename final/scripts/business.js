/* ==========================================================
   EXPRESS HANDS
   Business Profile
========================================================== */

import { getBusinesses } from "./modules/data.js";


/* ==========================================================
   ELEMENTS
========================================================== */

const loadingMessage = document.querySelector("#loading-message");

const errorMessage = document.querySelector("#error-message");

const businessProfile = document.querySelector("#business-profile");

const businessImage = document.querySelector("#business-image");

const businessName = document.querySelector("#business-name");

const breadcrumbName = document.querySelector("#breadcrumb-name");

const businessCategory =
    document.querySelector("#business-category");

const businessRating = document.querySelector("#business-rating");

const businessLocation =
    document.querySelector("#business-location");

const businessDescription =
    document.querySelector("#business-description");

const businessServices =
    document.querySelector("#business-services");

const businessHours = document.querySelector("#business-hours");

const businessStatus = document.querySelector("#business-status");

const businessPhone = document.querySelector("#business-phone");

const businessEmail = document.querySelector("#business-email");

const sidebarLocation =
    document.querySelector("#sidebar-location");

const saveButton = document.querySelector("#save-button");

const saveButtonText =
    document.querySelector("#save-button-text");

const contactButton =
    document.querySelector("#contact-button");

const contactDialog =
    document.querySelector("#contact-dialog");

const closeDialog =
    document.querySelector("#close-dialog");

const cancelDialog =
    document.querySelector("#cancel-dialog");

const contactForm =
    document.querySelector("#contact-form");

const dialogBusinessName =
    document.querySelector("#dialog-business-name");


/* ==========================================================
   STATE
========================================================== */

let currentBusiness = null;


/* ==========================================================
   GET BUSINESS ID
========================================================== */

function getBusinessId() {

    const params = new URLSearchParams(
        window.location.search
    );

    return params.get("id");
}


/* ==========================================================
   INITIALIZE
========================================================== */

async function initializeProfile() {

    const businessId = getBusinessId();


    if (!businessId) {

        showError();

        return;
    }


    try {

        const businesses = await getBusinesses();


        currentBusiness = businesses.find(
            (business) =>
                business.id === businessId
        );


        if (!currentBusiness) {

            showError();

            return;
        }


        renderBusiness(currentBusiness);

        initializeSaveButton(currentBusiness);

        hideLoading();

    } catch (error) {

        console.error(
            "Unable to load business profile:",
            error
        );

        showError();
    }
}


/* ==========================================================
   RENDER BUSINESS
========================================================== */

function renderBusiness(business) {

    businessProfile.hidden = false;


    /* Page title */

    document.title =
        `${business.name} | Express Hands`;


    /* Image */

    businessImage.src =
        business.image;

    businessImage.alt =
        `${business.name} business`;


    /* Basic information */

    businessName.textContent =
        business.name;

    breadcrumbName.textContent =
        business.name;

    businessCategory.textContent =
        business.category;


    /* Rating */

    businessRating.innerHTML = `
        <span
            class="rating-stars"
            aria-hidden="true"
        >
            ${getStars(business.rating)}
        </span>

        <span class="rating-value">
            ${business.rating}
        </span>

        <span class="review-count">
            (${business.reviews} reviews)
        </span>
    `;

    businessRating.setAttribute(
        "aria-label",
        `${business.rating} out of 5 stars from ${business.reviews} reviews`
    );


    /* Location */

    const fullLocation =
        `${business.location}, ${business.state}`;

    businessLocation.textContent =
        `📍 ${fullLocation}`;

    sidebarLocation.textContent =
        fullLocation;


    /* Description */

    businessDescription.textContent =
        business.description;


    /* Services */

    businessServices.innerHTML = "";

    business.services.forEach(
        (service) => {

            const listItem =
                document.createElement("li");

            listItem.textContent =
                service;

            businessServices.appendChild(
                listItem
            );
        }
    );


    /* Hours */

    businessHours.textContent =
        business.hours;

    businessStatus.textContent =
        business.status;


    if (
        business.status.toLowerCase() !==
        "open"
    ) {

        businessStatus.classList.add(
            "closed"
        );
    }


    /* Phone */

    businessPhone.textContent =
        business.phone;

    businessPhone.href =
        `tel:${cleanPhoneNumber(
            business.phone
        )}`;


    /* Email */

    businessEmail.textContent =
        business.email;

    businessEmail.href =
        `mailto:${business.email}`;


    /* Dialog */

    dialogBusinessName.textContent =
        business.name;
}


/* ==========================================================
   STAR DISPLAY
========================================================== */

function getStars(rating) {

    const roundedRating =
        Math.round(rating);

    return (
        "★".repeat(roundedRating) +
        "☆".repeat(5 - roundedRating)
    );
}


/* ==========================================================
   PHONE CLEANUP
========================================================== */

function cleanPhoneNumber(phone) {

    return phone.replace(
        /[^\d+]/g,
        ""
    );
}


/* ==========================================================
   SAVE BUSINESS
========================================================== */

function getSavedBusinesses() {

    try {

        const saved =
            localStorage.getItem(
                "expressHandsSavedBusinesses"
            );

        return saved
            ? JSON.parse(saved)
            : [];

    } catch (error) {

        console.error(
            "Unable to read saved businesses:",
            error
        );

        return [];
    }
}


function saveBusinesses(businesses) {

    try {

        localStorage.setItem(
            "expressHandsSavedBusinesses",
            JSON.stringify(businesses)
        );

    } catch (error) {

        console.error(
            "Unable to save business:",
            error
        );
    }
}


function initializeSaveButton(business) {

    updateSaveButton(
        getSavedBusinesses().includes(
            business.id
        )
    );
}


function toggleSavedBusiness() {

    if (!currentBusiness) {
        return;
    }


    const savedBusinesses =
        getSavedBusinesses();


    const existingIndex =
        savedBusinesses.indexOf(
            currentBusiness.id
        );


    if (existingIndex === -1) {

        savedBusinesses.push(
            currentBusiness.id
        );

        saveBusinesses(
            savedBusinesses
        );

        updateSaveButton(true);

    } else {

        savedBusinesses.splice(
            existingIndex,
            1
        );

        saveBusinesses(
            savedBusinesses
        );

        updateSaveButton(false);
    }
}


function updateSaveButton(isSaved) {

    saveButton.setAttribute(
        "aria-pressed",
        String(isSaved)
    );


    if (isSaved) {

        saveButtonText.textContent =
            "Saved";

        saveButton.querySelector(
            "span:first-child"
        ).textContent = "♥";

    } else {

        saveButtonText.textContent =
            "Save Business";

        saveButton.querySelector(
            "span:first-child"
        ).textContent = "♡";
    }
}


/* ==========================================================
   CONTACT DIALOG
========================================================== */

function openContactDialog() {

    if (
        typeof contactDialog.showModal ===
        "function"
    ) {

        contactDialog.showModal();

    } else {

        contactDialog.setAttribute(
            "open",
            ""
        );
    }
}


function closeContactDialog() {

    if (
        typeof contactDialog.close ===
        "function"
    ) {

        contactDialog.close();

    } else {

        contactDialog.removeAttribute(
            "open"
        );
    }
}


/* ==========================================================
   CONTACT FORM
========================================================== */

function handleContactSubmit(event) {

    event.preventDefault();


    const formData =
        new FormData(
            contactForm
        );


    const name =
        formData.get("name");


    /*
       This project is frontend-only.

       I'm not actually sending email or
       storing messages on a server yet.

       I only demonstrate successful form
       interaction for the course project.
    */

    closeContactDialog();

    contactForm.reset();


    alert(
        `Thank you, ${name}. Your message has been prepared for ${currentBusiness.name}.`
    );
}


/* ==========================================================
   EVENT LISTENERS
========================================================== */

saveButton.addEventListener(
    "click",
    toggleSavedBusiness
);


contactButton.addEventListener(
    "click",
    openContactDialog
);


closeDialog.addEventListener(
    "click",
    closeContactDialog
);


cancelDialog.addEventListener(
    "click",
    closeContactDialog
);


contactForm.addEventListener(
    "submit",
    handleContactSubmit
);


/* ==========================================================
   CLOSE DIALOG WHEN CLICKING OUTSIDE
========================================================== */

contactDialog.addEventListener(
    "click",
    (event) => {

        const rect =
            contactDialog.getBoundingClientRect();


        const clickedInside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;


        if (!clickedInside) {

            closeContactDialog();
        }
    }
);


/* ==========================================================
   INITIALIZE
========================================================== */

function hideLoading() {
    loadingMessage.hidden = true;
}


function showError() {
    loadingMessage.hidden = true;
    errorMessage.hidden = false;
    businessProfile.hidden = true;
}


initializeProfile();

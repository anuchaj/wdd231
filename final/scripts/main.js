/* ==========================================================
   EXPRESS HANDS
   WDD 231 Individual Website Project
   Main JavaScript Module
========================================================== */

/* ==========================================================
   MOBILE NAVIGATION
========================================================== */

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".primary-navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");

        const menuIcon = menuButton.querySelector(".menu-icon");

        if (menuIcon) {
            menuIcon.textContent = isOpen ? "✕" : "☰";
        }
    });

    // Close mobile navigation after selecting a link.
    const navigationLinks = navigation.querySelectorAll("a");

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");

            const menuIcon = menuButton.querySelector(".menu-icon");

            if (menuIcon) {
                menuIcon.textContent = "☰";
            }
        });
    });
}

/* ==========================================================
   CURRENT YEAR
========================================================== */

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* ==========================================================
   HERO SEARCH
========================================================== */

const heroSearch = document.querySelector("#hero-search");

if (heroSearch) {
    heroSearch.addEventListener("submit", (event) => {
        event.preventDefault();

        const service = document.querySelector("#service-search")?.value.trim();
        const location = document.querySelector("#location-search")?.value.trim();

        /*
         * The real search functionality will be implemented
         * with the Business Directory and JSON data in a
         * later development phase.
         *
         * For now, redirect to the Businesses page with
         * search parameters when values are provided.
         */

        const params = new URLSearchParams();

        if (service) {
            params.set("search", service);
        }

        if (location) {
            params.set("location", location);
        }

        const queryString = params.toString();

        if (queryString) {
            window.location.href = `businesses.html?${queryString}`;
        } else {
            window.location.href = "businesses.html";
        }
    });
}

/* ==========================================================
   NOTIFICATION BUTTON
========================================================== */

const notificationButton = document.querySelector(".notification-button");

if (notificationButton) {
    notificationButton.addEventListener("click", () => {
        /*
         * Notifications will be implemented in a later phase.
         * For now, provide simple feedback to the user.
         */
        alert("Notifications will be available in a future version of Express Hands.");
    });
}

/* ==========================================================
   PHASE 4
   CONTACT FORM
========================================================== */

const contactForm = document.querySelector("#contact-form");
const contactSuccess = document.querySelector("#contact-success");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const formData = new FormData(contactForm);

        const contactSubmission = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
            submittedAt: new Date().toISOString()
        };

        /*
           Store the submission locally.

           This is only a frontend demonstration.
           No real email is being sent.
        */

        const existingMessages = JSON.parse(
            localStorage.getItem("expressHandsContactMessages")
        ) || [];

        existingMessages.push(contactSubmission);

        localStorage.setItem(
            "expressHandsContactMessages",
            JSON.stringify(existingMessages)
        );

        contactForm.reset();
        contactSuccess.hidden = false;

        setTimeout(() => {
            contactSuccess.hidden = true;
        }, 5000);
    });
}


/* ==========================================================
   LIST YOUR BUSINESS FORM
========================================================== */

const businessForm = document.querySelector("#business-form");

if (businessForm) {
    businessForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!businessForm.checkValidity()) {
            businessForm.reportValidity();
            return;
        }

        const formData = new FormData(businessForm);

        const businessSubmission = {
            owner: formData.get("owner"),
            email: formData.get("email"),
            businessName: formData.get("businessName"),
            category: formData.get("category"),
            location: formData.get("location"),
            description: formData.get("description"),
            submittedAt: new Date().toISOString()
        };

        /*
         * Save the submitted business information
         * in localStorage for this frontend project.
         */
        const existingListings = JSON.parse(
            localStorage.getItem(
                "expressHandsBusinessSubmissions"
            )
        ) || [];

        existingListings.push(businessSubmission);

        localStorage.setItem(
            "expressHandsBusinessSubmissions",
            JSON.stringify(existingListings)
        );

        /*
         * Build the form-action URL.
         * URLSearchParams safely encodes the submitted
         * form values for the demonstration page.
         */
        const params = new URLSearchParams({
            owner: businessSubmission.owner,
            email: businessSubmission.email,
            businessName: businessSubmission.businessName,
            category: businessSubmission.category,
            location: businessSubmission.location,
            description: businessSubmission.description
        });

        window.location.href =
            `form-action.html?${params.toString()}`;
    });
}

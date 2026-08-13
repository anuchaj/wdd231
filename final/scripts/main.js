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

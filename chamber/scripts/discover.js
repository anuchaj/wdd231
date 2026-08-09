import { discoverItems } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discoverGrid");

function createCard(item, index) {
    const card = document.createElement("article");
    card.className = "discover-card";
    card.dataset.area = `card${index + 1}`;

    const title = document.createElement("h2");
    title.textContent = item.title;

    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = "images/300x200.webp";
    image.dataset.src = item.image;
    image.alt = item.alt;
    image.width = 300;
    image.height = 200;
    image.loading = "lazy";
    figure.appendChild(image);

    const description = document.createElement("p");
    description.textContent = item.description;

    const address = document.createElement("address");
    address.textContent = item.address;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "learn-more";
    button.textContent = "Learn More";
    button.dataset.query = item.mapQuery;
    button.setAttribute("aria-label", `Learn more about ${item.title}`);

    button.addEventListener("click", () => {
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapQuery)}`;
        window.open(mapUrl, "_blank", "noopener,noreferrer");
    });

    card.append(title, figure, description, address, button);
    return card;
}

function displayDiscoverItems() {
    if (!discoverGrid) return;

    discoverItems.forEach((item, index) => {
        discoverGrid.appendChild(createCard(item, index));
    });

    if (typeof window.initLazyLoading === "function") {
        window.initLazyLoading();
    }
}

displayDiscoverItems();

// Hidden timestamp

const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}

// Membership card animation

window.addEventListener("load", () => {
    const cards = document.querySelectorAll(".membership-card");

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("show");
        }, index * 200);
    });
});

// Dialogs

const modalButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close-modal");

modalButtons.forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();

        const dialog = document.querySelector(button.dataset.modal);

        if (dialog) {
            dialog.showModal();
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});

// Close dialog when clicking outside

document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", event => {
        const rect = dialog.getBoundingClientRect();

        const inside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!inside) {
            dialog.close();
        }
    });
});
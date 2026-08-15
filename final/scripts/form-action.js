// EXPRESS HANDS - FORM ACTION PAGE

const submissionDetails = document.querySelector("#submission-details");
const params = new URLSearchParams(window.location.search);

// FORM DATA
const owner = params.get("owner");
const email = params.get("email");
const businessName = params.get("businessName");
const category = params.get("category");
const location = params.get("location");
const description = params.get("description");

// DISPLAY SUBMISSION
if (
    owner &&
    email &&
    businessName &&
    category &&
    location &&
    description
) {
    const details = [
        ["Business Owner", owner],
        ["Email Address", email],
        ["Business Name", businessName],
        ["Business Category", category],
        ["Business Location", location],
        ["Business Description", description]
    ];

    details.forEach(([label, value]) => {
        const item = document.createElement("div");
        item.className = "submission-item";

        const heading = document.createElement("h2");
        heading.textContent = label;

        const content = document.createElement("p");
        content.textContent = value;

        item.appendChild(heading);
        item.appendChild(content);
        submissionDetails.appendChild(item);
    });
} else {
    const message = document.createElement("p");
    message.className = "submission-empty";
    message.textContent =
        "No submission information was found. Please return to the List Your Business page and submit the form.";

    submissionDetails.appendChild(message);
}

const lastVisit = Number(localStorage.getItem("last-visit-date"));
const currentVisit = Date.now();
const lastVisitMessage = document.querySelector("#lastvisit");
const millisecondsPerDay = 86400000;

if (lastVisitMessage) {
    if (!lastVisit) {
        lastVisitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const elapsedMilliseconds = currentVisit - lastVisit;
        const elapsedDays = elapsedMilliseconds / millisecondsPerDay;

        if (elapsedDays < 1) {
            lastVisitMessage.textContent = "Back so soon! Awesome!";
        } else {
            const wholeDays = Math.floor(elapsedDays);
            const dayText = wholeDays === 1 ? "day" : "days";
            lastVisitMessage.textContent = `You last visited ${wholeDays} ${dayText} ago.`;
        }
    }
}

localStorage.setItem("last-visit-date", currentVisit);

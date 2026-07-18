// Author: Joseph Anucha

const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"][new Date().getMonth()];

let notification = "🤝🏼 Come join us for the chamber meet and greet Wednesday at 7:00 p.m.";

if (day == "Monday" || day == "Tuesday") { //Determines whether to post the notification or not.
  document.getElementById("banner_msg").textContent = notification;
} else {
  document.getElementById("banner_msg").style.display = "none";
}

// Display today's date on the white horizontal bar.
const now = new Date();
const datefieldUK = document.querySelector(".date"); 
const fulldateUK = new Intl.DateTimeFormat("en-UK", {
	dateStyle: "full"
}).format(now);
datefieldUK.innerHTML = `<em>${fulldateUK}</em>`;

// Function to toggle the menu bar on smaller viewport
function toggleMenu(){
    document.querySelector('#primaryNav').classList.toggle('open');
    document.querySelector('#hamburgerBtn').classList.toggle('open');
}
const hamButton =document.querySelector('#hamburgerBtn');
hamButton.onclick = toggleMenu;

// Record the time for the last modification
const date =  new Date().getFullYear();
let lastMod = new Date(document.lastModified);
var removeTZ = lastMod.toLocaleString();

const newParagraph = document.createElement("p");
newParagraph.innerText =`Last Modification: ${removeTZ}`;

document.querySelector('#timemod').appendChild(newParagraph);



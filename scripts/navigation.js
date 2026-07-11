//Store the selected elements that we are going to use.
const navButton = document.querySelector('#ham-btn');

//Toggle the class off and on
navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show'); 
});

//Nav links
const navBar = document.querySelector('#nav-bar');


const daysUntil = "There are " + daycount + " days until " + targetEvent + "!";


const daysUntil = `There are ${daycount} days until ${targetEvent}!`;
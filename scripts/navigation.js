
//Store the selected elements that we are going to use.
const hamButton = document.querySelector("#ham-btn");
const navigation = document.querySelector("#nav-bar");

//Toggle the class off and on
hamButton.addEventListener("click", () => {

    navigation.classList.toggle("show");
    hamButton.classList.toggle("show");

});
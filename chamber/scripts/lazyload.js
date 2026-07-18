// Joseph Anucha
// Progressive Loading
// Using Intersect Observer

// Get all images with data-src attribute.
let imagesToLoad = document.querySelectorAll("img[data-src]");

// Optional parameters being set for Intersect Observer
const imgOptions = {
    threshold: 1, //determines the speed at which intersection is done; 0 is faster.
    rootMargin: "0px 0px 100px 0px"
};
// function to move the path from data-src to src
const loadImages = (image) => {
  image.setAttribute("src", image.getAttribute("data-src"));
  image.onload = () => {image.removeAttribute("data-src");};
};

// Check to see if Intersect Oberser is supported
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  }, imgOptions); 
  // Loop through each img and check status and load if necessary
  imagesToLoad.forEach((img) => {
    observer.observe(img);
  });
} else { // Just load all images if not supported
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
}


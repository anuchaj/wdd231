// Joseph Anucha
// Progressive Loading
// Using Intersection Observer

const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 100px 0px"
};

const loadImages = (image) => {
    const imageSource = image.getAttribute("data-src");

    if (!imageSource) return;

    image.setAttribute("src", imageSource);

    image.addEventListener("load", () => {
        image.removeAttribute("data-src");
    }, { once: true });
};

const initLazyLoading = () => {
    const imagesToLoad = document.querySelectorAll("img[data-src]");

    if (!("IntersectionObserver" in window)) {
        imagesToLoad.forEach(loadImages);
        return;
    }

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                loadImages(entry.target);
                observerInstance.unobserve(entry.target);
            }
        });
    }, imgOptions);

    imagesToLoad.forEach((image) => {
        observer.observe(image);
    });
};

window.initLazyLoading = initLazyLoading;

initLazyLoading();

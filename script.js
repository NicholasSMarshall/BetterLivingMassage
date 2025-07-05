let sliderControls;


function buttonChecker() {
    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "index.html" || currentPage === "") {
        const homeButton = document.getElementById("home-button");
        if (homeButton) {
            homeButton.setAttribute("class", "active-header-button");
        }
    } else if (currentPage === "services.html") {
        const servicesButton = document.getElementById("services-button");
        if (servicesButton) {
            servicesButton.setAttribute("class", "active-header-button");
        }
    } else {
        const reviewsButton = document.getElementById("reviews-button");
        if (reviewsButton) {
            reviewsButton.setAttribute("class", "active-header-button");
        }
        sliderControls = activeReviews();

        const nextReviewButton = document.getElementById('next-review-button');
        const prevReviewButton = document.getElementById('prev-review-button');

        if (nextReviewButton) {
            nextReviewButton.addEventListener('click', function() { sliderControls.nextSlide(); });
        }
        if (prevReviewButton) {
            prevReviewButton.addEventListener('click', function() { sliderControls.prevSlide(); });
        }
    }
    const contactButton = document.getElementById('contact-button');
    const closePopupButton = document.getElementById('close-popup-button');

    if (contactButton) {
        contactButton.addEventListener('click', activatePopup);
    }
    if (closePopupButton) {
        closePopupButton.addEventListener('click', deactivatePopup);
    }
    faqQuestions();
}


function activeReviews() {
    let globalIndex = 0;
    const slider = document.getElementById('slider');
    const totalSlides = slider ? slider.children.length: 0;

    let intervalId;
    function updateSlidePosition() {
        if (slider) {
            slider.style.transform = `translateX(-${globalIndex * 100}%)`;
        } else {
            console.error("Slider element not found!");
        }
    }

    function startAutoSlide() {
        clearInterval(intervalId);
        intervalId = setInterval(function() {
            nextSlide(true);
        }, 10000);
    }

    function nextSlide(isAuto = false) {
        globalIndex = (globalIndex + 1) % totalSlides;
        updateSlidePosition();
        startAutoSlide();
    }

    function prevSlide() {
        globalIndex = (globalIndex - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
        startAutoSlide();
    }

    function getCurrentIndex() {
        return globalIndex;
    }

    startAutoSlide();

    return { nextSlide, prevSlide, getCurrentIndex };
}

function faqQuestions(){
    const q = document.querySelectorAll('.question');
    const a = document.querySelectorAll('.answer');
    const arr = document.querySelectorAll('.arrow')

    for(let i = 0; i<q.length; i++){
        q[i].addEventListener('click', () => {
            a[i].classList.toggle('answer-opened');
            arr[i].classList.toggle('arrow-rotated');
        });
    }
}

window.addEventListener('DOMContentLoaded', buttonChecker);

function activatePopup(){
    document.getElementById("contact-popup").setAttribute("class", "contact-popup-background")
}

function deactivatePopup(){
    document.getElementById("contact-popup").setAttribute("class", "blank")
}
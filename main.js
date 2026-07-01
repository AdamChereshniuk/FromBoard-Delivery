// Переменные
const docsMoreList = document.querySelector(".docs__more-list");
const docsBtn = document.querySelector(".docs__btn");
const reviewsSliderList = document.querySelector(".reviews-slider__list");
const reviewsSliderItemsCount = document.querySelectorAll(".reviews-slider__item").length;
const reviewsSliderPrevBtn = document.querySelector(".reviews-slider__prev-btn");
const reviewsSliderNextBtn = document.querySelector(".reviews-slider__next-btn");
let currentSlides = [1, 2];

// Стили
docsMoreList.classList.add("none");

// Логика
docsBtn.addEventListener("click", () => {
    if(docsMoreList.classList.contains("none")) {
        docsMoreList.classList.remove("none");
        docsBtn.innerHTML = "Показать меньше документов";
    } else {
        docsMoreList.classList.add("none");
        docsBtn.innerHTML = "Показать больше документов";
    };
});

[...reviewsSliderList.children].forEach(item => currentSlides.includes(Number(item.getAttribute("id"))) ? item.classList.remove("none") : item.classList.add("none"));

function changeSlides(direction = "prev") {
    switch (direction) {
        case "prev":
            if(currentSlides[0] === 1) {
                currentSlides = [reviewsSliderItemsCount - 1, reviewsSliderItemsCount];
            } else {
                currentSlides = [currentSlides[0] - 2, currentSlides[1] - 2];
            };
            break;
        case "next":
            if(currentSlides[1] === reviewsSliderItemsCount) {
                currentSlides = [1, 2];
            } else {
                currentSlides = [currentSlides[0] + 2, currentSlides[1] + 2];
            };
            break;
    };

    [...reviewsSliderList.children].forEach(item => currentSlides.includes(Number(item.getAttribute("id"))) ? item.classList.remove("none") : item.classList.add("none"));
};

reviewsSliderPrevBtn.addEventListener("click", () => changeSlides("prev"));
reviewsSliderNextBtn.addEventListener("click", () => changeSlides("next"));
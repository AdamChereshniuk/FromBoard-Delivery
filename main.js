const docsMoreList = document.querySelector(".docs__more-list");
const docsBtn = document.querySelector(".docs__btn");
const reviewsSliderList = document.querySelector(".reviews-slider__list");
const reviewsSliderItemsCount = document.querySelectorAll(".reviews-slider__item").length;
const reviewsSliderPrevBtn = document.querySelector(".reviews-slider__prev-btn");
const reviewsSliderNextBtn = document.querySelector(".reviews-slider__next-btn");

const heroRightForm = document.querySelector(".hero-right__form");
const heroRightError = document.querySelector(".hero-right__error");
const heroRightSuccess = document.querySelector(".hero-right__success");

const questionForm = document.querySelector(".question__form");
const questionError = document.querySelector(".question__error");
const questionSuccess = document.querySelector(".question__success");

let currentSlides = [1, 2];
let correctNumbersArr = ["+", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let correctLettersArr = ["-", "а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я"];

// Docs
docsMoreList.classList.add("none");

docsBtn.addEventListener("click", () => {
    if(docsMoreList.classList.contains("none")) {
        docsMoreList.classList.remove("none");
        docsBtn.innerHTML = "Показать меньше документов";
    } else {
        docsMoreList.classList.add("none");
        docsBtn.innerHTML = "Показать больше документов";
    };
});

// Reviews
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

// Forms
function checkInputValues(inputs) {
    let areAllInputsFilled = true;

    [...inputs].forEach(input => {
        if(input.value.trim() === "") areAllInputsFilled = false;
    });

    return areAllInputsFilled;
};

function checkTextInputs(inputs) {
    let areAllInputsFilledCorrect = true;

    [...inputs].forEach(input => {
        for(const char of input.value.trim().replaceAll(" ", "")) {
            if(!correctLettersArr.includes(String(char.toLowerCase()))) {
                areAllInputsFilledCorrect = false;
                break;
            };
        };
    });

    return areAllInputsFilledCorrect;
};

function checkNumberInputs(inputs) {
    let areAllInputsFilledCorrect = true;

    [...inputs].forEach(input => {
        for(const char of input.value.trim().replaceAll(" ", "")) {
            if(!correctNumbersArr.includes(String(char.toLowerCase()))) {
                areAllInputsFilledCorrect = false;
                break;
            };
        };
    });

    return areAllInputsFilledCorrect;
};

function clearInputs(inputs) {
    [...inputs].forEach(input => input.value = "");
};

// Hero Form
heroRightError.classList.add("none");
heroRightSuccess.classList.add("none");

heroRightForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const heroRightInputs = document.querySelectorAll(".hero-right__input");
    const nameInput = document.querySelector("#name");
    const phoneInput = document.querySelector("#phone");
    const weightInput = document.querySelector("#weight");
    const squareInput = document.querySelector("#square");
    const countryInput = document.querySelector("#country");
    const buyCityInput = document.querySelector("#buy-city");
    const areaInput = document.querySelector("#area");
    const deliveryCityInput = document.querySelector("#delivery-city");
    
    const inputValuesCheck = checkInputValues(heroRightInputs);
    const textInputsCheck = checkTextInputs([nameInput, countryInput, buyCityInput, areaInput, deliveryCityInput]);
    const numberInputsCheck = checkNumberInputs([phoneInput, squareInput, weightInput]);

    if(inputValuesCheck && textInputsCheck && numberInputsCheck) {
        heroRightError.classList.add("none");
        heroRightSuccess.classList.remove("none");
        clearInputs(heroRightInputs);
    } else {
        heroRightSuccess.classList.add("none");
        heroRightError.classList.remove("none");

        if(!inputValuesCheck) heroRightError.innerHTML = "Все поля должны быть заполнены";
        if(!textInputsCheck || !numberInputsCheck) heroRightError.innerHTML = "Введите корректные данные";
    };
});

// Question Form
questionError.classList.add("none");
questionSuccess.classList.add("none");

questionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const questionInputs = document.querySelectorAll(".question__input");
    const questionNameInput = document.querySelector(".question__name-input");
    const questionPhoneInput = document.querySelector(".question__phone-input");
    const questionTopicInput = document.querySelector(".question__topic-input");
    const questionTextarea = document.querySelector(".question__textarea");

    const inputValuesCheck = checkInputValues(questionInputs);
    const textInputsCheck = checkTextInputs([questionNameInput, questionTopicInput, questionTextarea]);
    const numberInputsCheck = checkNumberInputs([questionPhoneInput]);

    if(inputValuesCheck && textInputsCheck && numberInputsCheck) {
        questionError.classList.add("none");
        questionSuccess.classList.remove("none");
        clearInputs(questionInputs);
    } else {
        questionSuccess.classList.add("none");
        questionError.classList.remove("none");

        if(!inputValuesCheck) questionError.innerHTML = "Все поля должны быть заполнены";
        if(!textInputsCheck || !numberInputsCheck) questionError.innerHTML = "Введите корректные данные";
    };
});
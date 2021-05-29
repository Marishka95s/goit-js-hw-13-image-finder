var debounce = require('lodash.debounce');
import fetchPictures from './apiService';
import galleryTpl from './galleryTpl.hbs';

// import pontyfy styles and js
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import {error} from '@pnotify/core/dist/PNotify.js';

import './styles.css';

const resultsContainer = document.querySelector('.js-gallery');
const inputEl = document.querySelector('input');
inputEl.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(){
    let searchQuery = inputEl.value;
    console.log('input changed');
    resultsContainer.innerHTML = '';
    if (inputEl.value !== '' && inputEl.value !== ' ' && inputEl.value !== '.'){
        console.log(searchQuery);
        fetchPictures(searchQuery).then(data => {
            if (data.status === 404) {
                pnotyfyMassage('Nothing was found for your query!');
            }
            console.log(data);
            const resultsMarkup = createSearchItemsMarkup(data);
            resultsContainer.insertAdjacentHTML('beforeend', resultsMarkup);
        });
}}

function createSearchItemsMarkup(data) {
    console.log(data);
    return galleryTpl(data);
}

function pnotyfyMassage(message) {
    error ({
            title: `${message}`,
            delay: 1200,
        });
}


// Додатковий функціонал
// Не дороблено: 3. Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

const galleryContainer = document.querySelector('.js-gallery');
const modalLightbox = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('.lightbox__button');
const lightboxOverlay = modalLightbox.querySelector('.lightbox__overlay');
const necessaryImg = modalLightbox.querySelector('.lightbox__image');

galleryContainer.addEventListener('click', onGalleryContainerClick);
let currentSlide = 0;
// let slides = document.querySelectorAll('.gallery__image');

function onGalleryContainerClick(evt) {
    if (!evt.target.classList.contains('gallery__image')) { return };

    currentSlide = evt.target;

    imgAttributesChanging(currentSlide)
    
    if (!modalLightbox.classList.contains('is-open')) {
        modalLightbox.classList.add('is-open');
    }

    // if (modalLightbox.classList.contains('is-open')) {
    //     window.addEventListener('keydown', onChangingImgKeyPress);
    // };

    closeModalBtn.addEventListener('click', onCloseModal);
    lightboxOverlay.addEventListener('click', onCloseModal)
    window.addEventListener('keydown', onEscKeyPress);   
};

function imgAttributesChanging(currentSlide) {
    necessaryImg.src = currentSlide.dataset.url;
    necessaryImg.alt = currentSlide.alt;
    console.log(currentSlide); 
};

function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = event.code === ESC_KEY_CODE;
    if (isEscKey) { onCloseModal() }   
};

function onCloseModal() {
    modalLightbox.classList.remove('is-open');
    lightboxImageSrcCleaning();
    // window.removeEventListener('keydown', onChangingImgKeyPress);
}

function lightboxImageSrcCleaning() {
    necessaryImg.src = '';
};

// function onChangingImgKeyPress(event) {
//     const PREV_IMG_KEY_CODE = 'ArrowLeft';
//     const NEXT_IMG_KEY_CODE = 'ArrowRight';
//     let isPrevImgKey = event.code === PREV_IMG_KEY_CODE;
//     let isNextImgKey = event.code === NEXT_IMG_KEY_CODE;
//     if (isPrevImgKey) {
//         console.log('Pressed ArrowLeft');
//         showPrevImg();
//     } else if (isNextImgKey) {
//         console.log('Pressed ArrowRight');
//         showNextImg();
//     }
// };

// function showPrevImg() {
//     if (currentSlide.dataset.index > 0) {
//         currentSlide = slides[Number(currentSlide.src) - 1];
//     } else { currentSlide = slides[8];}
//     necessaryImg.src = currentSlide.src;
//     necessaryImg.alt = currentSlide.alt;
//     console.log(currentSlide);
//     console.log(`Текущий слайд № ${currentSlide.src}`);
// };
// function showNextImg() {
//     if (currentSlide.dataset.index < 8) {
//         currentSlide = slides[Number(currentSlide.src) + 1];
//     } else { currentSlide = slides[0];}
//     necessaryImg.src = currentSlide.src;
//     necessaryImg.alt = currentSlide.alt;
//     console.log(currentSlide);
//     console.log(`Текущий слайд № ${currentSlide.src}`);
// };
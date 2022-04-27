// selecting filter menu and filter items
let filterMenu = document.querySelectorAll('.filter-menu li');
let filterContents = document.querySelectorAll('.filter-content');


for (let i = 0; i < filterMenu.length; i++) {
    // filter images
    filterMenu[i].addEventListener('click', () => {
        for (let j = 0; j < filterMenu.length; j++) {
            filterMenu[j].classList.remove('active-menu');
        }

        filterMenu[i].classList.add('active-menu');
        let attrValue = filterMenu[i].getAttribute('data-list');

        for (let k = 0; k < filterContents.length; k++) {
            // delete all active contents 
            filterContents[k].classList.add('deleteContents');
            filterContents[k].classList.remove('activeContents');

            // display filter contents or display all contents (if attr is 'all')
            if (filterContents[k].getAttribute('data-item') === attrValue || attrValue === 'all') {
                filterContents[k].classList.add('activeContents');
                filterContents[k].classList.remove('deleteContents');
            }
        }
    });
}



// selecting lightbox elements
let lightBox = document.querySelector('.lightbox');
let closeBtn = document.querySelector('#close-lightbox');
let imgCategory = document.querySelector('#image-category');
let lightBoxImage = document.querySelector('.image-wrapper img');
let lightBoxShadow = document.querySelector('.lightbox-shadow');
let lightBoxArrow = document.querySelector('.lightbox-arrow');
let controlScrolling = document.querySelector('body');

// left and right arrow button
let leftArrow = document.querySelector('#left-arrow');
let rightArrow = document.querySelector('#right-arrow');

// update lightbox content when click or slide
function updateLightboxContent(index) {
    let getCategory = filterContents[index].getAttribute('data-item');
    let getImg = filterContents[index].querySelector('img').src;

    imgCategory.textContent = getCategory;
    lightBoxImage.src = getImg;
}


for (let i = 0; i < filterContents.length; i++) {
    // lightbox show, slide, close
    filterContents[i].addEventListener('click', () => {


        lightBox.classList.add('show-lightbox');
        lightBoxShadow.classList.add('show-shadow');
        lightBoxArrow.classList.add('show-lightbox-arrow');
        controlScrolling.style.overflow = 'hidden';

        // show lightbox content
        updateLightboxContent(i);

        let slideIndex = i;

        // slide left
        leftArrow.onclick = () => {
            slideIndex--;

            if (slideIndex < 0) {
                slideIndex = filterContents.length - 1;
            }

            updateLightboxContent(slideIndex);
        }


        // slide right
        rightArrow.onclick = () => {
            slideIndex++;

            if (slideIndex >= filterContents.length) {
                slideIndex = 0;
            }

            updateLightboxContent(slideIndex);
        }

        // slide when arrow key down
        document.onkeydown = (event) => {
            if (event.keyCode === 37) {
                slideIndex--;

                if (slideIndex < 0) {
                    slideIndex = filterContents.length - 1;
                }

                updateLightboxContent(slideIndex);
            }

            if (event.keyCode === 39) {
                slideIndex++;

                if (slideIndex >= filterContents.length) {
                    slideIndex = 0;
                }

                updateLightboxContent(slideIndex);
            }
        }

        // close lightbox
        closeBtn.onclick = () => {
            lightBox.classList.remove('show-lightbox');
            lightBoxShadow.classList.remove('show-shadow');
            lightBoxArrow.classList.remove('show-lightbox-arrow');
            controlScrolling.style.overflow = 'auto';
        }
    });
}
import { GetingPhotos } from './get-photos';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchFormEl: document.querySelector('#search-form'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreWrapper: document.querySelector('.load-more-wrapper'),
    loadMore: document.querySelector('.load-more'),   
}
const getingPhotos = new GetingPhotos();

refs.searchFormEl.addEventListener('submit', onSubmit);
refs.galleryEl.addEventListener('click', onImgClick);
refs.loadMore.addEventListener('click', onLoadMore);

function onSubmit(e) { 
    e.preventDefault();
    clearGallery();
    refs.loadMoreWrapper.classList.add('is-hidden');

    getingPhotos.query = e.target.searchQuery.value;  
    getingPhotos.resetPage();
    getingPhotos.getPhotos()
        .then(photos => {
            if (!photos) { 
                Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                return;
            };
            // console.log(photos);
            makeGalleryMarkup(photos);
            getingPhotos.increasePage();
            refs.loadMoreWrapper.classList.remove('is-hidden');
        })
        .catch(error => {
            console.log("I'm here", error);
            Notify.failure(error);
            refs.loadMoreWrapper.classList.add('is-hidden');
        });  
}

function makeGalleryMarkup(photos) {  
    refs.galleryEl.insertAdjacentHTML('beforeend', photos.map(el => { 
        const { webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads } = el;

        const cardEl = `<a class="photo-card" href="${largeImageURL}">
                        <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy"/>
                        
                        <div class="info">
                            <p class="info-item">
                                <b>Likes</b>
                                ${likes}
                            </p>
                            <p class="info-item">
                                <b>Views</b>
                                ${views}
                            </p>
                            <p class="info-item">
                                <b>Comments</b>
                                ${comments}
                            </p>
                            <p class="info-item">
                                <b>Downloads</b>
                                ${downloads}
                            </p>
                        </div>
                    </a>`;
        return cardEl;
    }).join(''));
}

function onImgClick(e) {
    e.preventDefault();

    if (e.target.nodeName !== 'IMG') {
        return;
    };

    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.open(e);
}

function onLoadMore(e) {
    getingPhotos.getPhotos()
        .then((photos) => {  
            makeGalleryMarkup(photos);
            getingPhotos.increasePage();
        })
        .catch(error => {
            console.log("I'm here", error);
            Notify.failure(error);
            refs.loadMoreWrapper.classList.add('is-hidden');
        }); 
    // console.log(getingPhotos.viewedPhotos);
}

function clearGallery() { 
    refs.galleryEl.innerHTML = '';
}
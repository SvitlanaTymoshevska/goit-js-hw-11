import { getPhotos } from './get-photos';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
galleryEl.addEventListener('click', onPreviewImgClick);

const modal = new SimpleLightbox(
                                    '.gallery a',
                                    {
                                        captionDelay: 250,
                                    }
                                );

searchFormEl.addEventListener('submit', onSubmit);

function onSubmit(e) { 
    e.preventDefault();
    const query = e.target.searchQuery.value;
   
    getPhotos(query)
        .then((response) => {
            const photos = response.data.hits;
            if (photos.length === 0) { 
                Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                return;
            };
            galleryEl.insertAdjacentHTML('beforeend', photos.map(makeGalleryMarkup).join(''));
        })
        .catch((error => {
            console.error(error);
        })
    );  
}

function makeGalleryMarkup(photos) { 
    const { webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads } = photos;

    const divEl = `<a class="gallery-item" href="${largeImageURL}">
                    <div class="photo-card">
                        <img class="photo" src="${webformatURL}" alt="" loading="lazy" />
                        
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
                    </div>
                </a>`;
    return divEl;
}

function onPreviewImgClick(event) {
    // e.preventDefault();
    console.log(event);
    if (event.target.nodeName !== 'IMG') {
        return;
    }; 

    modal.open(event);
}

import { getPhotos } from './get-photos';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

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
    console.log(webformatURL);

    const divEl = `<div class="photo-card">
                    <img src="${webformatURL}" alt="" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>${likes}</b>
                        </p>
                        <p class="info-item">
                            <b>${views}</b>
                        </p>
                        <p class="info-item">
                            <b>${comments}</b>
                        </p>
                        <p class="info-item">
                            <b>${downloads}</b>
                        </p>
                    </div>
                </div>`;
    console.log(divEl);
    return divEl;
}

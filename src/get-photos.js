class GetingPhotos { 
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
        this.viewedPhotos = 0;
    }
    
    getPhotos() {
        const axios = require('axios').default;
        
        return axios({
            url: 'https://pixabay.com/api/',
            params: {
                key: '31318291-9a8be1d683ef762d4988421c4',
                q: this.searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: this.page,
                per_page: 100,
            }
        })
            .then(response => {
                const photos = response.data.hits;
                this.viewedPhotos = this.viewedPhotos + photos.length;
                console.log('viewedPhotos', this.viewedPhotos);
                console.log('totalHits', response.data.totalHits);

                if (this.viewedPhotos >= 400) {
                    throw "We're sorry, but you've reached the end of search results.";
                    // console.log("We're sorry, but you've reached the end of search results.");
                }; 
                
                if (photos.length === 0) {
                    return 0;
                };
                
                return photos;
            })
    }

    increasePage() { 
        this.page += 1;
    }

    resetPage() { 
        this.page = 1;
    }

    get query() { 
        return this.searchQuery
    }

    set query(newQuery) { 
        this.searchQuery = newQuery;
    }

 
}

export { GetingPhotos };
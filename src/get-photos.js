function getPhotos(query) { 
    const axios = require('axios').default;

    return axios({
        url: 'https://pixabay.com/api/',
        params: {
            key: '31318291-9a8be1d683ef762d4988421c4',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        }
    });
}

export { getPhotos };
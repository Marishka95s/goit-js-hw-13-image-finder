// Есть файл apiService.js с дефолтным экспортом объекта отвечающего за логику HTTP-запросов к API
export default function fetchPictures(searchQuery) {
    const KEY = '21815283-4d687d50500392275cab155f7';
    const BASIC_URL = 'https://pixabay.com/api/';
    const queryUrl = `${BASIC_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=1&per_page=12&key=${KEY}`;

    return fetch(queryUrl)
        .then(r => {return r.json()})
        .catch(error => {
            console.log('This is error:', error)
        });
}
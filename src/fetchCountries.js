// Есть файл fetchCountries.js с дефолтным экспортом функции fetchCountries(searchQuery), возвращающей промис с массивом стран, результат запроса к API.
export default function fetchCountries(searchQuery) {
    const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

    return fetch(url)
        .then(r => {return r.json()})
        .catch(error => {
            console.log('This is error:', error)
        });
}
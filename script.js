const url = `https://api.openweathermap.org/data/2.5/`;
const key = '07f29a5f76449b0cb7db110e1e1b0754'

const setQuery = (e) => {
    if (e.keyCode == '13')
        getResult(searchBar.value)
}

const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`
    fetch(query)
    .then(weather => {
        return weather.json()
    })
    .then(displayResult) 
}

const displayResult = (result) => {
    let city = document.querySelector('.city')
    city.innerText = `${result.name}, ${result.sys.country}`;
    
    let temp = document.querySelector('.temp')
    temp.innerText = `${Math.round(result.main.temp)}°C`

    let describe = document.querySelector('.describe')
    let aciklama = capitalizeWords(result.weather[0].description)
    describe.innerText = aciklama
}
function capitalizeWords (str) {
    return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
const clean = (e) => {
    if (e.keyCode == '13') 
        setTimeout(() => {
            searchBar.value = ''
        }, 1);
}
const searchBar = document.getElementById('searchBar')
searchBar.addEventListener('keypress', setQuery)
searchBar.addEventListener('keydown', clean)
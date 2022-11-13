const inputElem = document.querySelector('input');

let apiData = {
    url : 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: 'efccae1068859ac90e6fcff7a72082d3'
}

function fetchData () {
    let cityValue = inputElem.value

    fetch(`${apiData.url}${cityValue}&appid=${apiData.key}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        showData(data);
    })
}

function showData (data) {
    let cityElem = document.querySelector('.city');
    cityElem.innerHTML = `${data.name}, ${data.sys.country}`;

    let dateElem = document.querySelector('.date');
    dateElem.innerHTML = showDate()
    
    let tempElem = document.querySelector('.temp');
    tempElem.innerHTML = `${Math.round(data.main.temp - 273.15)}&deg;C`;

    let weatherElem = document.querySelector('.weather');
    weatherElem.innerHTML = data.weather[0].main;

    let highLowElem = document.querySelector('.hi-low');
    highLowElem.innerHTML = `${Math.round(data.main.temp_max - 273.15)}&deg;C / ${Math.round(data.main.temp_min - 273.15)}&deg;C`;
}

function showDate () {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let now = new Date();

    let day = days[now.getDay()];
    let month = months[now.getMonth()];
    let year = now.getFullYear();
    let date = now.getDate();

    return `${day}  ${date}  ${month}  ${year}`;

}

inputElem.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        fetchData()
    }

});

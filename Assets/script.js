var currentDay = moment().format('MMMM Do  YYYY');
let weather = ""
let weatherCurrent = ""
let city = ""
var atlanta = document.querySelector('#city').innerHTML

var favsList = []
if (localStorage.favsList) {
    favsList = JSON.parse(localStorage.favsList)
}

for(let i = 0; i < favsList.length; i++){
    document.querySelector('#favourites').innerHTML +=`<div class="mb-3">
        <button class="btn btn-primary" type="button" id="${favsList[i]}" onclick='loadFavourites("${favsList[i]}")'>${favsList[i]}</button>
        </div>`
}


function loadFavourites(city){
    currentWeather(city)
}

function runCity(){
    city = document.querySelector('#cityName').value
    currentWeather(city)
    var favouriteCity = document.querySelector('#cityName').value
    console.log(favouriteCity)
    if(favsList.includes(favouriteCity) !== true){
    favsList.push(favouriteCity)
    localStorage.favsList = JSON.stringify(favsList)
    document.querySelector('#favourites').innerHTML +=`<div class="mb-3">
        <button class="btn btn-primary" type="button" id="${favouriteCity}" onclick="loadFavourites('${favouriteCity}')">${favouriteCity}</button>
        </div>`
        
}
    
}



async function currentWeather(city){
    document.querySelector('#forecastCard').innerHTML = ""
    // fetch weather for given city
    weather = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fe880404e0472c9c21ec6d8e606cea67`).then(r => r.json())
    weatherCurrent = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&appid=fe880404e0472c9c21ec6d8e606cea67`).then(r => r.json())
    console.log(weather)
    //Fills in current weather 
    document.querySelector('#currentIcon').src = `https://openweathermap.org/img/w/${weatherCurrent.current.weather[0].icon}.png`
    document.querySelector('#currentCity').innerHTML = `${city}, ${currentDay} `;
    document.querySelector('#currentTemp').innerHTML = `Temperature: ${weather.main.temp}C`
    document.querySelector('#currentHumidity').innerHTML = `Humidity: ${weather.main.humidity}%`
    document.querySelector('#currentWind').innerHTML = `Wind Speed: ${weather.wind.speed}km/hr`
    document.querySelector('#currentUV').innerHTML = `${weatherCurrent.current.uvi}`
    if (weatherCurrent.current.uvi <= 2){
        document.querySelector('#currentUV').style.backgroundColor = 'green';
    } else if (weatherCurrent.current.uvi > 2 && weatherCurrent.current.uvi <= 5){
        document.querySelector('#currentUV').style.backgroundColor = 'yellow';
    } else if (weatherCurrent.current.uvi > 5 && weatherCurrent.current.uvi <= 7){
        document.querySelector('#currentUV').style.backgroundColor = 'orange';
    } else if (weatherCurrent.current.uvi > 7 && weatherCurrent.current.uvi <= 10){
        document.querySelector('#currentUV').style.backgroundColor = 'red';
    } else {
        document.querySelector('#currentUV').style.backgroundColor = 'purple';
    }
    

    //Generates and fills in 5 day forecast 
    for (var i = 0; i < 5; i++ ){
        var forecastIcon = weatherCurrent.daily[i].weather[0].icon
        var forecastTemp = weatherCurrent.daily[i].temp.day
        var forecastHumidity = weatherCurrent.daily[i].humidity
        var tomorrow = moment().add(i + 1,'days').format('MMMM Do')
        console.log(forecastIcon)
        console.log(forecastTemp)
        console.log(forecastHumidity)
        document.querySelector('#forecastCard').innerHTML += `<div class="card m-1" id ="cardOne" style="width: 8rem; color:white; background-color: blue">
        <p>${tomorrow}</p>
        <img src="https://openweathermap.org/img/w/${forecastIcon}.png" width="50px" height="50px">
        <p>Temp: ${forecastTemp}</p>
        <p>Humidity: ${forecastHumidity}%</p>
    </div>`
    }
    return
}


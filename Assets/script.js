var currentDay = moment().format('MMMM Do  YYYY');
let weather = ""
let weatherCurrent = ""
let city = ""
var atlanta = document.querySelector('#city').innerHTML

async function currentWeather(cityName){
    event.preventDefault()
    city = document.querySelector('#cityName').value
    cityStore = city
    document.querySelector('#forecastCard').innerHTML = ""
    // fetch weather for given city
    weather = await fetch (`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fe880404e0472c9c21ec6d8e606cea67`).then(r => r.json())
    weatherCurrent = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&appid=fe880404e0472c9c21ec6d8e606cea67`).then(r => r.json())
    console.log(weather)
    //Fills in current weather 
    document.querySelector('#currentCity').innerHTML = `${city}, ${currentDay} `;
    document.querySelector('#currentTemp').innerHTML = `Temperature: ${weather.main.temp}C`
    document.querySelector('#currentHumidity').innerHTML = `Humidity: ${weather.main.humidity}%`
    document.querySelector('#currentWind').innerHTML = `Wind Speed: ${weather.wind.speed}km/hr`
    document.querySelector('#currentUV').innerHTML = `UV Index: ${weatherCurrent.current.uvi}`
    document.querySelector('#favourites').innerHTML +=`<div class="mb-3">
        <button onclick="currentWeather()">${city}</button>
        </div>`

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


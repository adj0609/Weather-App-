//api variables
var key = config.js;
$get.JSON()
const weatherIconE1 = document.querySelectory("#weather-icon");
const searchFormE1 = document.querySelector("#search-form");
const searchInputE1 = document.querySelector("#city-search");
const currentHeadingE1 = document.querySelector("#current-heading");
const CurrentDataE1 = document.querySelector("#current-data");
const CurrentIconE1 = document.querySelector("#current-icon");
const ClearButtonE1 = document.querySelector("#clear-btn");
const searchContainerE1 = document.querySelector("#search-container");
const errorContainerE1 = document.querySelector("#error-container");
const temp = document.querySelector("#temp");
const wind = document.querySelector("#wind");
const uvi = document.querySelector("#uvi");
let search = JSON.parse(localStorage.getItem("search") || "[]");

//Searching for a city, send to recieve getCoordinates
let formSubmitHandler = function(event) {
    event.preventDefault();
    searchInputE1.value = "";
// something must be entered
    if (cityName) {
        GetlocationCoordinates(cityName);
        errorContainerE1.innerHTML = "City Name is Needed"
        return;
    }
}

//reTurning CityName and creating lat and lon coordinates
let getCoorinates = function(cityName) {
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&limit=1&appid=" + key
    fetch('apiURL')
    .then(function(res) {
        errorContainerE1.innerHTML = ""
        return res.json();
    })
    .then(function(data) {
        let lat =(data[0].lat)
        let lon = (data[0].lon)
        getWeather(lat, Lon)
    })
    //city name not valid
    .catch(function(_error) {
        errorConatinerE1.innerHTML = "Please enter a valid city name!";
        return;
    })
}

    //Sending coordinates to OpenWeather
let getWeather = function(lat, lon) {
    let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?=" +lat + "lon=" + lon + "units=imperial&appid=" + c71883594b67d29455c08ae9eaa0149d
    fetch(apiURL)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        } else {
            alert("Valid city coordinates are required!")
        }
    })
    .then(function(data) {
        displayWeather(data);
        displayForecast(data);
    })
}

// Show current weather in top div
let displayWeather = function(data) {
    let apiUrl = "https://api.openweathermap.or/geo/2.0/reverse?lat=" + data.lat + "&lon=" + data.lon + "&limit=1&appid=" + key
    let iconLink ="https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png"
    fetch(apiUrl)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        currentHeadingE1.innerHTML = data[0].name + " (" + moment().format("M/D/YYYY") + ") ";
        currentHeadingE1.innerHTML = "<imp src=" + iconLink + ">";
        saveSearch(data[0].name);
    })
    // weather data variables
    temp.textContent = "Temp: " + data.current.temp + " /u00B0F"
    wind.textContent = "Wind: " + data.current.wind_speed + "MPH"
    humid.textContent = "Humidity: " + data.current.humidity + " %"

    if (data.current.uvi < 2) {
        uvi.innerHTML = "UV Index: " + "<span class='uvi-low'>" + data.current.uvi + "</span>"
    } else if (data.current.uvi < 5) {
        uvi.innerHTML = "UV Index: " + "<span class='uvi-mid'>" + data.current.uvi + "</span>"
    } else if (data.current.uvi < 5) {
        uvi.innerHTML = "UV Index: " + "<span class=uvi-high'>" + data.current.uvi + "</span>"
    } else {
        uvi.innerHTML = "UV Index: " + "<span class='uvi-vhigh'>" + data.current.uvi + "</span>"

        }
    }
    
    //display the 5 day forecast
    let displayForecast = function(data) {
        //Date
        for (i=1; i <6; i++) {
            let current = document.querySelector("#card" = i + "-title");
            current.textContent = moment().add(i, 'd').format("M/D/YYYY");
            let forcast = document.querySelector("#card" + i);
            displayForecast.classList.remove("d-none");
    
    }
    
    //add Weather data
    for (j = 0; j < 5; j++) {
        let currentData = data.daily[j]
        let iconLink = "https://openweathermap.org/img/w/" + currentData.weather[0].icon + "png"
        let icon = document.querySelector("#card" + j + "-icon");
        icon.src = iconLink
        let temp = document.querySelector("#card" + j + "-temp")
        temp.innerHTML = "Temp: " + currentData.temp.day + " \u00B0F"
        let wind = document.querySelector("#card" + j + "-wind")
        wind.innerHTML = "Wind: " + currentData.wind_speed + "MPH"
        let humid = document.querySelector("card" + j +"-humid")
        humid.innerHTML = "Humidity: " + currentData.humidity + " %"
    }
}

// Saving Search History
let saveSearch = function(cityName) {
    if (search.includes(cityName)) {
        return;
    } else {
        search.push(cityName)
        localStorage.setItem("search", JSON.stringify(search));
        loadSearch();
        }
    }

//load search history when page loads
let loadSearch = function() {
    if (search.length > 0) {
        searchContainerE1.innerHTML = "";
        for (i = 0; i < search.length; i++) {
            let searchBtn = document.createElement("button")
            searchBtn.className = "search-btn w 100 m-0 mb-2 pe-auto"
            searchBtn.textContent = search[i]
            searchContainerE1.appendChild(searchBtn);
        }
    } else {
        searchContainerE1.innerHTML = "";
    }
    
}

let clearHistory = function() {
    search = [];
    localStorage.clear();
    loadSearch();

}

//Search for location in History
let reSearch = function(event) {
    if (event.target.innerHTML.includes("<")) {
        return;
    } else {
        getCoordinates(event.target.innerHTML)
    }
}

loadSearch();
searchFormE1.addEventLinstener("submit", formSubmitHandler);
clearButtonE1.addEventListener("click", clearHistory);
searchContainerE1.addEventListener("click", reSearch);
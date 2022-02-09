//query selectors
var searchButtonEl = document.querySelector("#search-button");
var searchBarEl = document.querySelector("#search-bar");
var todayForecastContainerEl = document.querySelector("#today-weather-info-container");
var fiveDayForecastContainerEl = document.querySelector("#five-day-forecast-container");
var fiveDayHeaderEl = document.querySelector("#fiveDayForecastHeader");
var todayCityNameEl = document.querySelector("#todayCityName");
var todayTempEl = document.querySelector("#todayTemp");
var todayWindEl = document.querySelector("#todayWind");
var todayHumidityEl = document.querySelector("#todayHumidity");
var todayUvEl = document.querySelector("#todayUV");
var todayUVIndexValueEl = document.querySelector("#UVIndexValue");
var dayOneDateEl = document.querySelector("#dayOneDate");
var dayOneTempEl = document.querySelector("#dayOneTemp");
var dayOneWindEl = document.querySelector("#dayOneWind");
var dayOneHumidityEl = document.querySelector("#dayOneHumidity");
var dayTwoDateEl = document.querySelector("#dayTwoDate");
var dayTwoTempEl = document.querySelector("#dayTwoTemp");
var dayTwoWindEl = document.querySelector("#dayTwoWind");
var dayTwoHumidityEl = document.querySelector("#dayTwoHumidity");
var dayThreeDateEl = document.querySelector("#dayThreeDate");
var dayThreeTempEl = document.querySelector("#dayThreeTemp");
var dayThreeWindEl = document.querySelector("#dayThreeWind");
var dayThreeHumidityEl = document.querySelector("#dayThreeHumidity");
var dayFourDateEl = document.querySelector("#dayFourDate");
var dayFourTempEl = document.querySelector("#dayFourTemp");
var dayFourWindEl = document.querySelector("#dayFourWind");
var dayFourHumidityEl = document.querySelector("#dayFourHumidity");
var dayFiveDateEl = document.querySelector("#dayFiveDate");
var dayFiveTempEl = document.querySelector("#dayFiveTemp");
var dayFiveWindEl = document.querySelector("#dayFiveWind");
var dayFiveHumidityEl = document.querySelector("#dayFiveHumidity");
var todayIconEl = document.querySelector("#todayIcon");
var dayOneIconEl = document.querySelector("#dayOneIcon");
var dayTwoIconEl = document.querySelector("#dayTwoIcon");
var dayThreeIconEl = document.querySelector("#dayThreeIcon");
var dayFourIconEl = document.querySelector("#dayFourIcon");
var dayFiveIconEl = document.querySelector("#dayFiveIcon");
var recentSearchListEl = document.querySelector("#recent-searches");


//event handlers
searchButtonEl.addEventListener("click",obtainFullURL);
searchButtonEl.addEventListener("click",addCityToRecentSearch);
recentSearchListEl.addEventListener("click",newFetch);

//other variables
var userInput = "";
var fullURL = "";
//functions

printSearches();

 function obtainFullURL() {

    userInput = searchBarEl.value;
    cityName = userInput;

    var url = "https://api.openweathermap.org/data/2.5/weather?q="  + userInput + "&appid=03ce4cc46886230a13bfcd1457f0924c";

    fetch(url)
        .then (function (response) {
             if (response.status === 200)
                {
                    return response.json();
                }
            else
                {
                    var badSearchListString = localStorage.getItem("searchList");
                    var badSearchListStored = JSON.parse(badSearchListString);
                    
                    console.log(badSearchListStored);
                
                    badSearchListStored.pop();

                    localStorage.setItem("searchList",JSON.stringify(badSearchListStored));

                    console.log(badSearchListStored);
                    recentSearchListEl.firstChild.remove();

                    alert("Please enter valid city name");

                }
        })
        .then (function (data) {
            lat = data.coord.lat;
            lon = data.coord.lon;

            fullURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=03ce4cc46886230a13bfcd1457f0924c";
            runSearch();
        })
 }

function runSearch() {

    fetch(fullURL)
        .then (function (response) {

            return response.json();

        })
        .then (function (data) {
            console.log(data);
            
            obtainResults(data);
            showResults();

        })
}

function addCityToRecentSearch() {

    var searchList = localStorage.getItem("searchList");
    console.log(searchList);

    if (searchList == null) {

        var searchList = [];
        var searchedCity = searchBarEl.value;
        searchList.push(searchedCity);
        localStorage.setItem("searchList",JSON.stringify(searchList));
        console.log(searchList);
    }

    else {

        var searchListString = localStorage.getItem("searchList");
        searchList = JSON.parse(searchListString);
        var searchedCity = searchBarEl.value;
        searchList.push(searchedCity);
        localStorage.setItem("searchList",JSON.stringify(searchList));

    }

    printSearches();


}

function obtainResults(data) {

    //today variables
    cityName = cityName;
    var todayIconCode = data.daily[0].weather[0].icon;
    var todayIconSource = "http://openweathermap.org/img/w/" + todayIconCode + ".png";
    var todayUnix = eval((data.daily[0].dt));
    var todayDate = moment.unix(todayUnix).format("MM/DD/YYYY");
    var todayTempKelvin = data.daily[0].temp["day"];
    var todayTemp = ((todayTempKelvin - 273.15) * 1.8) + 32;
    var todayWind = data.daily[0].wind_speed;
    var todayHumidity = data.daily[0].humidity;
    var todayUVIndex = data.daily[0].uvi;

    //day 1 variables
    var dayOneIconCode = data.daily[1].weather[0].icon;
    var dayOneIconSource = "http://openweathermap.org/img/w/" + dayOneIconCode + ".png";
    var dayOneUnix = eval((data.daily[1].dt));
    var dayOneDate = moment.unix(dayOneUnix).format("MM/DD/YYYY");
    var dayOneTempKelvin = data.daily[1].temp["day"];
    var dayOneTemp = ((dayOneTempKelvin - 273.15) * 1.8) + 32;
    var dayOneWind = data.daily[1].wind_speed;
    var dayOneHumidity = data.daily[1].humidity;

    //day 2 variables
    var dayTwoIconCode = data.daily[2].weather[0].icon;
    var dayTwoIconSource = "http://openweathermap.org/img/w/" + dayTwoIconCode + ".png";
    var dayTwoUnix = eval((data.daily[2].dt));
    var dayTwoDate = moment.unix(dayTwoUnix).format("MM/DD/YYYY");
    var dayTwoTempKelvin = data.daily[2].temp["day"];
    var dayTwoTemp = ((dayTwoTempKelvin - 273.15) * 1.8) + 32;
    var dayTwoWind = data.daily[2].wind_speed;
    var dayTwoHumidity = data.daily[2].humidity;

    //day 3 variables
    var dayThreeIconCode = data.daily[3].weather[0].icon;
    var dayThreeIconSource = "http://openweathermap.org/img/w/" + dayThreeIconCode + ".png";
    var dayThreeUnix = eval((data.daily[3].dt));
    var dayThreeDate = moment.unix(dayThreeUnix).format("MM/DD/YYYY");
    var dayThreeTempKelvin = data.daily[3].temp["day"];
    var dayThreeTemp = ((dayThreeTempKelvin - 273.15) * 1.8) + 32;
    var dayThreeWind = data.daily[3].wind_speed;
    var dayThreeHumidity = data.daily[3].humidity;

    //day 4 variables
    var dayFourIconCode = data.daily[4].weather[0].icon;
    var dayFourIconSource = "http://openweathermap.org/img/w/" + dayFourIconCode + ".png";
    var dayFourUnix = eval((data.daily[4].dt));
    var dayFourDate = moment.unix(dayFourUnix).format("MM/DD/YYYY");
    var dayFourTempKelvin = data.daily[4].temp["day"];
    var dayFourTemp = ((dayFourTempKelvin - 273.15) * 1.8) + 32;
    var dayFourWind = data.daily[4].wind_speed;
    var dayFourHumidity = data.daily[4].humidity;
    
    //day 5 variables
    var dayFiveIconCode = data.daily[5].weather[0].icon;
    var dayFiveIconSource = "http://openweathermap.org/img/w/" + dayFiveIconCode + ".png";
    var dayFiveUnix = eval((data.daily[5].dt));
    var dayFiveDate = moment.unix(dayFiveUnix).format("MM/DD/YYYY");
    var dayFiveTempKelvin = data.daily[5].temp["day"];
    var dayFiveTemp = ((dayFiveTempKelvin - 273.15) * 1.8) + 32;
    var dayFiveWind = data.daily[5].wind_speed;
    var dayFiveHumidity = data.daily[5].humidity;

    //today print results
    todayCityNameEl.textContent = cityName + " (" + todayDate + ")";
    todayIconEl.src = todayIconSource;
    todayTempEl.textContent = "Temp: " + todayTemp.toFixed(2) + "°F";
    todayWindEl.textContent = "Wind: " + todayWind + " MPH";
    todayHumidityEl.innerHTML = "Humidity: " + todayHumidity + "%";
    todayUVIndexValueEl.textContent = todayUVIndex;

    if (todayUVIndex < 4) {

        todayUVIndexValueEl.setAttribute("class", "favorable");

    }

    else if (todayUVIndex > 8) {

        todayUVIndexValueEl.setAttribute("class", "severe");

    }

    else {
        todayUVIndexValueEl.setAttribute("class", "moderate");
    }

    //day 1 print results
    dayOneDateEl.textContent = dayOneDate;
    dayOneIconEl.src = dayOneIconSource;
    dayOneTempEl.textContent = "Temp: " + dayOneTemp.toFixed(2) + "°F";
    dayOneWindEl.textContent = "Wind: " + dayOneWind + " MPH";
    dayOneHumidityEl.textContent = "Humidity: " + dayOneHumidity + "%";

    //day 2 print results
    dayTwoDateEl.textContent = dayTwoDate;
    dayTwoIconEl.src = dayTwoIconSource;
    dayTwoTempEl.textContent = "Temp: " + dayTwoTemp.toFixed(2) + "°F";
    dayTwoWindEl.textContent = "Wind: " + dayTwoWind + " MPH";
    dayTwoHumidityEl.textContent = "Humidity: " + dayTwoHumidity + "%";

    //day 3 print results
    dayThreeDateEl.textContent = dayThreeDate;
    dayThreeIconEl.src = dayThreeIconSource;
    dayThreeTempEl.textContent = "Temp: " + dayThreeTemp.toFixed(2) + "°F";
    dayThreeWindEl.textContent = "Wind: " + dayThreeWind + " MPH";
    dayThreeHumidityEl.textContent = "Humidity: " + dayThreeHumidity + "%";

    //day 4 print results
    dayFourDateEl.textContent = dayFourDate;
    dayFourIconEl.src = dayFourIconSource;
    dayFourTempEl.textContent = "Temp: " + dayFourTemp.toFixed(2) + "°F";
    dayFourWindEl.textContent = "Wind: " + dayFourWind + " MPH";
    dayFourHumidityEl.textContent = "Humidity: " + dayFourHumidity + "%";

    //day 5 print results
    dayFiveDateEl.textContent = dayFiveDate;
    dayFiveIconEl.src = dayFiveIconSource;
    dayFiveTempEl.textContent = "Temp: " + dayFiveTemp.toFixed(2) + "°F";
    dayFiveWindEl.textContent = "Wind: " + dayFiveWind + " MPH";
    dayFiveHumidityEl.textContent = "Humidity: " + dayFiveHumidity + "%";

}

function showResults() {
    todayForecastContainerEl.setAttribute("style", "display:block");
    fiveDayHeaderEl.setAttribute("style", "display:block");
    fiveDayForecastContainerEl.setAttribute("style", "display:flex");
 }

 function printSearches() {

        var searchListString = localStorage.getItem("searchList");
        var searchListStored = JSON.parse(searchListString);
        recentSearchListEl.innerHTML = "";

        searchListStored.slice(-8).forEach((item) => {

            var listEl = document.createElement("li")
            listEl.setAttribute("class", "recent-search");
            listEl.textContent = item;

            recentSearchListEl.insertBefore(listEl, recentSearchListEl.firstChild);

        })
    }
    
function newFetch(event) {

    var cityClicked = event.target.textContent;
    cityName = cityClicked;

    var url = "https://api.openweathermap.org/data/2.5/weather?q="  + cityClicked + "&appid=03ce4cc46886230a13bfcd1457f0924c";

    fetch(url)
        .then (function (response) {
                    return response.json();
        })
        .then (function (data) {
            lat = data.coord.lat;
            lon = data.coord.lon;

            fullURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=03ce4cc46886230a13bfcd1457f0924c";
            runSearch();
        })

}
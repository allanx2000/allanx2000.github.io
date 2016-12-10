var key = "9f76b45277718a130e7c2970155a6d66"

var currentUrl = "http://api.openweathermap.org/data/2.5/weather?";
var dailyUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?";

var SLIDE_DUR = 800;

var isCelcius = false;
var lastData = null; //TODO: Get current and dailywa

var weatherVisible = false;

$("document").ready(function () {

    $("#btn_search").click(function () {
        getWeatherByQuery($("#location").val());
    });

    $("#btn_current").click(function () {
        getWeatherFromCurrentLocation();
    });

    $("#a_fahrenheit").click(function () {
        if (isCelcius) {
            isCelcius = false;
            displayWeather();
        }
    });

    $("#a_celcius").click(function () {
        if (!isCelcius) {
            isCelcius = true;
            displayWeather();
        }
    });


    getWeatherFromCurrentLocation();
});


function getWeatherByQuery(query) {

    var params = {
        "q": query,
        "appid": key,
        "cnt": 1
    };

    getWeather(params)
}

function getWeatherFromCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var params = {
                "lon": position.coords.longitude,
                "lat": position.coords.latitude,
                "appid": key,
            };

            getWeather(params);
        });
    }
}

function makeUrl(base, values) {
    var parts = [];

    $.each(values, function (key, value) {
        parts.push(key + "=" + value)
    });

    return base + parts.join("&");
}


var LOCATION = "loc"
var ICON = "icon";

var LAT = "lat";
var LONG = "long";

var CURRENT = "temp";
var HI = "hi";
var LOW = "low";

var STATUS = "status";

function displayWeather() {
    $("#current_location").text(lastData[LOCATION]);

    $("#d_lat").text(lastData[LAT]);
    $("#d_long").text(lastData[LONG]);

    var current = lastData[CURRENT];
    var hi = lastData[HI];
    var lo = lastData[LOW];

    if (current > hi)
        hi = current;

    if (current < lo)
        lo = current;


    var icon = lastData[ICON];
    $("#weather").attr("src", "http://openweathermap.org/img/w/" + icon + ".png");

    var description = lastData[STATUS];
    $("#status").text(description);


    if (isCelcius) {
        $("#a_fahrenheit").css("color", "blue");
        $("#a_celcius").css("color", "black");

        var kelvin = 273.15;

        hi = hi - kelvin;
        lo = lo - kelvin;
        current = current - kelvin;
    }
    else {
        $("#a_fahrenheit").css("color", "black");
        $("#a_celcius").css("color", "blue");

        var kelvin = 459.67;

        hi = hi * 9 / 5 - kelvin;
        lo = lo * 9 / 5 - kelvin;
        current = current * 9 / 5 - kelvin;
    }

    hi = Math.round(hi)
    lo = Math.round(lo)
    current = Math.round(current)

    $("#d_hi").text(hi);
    $("#d_low").text(lo);
    $("#temp").text(current);

    $("#results").slideDown(SLIDE_DUR);

}

function getWeather(parameters) {
    lastData = {};

    //ajaxWeather(parameters)

    $("#results").slideUp({
        "duration": SLIDE_DUR,
        "done": ajaxWeather(parameters)
    });
}


function ajaxWeather(parameters) {

    $.ajax({
        url: makeUrl(currentUrl, parameters),
        success: function (data) {
            console.log("Current:")
            console.log(data);

            lastData[LOCATION] = data.name;
            lastData[STATUS] = data.weather[0].description;
            lastData[ICON] = data.weather[0].icon;

            lastData[LAT] = data.coord.lat;
            lastData[LONG] = data.coord.lon;

            lastData[CURRENT] = data.main.temp;

            parameters["cnt"] = 1;

            setTimeout(function () {
                $.ajax({
                    url: makeUrl(dailyUrl, parameters),
                    success: function (data) {
                        var item = data.list[0];
                        console.log("Daily:")
                        console.log(data);

                        lastData[LOW] = item.temp.min;
                        lastData[HI] = item.temp.max;

                        displayWeather();
                    }
                })
            }, 500);

        }
    })
}


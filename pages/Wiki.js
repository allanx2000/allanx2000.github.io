var SLIDE_DUR = 800;

var apiBase = "https://en.wikipedia.org/w/api.php?action=query&format=json&titles=&generator=search&gsrlimit=10&gsrsearch=";

var pageBase = "http://en.wikipedia.org/wiki?curid=";

var weatherVisible = false;

function makeRequest(query, limit) {
    var request = "http://en.wikipedia.org/w/api.php?format=json&action=query";
    request += "&query=" + query;
    request += "&origin=" + window.location;
}

$("document").ready(function () {

    $("#btn_search").click(function () {
        search($("#search").val());
    });

    $("#btn_random").click(function () {
        goRandom();
    });

});

function search(query) {

    if (query == null)
        return;

    $("#results").slideUp({
        "duration": SLIDE_DUR,
        "done": function () {
            $("#results").empty();

            $.ajax({
                type: "GET",
                url: apiBase + query + "&callback=?",
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function (data, textStatus, jqXHR) {

                    var ol = $("<ol/>");
                    $("#results").append(ol);

                    $.each(data.query.pages, function (key, value) {
                        var link = $.parseHTML("<li><a target='_blank' href='" + (pageBase + key) + "'>" + value.title + "</a></li>");
                        ol.append(link)
                        /*
                         var div = $("<div/>")
                         var link = $("<a target='_blank' href='" + (pageBase + key) + "'>" + value.title + "</a>");
                         div.append(link);

                         $("#results").append(div);
                         */
                    });

                    $("#results").slideDown({
                        "duration": SLIDE_DUR
                    });
                },
                error: function (errorMessage) {
                }
            });

            /*
             $.ajax({
             url: apiBase + query,
             type:"POST",
             success: function (data) {
             console.log("Current:")
             console.log(data);


             }
             });
             */
        }
    });
}

function goRandom() {

    window.open("http://en.wikipedia.org/wiki/Special:Random", "_blank");
}

function makeUrl(base, values) {
    var parts = [];

    $.each(values, function (key, value) {
        parts.push(key + "=" + value)
    });

    return base + parts.join("&");
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


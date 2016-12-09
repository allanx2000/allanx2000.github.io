var portfolio;
var isCodePen;

var PORTFOLIO_GRID = "#portfolio_grid";
var colClasses = "col-xs-6 col-md-4";

function makeScrollTo(anchorName) {
    var a = $("a[name='" + anchorName + "']");

    return function () {
        $("html,body").animate({
                scrollTop: a.offset().top
            },
            "slow"
        )
    }
}

function showWatcher() {

    var data = {};
    data.name = "Watcher";

    data.description ="<p>The program monitors different sources for updates, similar to a RSS reader but can be from non-web sources as well.";
    data.description +="<br/><br/>The components are modular and consists of a WPF front-end, core logic library, a extensions framework library (abstract classes used to write plugins and swappable components like the database), and specific implementations.";
    data.description +="By Reflection, the WPF application can discover plugins from a user-configured location.";

    data.image = "/img/personal/watcher-large.png";

    data.linkText = "GitHub";
    data.link = "https://github.com/allanx2000/Watcher"

    createDialog(data);
}

function createDialog(data) {

    var dialog = $("#dialog-message");
    dialog.attr("title", data.name);

    var image = $("#dialog-image")
    image.attr("src", data.image);


    var description = $("#dialog-description");
    description.html(data.description);

    var link = $("#dialog-link");

    if (data.link) {
        link.html("<a href='" + data.link + "' target='_blank'>" + data.linkText + "</a>")
    }
    else
        link.html("");

    var width = $(window).width()*.9;
    var height = $(window).height()*.95;

    dialog.dialog({
        modal: true,
        width: width,
        position: {my:'top', at:'center', of:window},
        maxHeight: height
    });
}

$("document").ready(function () {

    //Add Scroll Effects
    $("#navmenu a").each(function (idx, el) {
        $(el).attr("href", "#");
        $(el).on("click", makeScrollTo(el.text.toLowerCase()))
    });

    //Populate Portfolio Section
    isCodePen = window.location.href.indexOf("codepen.io") >= 0;

    portfolio = {
        "Personal Projects" : [
            {
                "img": "/img/personal/watcher.png",
                "onClick": "showWatcher()",
                "name": "Watcher"
            },
            {
                "img": "/img/random_quote.png",
                "onClick": "doSomething('hello2')",
                "name": "Test"
            },
            {
                "img": "/img/random_quote.png",
                "onClick": "doSomething('hello3')",
                "name": "Test TEST TEST"
            },
        ],
        "FreeCodeCamp": [
            {
                "img": "/img/random_quote.png",
                "url": "RandomQuotes.html",
                "cp": "http://codepen.io/allanx2000/full/PZVYYE/",
                "name": "Random Quotes Generator"
            },
            {
                "img": "/img/calculator.png",
                "url": "Calculator.html",
                "cp": "http://codepen.io/allanx2000/full/dGaVJR/",
                "name": "Simple Calculator"
            },
            {
                "img": "/img/tribute.png",
                "url": "Tribute.html",
                "cp": "http://codepen.io/allanx2000/full/WrPKwe/",
                "name": "A Tribute"
            },
            {
                "img": "/img/weather.png",
                "url": "Weather.html",
                "cp": "http://codepen.io/allanx2000/full/wMOvqV/",
                "name": "Weather"
            },
            {
                "img": "/img/wiki.png",
                "url": "Wiki.html",
                "cp": "http://codepen.io/allanx2000/full/LGapGz/",
                "name": "Search Wikipedia"
            },
            {
                "img": "/img/twitch.png",
                "url": "Twitch.html",
                "cp": "http://codepen.io/allanx2000/full/mVoqMz/",
                "name": "On Twitch"
            },
            {
                "img": "/img/clock.png",
                "url": "Clock.html",
                "cp": "http://codepen.io/allanx2000/full/mVoqMz/",
                "name": "Pomodoro's Timer"
            },
            {
                "img": "/img/simon.png",
                "url": "Simon.html",
                "cp": "http://codepen.io/allanx2000/full/mVoqMz/",
                "name": "Simon"
            },
            {
                "img": "/img/XOs.png",
                "url": "XOs.html",
                "cp": "http://codepen.io/allanx2000/full/EPzmxe/",
                "name": "X and O's"
            }
        ]
    };

    generatePortfolio();
});


function newRow(items) {
    var row = $('<div class="row">');


    //var inner = $('<div class="row-height">');
    //row.append(inner);

    for (var i in items) {
        row.append(items[i]);
    }

    return row;
}

function generatePortfolio() {

    $(PORTFOLIO_GRID).empty();

    var row = null;
    var rowSize = 0;


    var keys = Object.keys(portfolio);
    for (key in keys) {

        var items = [];

        key = keys[key];

        var headerRow = "<div class='row'><h2 class='text-center col-xs-12'>" + key + "</h2></div>"
        headerRow = $.parseHTML(headerRow);

        $(PORTFOLIO_GRID).append(headerRow);

        for (var i in portfolio[key]) {

            var project = portfolio[key][i];

            var item = $("<div class=''/>");
            item.append($("<div class='portfolio_img_div'>" +
                "<img class='img img-responsive center-block vertical_center' src='" + project.img + "'>" +
                "</div>"));
            item.append($("<h4>" + project.name + "</h4>"));

            var linkBuilder = null;
            if (project.url || project.cp)
            {
                linkBuilder = "<a class='portfolio_item portfolio_link center-text' target='_blank' href='" + (isCodePen ? project.cp : project.url) + "'></a>a>";
            }
            else if (project.onClick)
            {
                linkBuilder = "<div class='portfolio_item portfolio_clickable' onClick=\"" + project.onClick + "\"></div>";
            }

            //var link = $("<a class='portfolio_item portfolio_link center-text' target='_blank'  href='" + (isCodePen ? project.cp : project.url) + "'></a>");
            var link = $(linkBuilder);

            link.append(item);

            var col = $("<div class='" + colClasses + "'/>"); //Need this to put gap between items
            col.append(link);

            items.push(col);
        }

        if (items.length > 0) {
            row = newRow(items);
            items = [];

            $(PORTFOLIO_GRID).append(row);
        }
    }

}

function encode(text) {
    return $('<div/>').text(text).html();
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

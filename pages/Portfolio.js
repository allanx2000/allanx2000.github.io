var portfolio;
var isCodePen;

var PORTFOLIO_GRID = "#portfolio_grid";

var colClasses = "col-xs-12 col-md-4";

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

$("document").ready(function () {

    //Add Scroll Effects
    $("#navmenu a").each(function (idx, el) {
        $(el).attr("href", "#");
        $(el).on("click", makeScrollTo(el.text.toLowerCase()))
    });

    //Populate Portfolio Section
    isCodePen = window.location.href.indexOf("codepen.io") >= 0;

    portfolio = [
        {
            "img": "http://innouvous.comlu.com/img/random_quote.png",
            "url": "RandomQuotes.html",
            "cp": "http://codepen.io/allanx2000/full/PZVYYE/",
            "name": "Random Quotes Generator"
        },
        {
            "img": "http://innouvous.comlu.com/img/calculator.png",
            "url": "Calculator.html",
            "cp": "http://codepen.io/allanx2000/full/dGaVJR/",
            "name": "Simple Calculator"
        },
        {
            "img": "http://innouvous.comlu.com/img/tribute.png",
            "url": "Tribute.html",
            "cp": "http://codepen.io/allanx2000/full/WrPKwe/",
            "name": "A Tribute"
        },
        {
            "img": "http://innouvous.comlu.com/img/weather.png",
            "url": "Weather.html",
            "cp": "http://codepen.io/allanx2000/full/wMOvqV/",
            "name": "Weather"
        }

    ];

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

    var items = [];

    for (i in portfolio) {
        var project = portfolio[i];

        var item = $("<div class=''/>");
        item.append($("<div class='portfolio_img_div'>" +
            "<img class='img img-responsive center-block vertical_center' src='" + project.img + "'>" +
            "</div>"));
        item.append($("<h4>" + project.name + "</h4>"));

        var link = $("<a class='portfolio_item portfolio_link center-text' target='_blank'  href='" + (isCodePen ? project.cp : project.url) + "'></a>");
        link.append(item);

        var col = $("<div class='" + colClasses + "'/>"); //Need this to put gap between items
        col.append(link);

        items.push(col);

        /*
        if (gridSize == 12) {

            row = newRow(items);
            items = [];

            $(PORTFOLIO_GRID).append(row);
            row = null;
            gridSize = 0;
         }*/

    }

    if (items.length > 0) {
        row = newRow(items);
        items = [];

        $(PORTFOLIO_GRID).append(row);
    }
}

function encode(text) {
    return $('<div/>').text(text).html();
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}
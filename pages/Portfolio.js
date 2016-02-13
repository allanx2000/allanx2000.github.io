var portfolio;
var isCodePen;

var PORTFOLIO_GRID = "#portfolio_grid";

var colClasses = "col-xs-6 col-md-4 col-height";

$("document").ready(function () {
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
        }
    ];

    generatePortfolio();
});


function newRow(items) {
    var row = $('<div class="row">');

    var inner = $('<div class="row-height">');
    row.append(inner);

    for (var i in items) {
        inner.append(items[i]);
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

        //TODO: Div to wrap image in fixed size box
        var item = $("<div class='portfolio_item'/>");
        item.append($("<div class='portfolio_img_div'><img src='" + project.img + "'/></div>"));
        item.append($("<a class='portfolio_link center-text' target='_blank'  href='" + (isCodePen ? project.cp : project.url) + "'>" + project.name + "</a>"));

        var col = $("<div class='" + colClasses + "'/>"); //Need this to put gap between items
        col.append(item);

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
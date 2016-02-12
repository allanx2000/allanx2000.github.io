var portfolio;
var gridSize = 3;
var isCodePen;

var PORTFOLIO_GRID = "#portfolio_grid";

$("document").ready(function () {
    isCodePen = window.location.href.indexOf("codepen.io") >= 0;

    portfolio = [{
        "img": "http://innouvous.comlu.com/img/random_quote.png",
        "url": "RandomQuotes.html",
        "cp": "http://codepen.io/allanx2000/full/PZVYYE/",
        "name": "Random Quotes Generator"
    }
    ];

    generatePortfolio();
});


function generatePortfolio() {
    $(PORTFOLIO_GRID).empty();

    var div = null;
    var rowSize = 0;

    for (i in portfolio) {
        var project = portfolio[i];

        if (div === null)
            div = $("<div class='row'/>");

        //TODO: Div to wrap image in fixed size box

        var item = $("<div class='portfolio_item col-md-" + gridSize + "'/>");
        item.append($("<div class='portfolio_img_div text-center'><img class='img-responsive' src='" + project.img + "'/></div>"));
        item.append($("<a class='text-center' target='_blank'  href='" + (isCodePen ? project.cp : project.url) + "'><h3>" + project.name + "</h3></a>"));

        div.append(item);
        rowSize += gridSize;

        if (gridSize == 12) {
            $(PORTFOLIO_GRID).append(div);
            div = null;
            gridSize = 0;
        }

    }

    if (div !== null)
        $(PORTFOLIO_GRID).append(div);
}

function encode(text) {
    return $('<div/>').text(text).html();
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}
var portfolio;
var isCodePen;

var PORTFOLIO_GRID = "#portfolio_grid";
var colClasses = "col-xs-12 col-sm-6 col-md-4";

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

/* Personal Projects */

function showWatcher() {

    var data = {};
    data.name = "Watcher";

    data.description ="<p> \
        I used to manually check sites for updates several times a day. In addition, I would need to sort through all the \
        updates and find the ones I actually cared about. \
        <br/><br/>Well, this program does most of the work, so you can just scroll down a list and see only the updates you care about! \
        <br/><br/>The program monitors different sources (not only websites) for updates, similar a RSS reader. \
        However, because you write the plugins, you can have it filter and only show the ones you would want to see. \
        </p>";

    data.image = "/img/personal/watcher-large.png";

    data.linkText = "GitHub";
    data.link = "https://github.com/allanx2000/Watcher"

    createDialog(data);

    return false;
}

function showComix() {

    var data = {};
    data.name = "Comix";

    data.description ="<p>A web comics reader and downloader. New comic sources can be added by writing plugins.</p>";

    data.image = "/img/personal/comix-large.png";

    createDialog(data);

    return false;
}

function showUtils() {

    var data = {};
    data.name = "innouvous Utils";

    data.description ="<p> \
        A set of .NET libraries that I created so I don't have to keep rewriting boilerplate code \
        in all my WPF projects. Some of these can be found in PRISM and other frameworks, but a lot of the programs I built don't require \
        all the features and warrant the overhead of setting them up. \
        <br/><br/>\
        I use the following in almost every project:\
        <ul>\
            <li><b>MVVM:</b> ViewModel and CommandHelper classes that encapsulate the code needed to use INotifyPropertyChanged</li>\
            <li><b>ResourceDictionary:</b> Defines styles for the elements, especially margin and padding, \
            so I don't have to redefine them in every single apps</li>\
            <li><b>MessageBoxFactory:</b> Utility class for creating MessageBoxes, with more intelligent defaults</li>\
            <li><b>DataBucket:</b> A wrapper around Dictionary&lt;String,Object&gt; so I don't have to explicitly define the backing fields \
            for properties and call INotifyPropertyChanged passing in the property name (in 4.5+, uses CallingMethodName by default)</li>\
        <li>SingleInstance:</b> Encapsulates the logic to check for existing running instances</li>\
            <li><b>Dialogs:</b> Utility class for creating Win32 dialogs; a bit more user friendly than the default implementation</li>\
            </ul>\
        </p>";

    data.image = "/img/personal/utils.png";

    data.linkText = "GitHub";
    data.link = "https://github.com/allanx2000/Innouvous.Utils"

    createDialog(data);

    return false;
}

function showSudoku() {

    var data = {};
    data.name = "Sudoku Solver";

    data.description ="<p>Solves Sudoku boards using process-of-elimination and trial-and-error</p>";

    data.image = "/img/personal/sudoku-large.png";

    data.linkText = "GitHub";
    data.link = "https://github.com/allanx2000/SudokuSolver"

    createDialog(data);

    return false;
}

function showMyCommute() {

    var data = {};
    data.name = "My Commute";

    data.description ="<p>I live almost an hour away from the office and also need to drive 30 minutes to the train station.\
        Bad weather and accidents, expecially in the winter months, can cause huge delays. This app uses Google Maps API to \
        check how long it would take to get to the station in the current traffic, so I can consider whether I should work from home or not.</p>";

    data.image = "/img/personal/myCommute.png";

    createDialog(data);

    return false;
}

function showNJT() {

    var data = {};
    data.name = "NJT Times";

    data.description ="<p>So I usually use NJ Rails, which is a very well made app. However, recently it didn't work, the real time schedules weren't updating. \ \
    I had to switch to the official app which is SLOOOOOOOOOOOOOOOW! One day, I had a thought: I could find the underlying API (which turned out to be REST) and use it\
    to get the times myself! And this is the result. The functionality is not as complete as the others but it does what I need it to do.\
    </p>";

    data.image = "/img/personal/njtTimes.png";

    createDialog(data);

    return false;
}

function showBlinkist() {

    var data = {};
    data.name = "Blinkist Stats";

    data.description ="<p>I am an avid reader but my reading list is very very long, several hundred books, and unfortunately I am cannot speed read. \
      Then I came across <a href='https://app.blinkist.com/' target='_blank'>Blinkist</a> which summarizes books into short reads that give the main ideas.\
      I wanted Stats though which it did not provide, so I wrote an app for it. It tracks how many books are read/added each day.\
      <br/><br/>\
      I don't know if it motivates me or not but it feels good to know how many books I've read in a day and to see the Total Unread count go down.</p>";

    data.image = "/img/personal/blinkistStats.png";

    createDialog(data);

    return false;
}

function showBalanceTracker() {

    var data = {};
    data.name = "Balance Tracker";

    data.description ="<p>I don't use my MetroCard often so just needed something to keep track of the balance and also easily update it... \
        so I wrote an app for it.</p>";

    data.image = "/img/personal/balanceTracker.png";

    createDialog(data);

    return false;
}

function createDialog(data) {

    var dialog = $("#dialog-message");

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

    var navBar = $('#navbar');

    dialog.dialog({
        modal: true,
        title: data.name,
        width: width,
        show: 'fade',
        hide: 'fade',
        position: { my:'top', at:'bottom', of:navBar},
        maxHeight: height
    });
}

/* ----------- */

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
                "img": "/img/personal/comix.png",
                "onClick": "showComix()",
                "name": "Comix"
            },
            {
                "img": "/img/personal/utils.png",
                "onClick": "showUtils()",
                "name": "innouvoua Utila"
            },
            {
                "img": "/img/personal/sudoku.png",
                "onClick": "showSudoku()",
                "name": "Sudoku Solver"
            },
            {
                "img": "/img/personal/myCommute.png",
                "onClick": "showMyCommute()",
                "name": "My Commute"
            },
            {
                "img": "/img/personal/njtTimes.png",
                "onClick": "showNJT()",
                "name": "njtTimes"
            },
            {
                "img": "/img/personal/blinkistStats.png",
                "onClick": "showBlinkist()",
                "name": "Blinkist Stats"
            },
            {
                "img": "/img/personal/balanceTracker.png",
                "onClick": "showBalanceTracker()",
                "name": "Balance Tracker"
            },
        ],
        "FreeCodeCamp": [
            {
                "img": "/img/fcc/random_quote.png",
                "url": "fcc/RandomQuotes.html",
                "cp": "http://codepen.io/allanx2000/full/PZVYYE/",
                "name": "Random Quotes Generator"
            },
            {
                "img": "/img/fcc/calculator.png",
                "url": "fcc/Calculator.html",
                "cp": "http://codepen.io/allanx2000/full/dGaVJR/",
                "name": "Simple Calculator"
            },
            {
                "img": "/img/fcc/tribute.png",
                "url": "fcc/Tribute.html",
                "cp": "http://codepen.io/allanx2000/full/WrPKwe/",
                "name": "A Tribute"
            },
            {
                "img": "/img/fcc/weather.png",
                "url": "fcc/Weather.html",
                "cp": "http://codepen.io/allanx2000/full/wMOvqV/",
                "name": "Weather"
            },
            {
                "img": "/img/fcc/wiki.png",
                "url": "fcc/Wiki.html",
                "cp": "http://codepen.io/allanx2000/full/LGapGz/",
                "name": "Search Wikipedia"
            },
            {
                "img": "/img/fcc/twitch.png",
                "url": "fcc/Twitch.html",
                "cp": "http://codepen.io/allanx2000/full/mVoqMz/",
                "name": "On Twitch"
            },
            {
                "img": "/img/fcc/clock.png",
                "url": "fcc/Clock.html",
                "cp": "http://codepen.io/allanx2000/full/mVoqMz/",
                "name": "Pomodoro's Timer"
            },
            {
                "img": "/img/fcc/simon.png",
                "url": "fcc/Simon.html",
                "cp": "http://codepen.io/allanx2000/full/mVoqMz/",
                "name": "Simon"
            },
            {
                "img": "/img/fcc/XOs.png",
                "url": "fcc/XOs.html",
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

function openUrl(url) {
    window.open(url,"_blank");
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
                var url = (isCodePen ? project.cp : project.url);
                linkBuilder = "<div class='portfolio_item portfolio_clickable' target='_blank' onclick=\"openUrl('" + url +  "')" + "\"></div>";
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

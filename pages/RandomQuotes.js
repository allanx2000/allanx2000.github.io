var lastRand;
var quotes;


$("document").ready(function () {
    quotes = [
        ["Whatever you are, be a good one.", "Abraham Lincoln"],
        ["If you dream it, you can do it.", "Walt Disney"],
        ["Never, never, never give up.", "Winston Churchill"],
        ["Don't wait. The time will never be just right.", "Napoleon Hill"]
    ];

    lastRand = -1;

    $("#generate").click(function () {
        generateQuote()
    });

    generateQuote();
});

function generateQuote() {
    var r;

    do
    {
        r = getRandom(quotes.length);
    }
    while (r === lastRand);

    lastRand = r;

    console.log(r);

    $("#quote").animate({opacity: 0}, 500, function () {
        $(this).text(quotes[r][0])
        $(this).animate({opacity: 1}, 500)
    });

    $("#author").animate({opacity: 0}, 500, function () {
        $(this).text("-" + quotes[r][1])
        $(this).animate({opacity: 1}, 500)
    });
}

function encode(text) {
    return $('<div/>').text(text).html();
}

var twitterHandle = 'sarbbottam';


function getRandom(max) {
    return Math.floor(Math.random() * max);
}
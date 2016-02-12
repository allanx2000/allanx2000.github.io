$("document").ready(function () {
    for (var i = 0; i <= 9; i++) {
        setPressedFor(i.toString())
    }

});

function setPressedFor(chr) {
    $("#k_" + chr).on("click", function () {
        pressed(chr);
    });
}

var current = "";
function pressed(text) {


    current += text;

    $("#screen").val(current);

    /*
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
     });*/
}

function encode(text) {
    return $('<div/>').text(text).html();
}

var twitterHandle = 'sarbbottam';


function getRandom(max) {
    return Math.floor(Math.random() * max);
}
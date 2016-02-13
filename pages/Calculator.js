$("document").ready(function () {


    $(".key").each(function (idx, el) {
        setPressedFor(el.id);

    })
});

function setPressedFor(id) {

    var el = $("#" + id);
    $("#" + id).on("click", function () {
        pressed(el, el.text());
    });
}

var current = "";
var hasDot = false;

function pressed(el, text) {
    try {
        if (text === "=") {
            current = eval(current).toString();
        }
        else if (text === "Del") {
            if (current.length <= 0)
                return;

            current = current.slice(0, -1);
        }
        else if (text === "Clear") {
            current = "";
            hasDot = false;
        }
        else if (text === ".") {
            if (hasDot === false) {
                current += text;
                hasDot = true;
            }
        }
        else {
            current += text;
        }

        $("#screen").val(current);
    }
    catch (e) {

    }
    finally {
        el.blur()
    }

}

function encode(text) {
    return $('<div/>').text(text).html();
}

var twitterHandle = 'sarbbottam';


function getRandom(max) {
    return Math.floor(Math.random() * max);
}
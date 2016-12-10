var game = null;

var BUTTONS = "buttons";
var AWAITING_INPUT = "waitingForInput";
var CURRENT_ROUND = "round";
var WAITING_FOR = "matchAgainst";

var STRICT = "strict";

var TIME_MULTIPLIER = "time_multiplier"
var TIMEOUT = "timeout";
var RESPONSE_TIME = "response";

var TEST_MODE = "test_mode";

var TEST_LIGHTS = "test_lights";

var TOTAL_ROUNDS = "rounds";

var keyLighted = false; //Tracks if a button is already "pressed"

function click(number) {

    clearTimeout(); //Cancel the wait timer

    if (keyLighted === true)
        return;

    light(number, true);

    //TODO: If strict, match
    if (false)  //has error...
    {
        //Wrong logic
        light(number, false);

        //if strict...
    }
    else {
        setTimeout(function () {

            light(number, false);
            //TODO: figure if right, if all matched

        }, 500) //Configurable
    }
}

function inGame() {
    return game !== null;
}

function resetGame() {
    game = null;
}


function createGame(testMode) {
    if (inGame())
        return;

    //TODO: Add validation

    game = {};

    if (testMode !== undefined) {
        game[TEST_MODE] = testMode;
    }

    game[TOTAL_ROUNDS] = parseInt($("#rounds").val(), 10);
    game[TIMEOUT] = parseInt($("#round_time").val(), 10) * 1000;
    game[TIME_MULTIPLIER] = parseFloat($("#time_multiplier").val(), 10)
    game[RESPONSE_TIME] = parseInt($("#response_time").val(), 10) * 1000;

    game[STRICT] = $("#strict").prop("checked");
    console.log("Strict: " + game[STRICT]);

    game[BUTTONS] = [];
    for (var i = 0; i < game[TOTAL_ROUNDS]; i++) {
        game[BUTTONS].push(Math.floor(Math.random() * (4)));
    }

    game[AWAITING_INPUT] = false;
    game[CURRENT_ROUND] = 0;
    game[WAITING_FOR] = 0;

}

//Start the round
function win() {

    console.log("Win");

    resetGame();
}

function nextRound() {
    game[CURRENT_ROUND]++;

    if (game[CURRENT_ROUND] > game[TOTAL_ROUNDS]) {
        win();
        return;
    }

    game[WAITING_FOR] = 0;

    //TODO: multiplel ights on
    //TOGO: Make current round 1-based?

    var multiplier = Math.pow(game[TIME_MULTIPLIER], game[CURRENT_ROUND])
    var duration = game[TIMEOUT] * multiplier / game[CURRENT_ROUND];

    console.log("Round: " + (game[CURRENT_ROUND]));
    console.log("Duuration: " + duration);

    playLights(0, duration)
}

//TODO: Add logic, listen for inputs
function listenForClick(number) {
    if (TEST_LIGHTS === game[TEST_MODE]) {
        setTimeout(function () {
            nextRound()
        }, 1000);
    }
}

//idx is the button # in game
function playLights(idx, dur) {
    if (idx === game[CURRENT_ROUND]) {
        game[WAITING_FOR] = 0;
        game[AWAITING_INPUT] = true;
        listenForClick(0);

        return;
    }

    var button = game[BUTTONS][idx];

    light(button, true);

    setTimeout(function () {
        light(button, false);

        setTimeout(function () {
            playLights(idx + 1, dur);
        }, dur)
    }, dur)
}


function light(buttonNumber, isOn) {

    var name = "btn_" + buttonNumber;

    keyLighted = isOn;

    if (isOn)
        $("#" + name).addClass(name + "_on");
    else
        $("#" + name).removeClass(name + "_on");
}


function toggleStrict(mode) {

    if (inGame())
        return;

    strictMode = !strictMode;
}


$("document").ready(function () {

    function initializeGameButton(id, value) {
        $(id).click(function () {
            click(value);
        });
    }

    $("#btn_start").click(function () {
        createGame();
        nextRound();
    });

    $("#btn_lights").click(function () {
        createGame(TEST_LIGHTS);
        nextRound();
    });

    for (var i = 0; i < 4; i++) {
        var id = "#btn_" + i;

        initializeGameButton(id, i);
    }


    $("#btn_1").click(function () {
        click(1);
    });

    $("#btn_2").click(function () {
        click(2);
    });

    $("#btn_3").click(function () {
        click(3);
    });


});


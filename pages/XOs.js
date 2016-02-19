var X = "X";
var O = "O";

var currentGame = null;

var Game = function (player) {
    function checkWin(side) {

        function checkRow(row) {

            var r = row * 3;

            for (var i = 0; i < 3; i++) {
                if (side !== board[r + i]) {
                    return false;
                }
            }
            return true;
        }

        function checkCol(col) {

            for (var i = 0; i < 3; i++) {
                if (side !== board[col + i * 3]) {
                    return false;
                }
            }

            return true;
        }


        function checkDiags() {

            var diags = [[0, 4, 8], [6, 4, 2]];

            var valid = true;

            for (var a in diags) {
                var arr = diags[a];

                for (var b = 0; b < arr.length; b++) {
                    console.log("B: " + board[arr[b]]);

                    if (side !== board[arr[b]]) {
                        valid = false;
                    }
                }

                if (valid)
                    return true;
                else
                    valid = true;
            }

            return false;
        }

        for (var i = 0; i < 3; i++) {
            if (checkRow(i) || checkCol(i))
                return true;
        }

        if (checkDiags())
            return true;


        return false;
    }

    var EMPTY = -1;

    var board = [];

    var player = player;
    var computer = player === X ? O : X;

    for (var i = 0; i < 9; i++) {
        board.push(EMPTY);
    }

    this.getPlayer = function () {
        return player;
    };

    /*
     this.isPlayersTurn = function()
     {
     return this.player === this.turn;
     };
     */

    this.setPosition = function (val) {
        if (board[val] !== EMPTY) {
            return false; //Not empty
        }

        board[val] = player;
        fillCell("c_" + val, player)

        if (checkWin(player)) {
            gameOver("Player win")
            return;
        }

        var empties = board.filter(function (val) {
            return val === EMPTY;
        })

        if (empties.length === 0) {
            gameOver("Tie");
            return;
        }

        //PC Move
        var i = null;

        do
        {
            i = Math.floor(Math.random() * 9);
        }
        while (board[i] !== EMPTY)

        board[i] = computer;
        fillCell("c_" + i, computer);

        if (checkWin(computer)) {
            gameOver("Computer Wins");
            return;
        }

        if (empties.length === 0)
            gameOver("Tie");

        return true;
    };
};

function setPlayerPoint(id, val) {

    if (inGame()) {
        currentGame.setPosition(val);
    }
}

function inGame() {
    return currentGame !== null;
}

function gameOver(winner) {
    currentGame = null;
    console.log(winner);
    //Clear board
    //Set message
    //Show select
}

function newGame(player) {

    console.log("New Game: " + player);

    if (inGame())
        return;

    currentGame = new Game(player);

    //TODO: Hide select
}

$("document").ready(function () {


    fillCell("select_x", X);
    fillCell("select_o", O);

    $("#select_x").click(function () {
        newGame(X)
    });
    $("#select_o").click(function () {
        newGame(O)
    });

    function setOnClick(id, idx) {
        $(id).click(function () {
            setPlayerPoint(id, idx);
        });
    }

    for (var i = 0; i < 9; i++) {
        setOnClick("#c_" + i, i);
    }

    $("#selec").click(function () {
        toggleRunning();
    });

    $("#status").text("Not Running");
});

function fillCell(id, XorO) {
    var color = XorO === X ? "red" : "black";

    if (id[0] !== "#")
        id = "#" + id;

    $(id).html("<p class='text-center'>" + XorO + "</p>");
    $(id).css("color", color);

}
/*
 function setMode(mode) {


 var bgColor = null;

 if (mode === NOT_RUNNING) {

 currentWork = null;
 currentBreak = null;

 bgColor = "";

 $("#btn_start").text("Start");
 $("#status").text("Not Running");

 $("#status").removeClass("break");
 $("#status").removeClass("work");

 $("#time_left").text("");

 }
 else {
 $("#btn_start").text("Stop");

 $("#status").text(mode === WORK ? "Work..." : "Break...");

 //$("#status").removeClass((mode === WORK) ? "break" : "work");
 //$("#status").addClass((mode === WORK) ? "work" : "break");

 if (mode === WORK) {
 bgColor = "#e63640";
 }
 else {
 bgColor = "#00dd00";
 }
 }

 $(".content").css("background-color", bgColor);


 this.mode = mode;

 }

 function onCall(hours, minutes, seconds) {
 if (mode === NOT_RUNNING) {
 return;
 }


 var parts = [hours + "", minutes + "", seconds + ""];

 for (var i in parts) {
 var p = parts[i];
 if (p.length === 1)
 parts[i] = "0" + p;
 }

 var timeString = parts.join(":");
 $('#time_left').text(timeString);

 if (hours == 0 && minutes == 0 && seconds == 0) {
 if (mode === WORK) {
 setMode(BREAK);
 hours = currentBreak[0];
 minutes = currentBreak[1];
 }
 else if (mode === BREAK) {
 setMode(WORK);
 hours = currentWork[0];
 minutes = currentWork[1];
 }

 seconds = 0;
 }

 if (seconds === 0) {
 seconds = 60;
 minutes -= 1;

 if (minutes === -1) {
 minutes = 59;
 hours -= 1;
 }
 }


 setTimeout(function () {
 onCall(hours, minutes, seconds - 1)
 }, 1000);
 }

 function toTimeArray(time) {
 var hours = Math.floor(time / 60);
 time -= hours * 60;

 return [hours, time, 0];
 }

 function toggleRunning() {

 if (mode === NOT_RUNNING) {
 var workTime = parseInt($("#t_work").val(), 10);
 var breakTime = parseInt($("#t_break").val(), 10);

 if (isNaN(workTime) ||
 isNaN(breakTime) ||
 workTime <= 0 ||
 breakTime <= 0) {

 var el = $.parseHTML("<div class='alert alert-danger fade in'>" +
 "<p>Times must be between (inclusive) 1 and 999</p>"
 );

 $("#alerts").empty();
 $("#alerts").append(el);

 return;
 }

 if (workTime > 999)
 {
 workTime = 999;
 $("#t_work").val(999);
 }

 if (breakTime > 999)
 {
 breakTime = 999;
 $("#t_break").val(999);
 }

 currentWork = toTimeArray(workTime);
 currentBreak = toTimeArray(breakTime);

 setMode(WORK);

 $("#t_work").attr("disabled", true);
 $("#t_break").attr("disabled", true);


 //onCall(0,0, 10);
 onCall(currentWork[0], currentWork[1], 0);
 }
 else {
 setMode(NOT_RUNNING);

 $("#t_work").removeAttr("disabled");
 $("#t_break").removeAttr("disabled");

 }
 }


 */
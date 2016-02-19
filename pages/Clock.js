var NOT_RUNNING = 0;
var BREAK = 1;
var WORK = 2;

var mode = NOT_RUNNING;

var currentWork;
var currentBreak;


$("document").ready(function () {

    $("#btn_start").click(function () {
        toggleRunning();
    });

    $("#status").text("Not Running");
});

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

        if (workTime > 999) {
            workTime = 999;
            $("#t_work").val(999);
        }

        if (breakTime > 999) {
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



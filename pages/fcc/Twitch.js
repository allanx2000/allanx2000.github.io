var SLIDE_DUR = 800;

var apiBase = "https://en.wikipedia.org/w/api.php?action=query&format=json&titles=&generator=search&gsrlimit=10&gsrsearch=";

var channels = [
    'freecodecamp',
    'storbeck',
    'terakilobyte',
    'habathcx',
    'RobotCaleb',
    'thomasballinger',
    'noobs2ninjas',
    'beohoff',
    'brunofin',
    'comster404',
    'test_channel',
    'cretetion',
    'sheevergaming',
    'TR7K',
    'OgamingSC2',
    'ESL_SC2'
];


var ALL = "all";
var OFFLINE = "off";
var LIVE = "live";

var isAnimating = false;

function makeRequest(type, name) {
    var request = "https://api.twitch.tv/kraken/" + type + "/" + name;

    return request;
}

$("document").ready(function () {

    $("#tab_all").click(function () {
        load(ALL);
    });
    $("#tab_live").click(function () {
        load(LIVE);
    });
    $("#tab_offline").click(function () {
        load(OFFLINE);
    });

    load(ALL);
});

//TODO: Add refreshTimer

var currentView = {};

var IS_STREAMING = "streaming";
var GAME = "game";
var STATUS = "status";
var ICON = "icon";
var USER_NAME = "user";
var URL = "url";

var started = 0;

function updatedStarted(change)
{
    started += change;

    if (started <= 0)
    {
        started = 0;

    }
}

function getStream(channel, mode) {
    $.ajax({
        type: "GET",
        url: makeRequest("streams", channel) + "?callback=?",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var cv = currentView[channel];

            cv[IS_STREAMING] = data.stream !== undefined && data.stream !== null;

            if (cv[IS_STREAMING] === true) {
                cv[GAME] = data.stream.game;
                cv[STATUS] = data.stream.channel.status;

                addChannelData(channel, data.stream.channel)
                makeDiv(currentView[channel], mode);
            }
            else
                getChannel(channel, mode);
        },
        error: function (errorMessage) {

        }
    });

    /*
     var div = $.parseHTML("<div class='col-xs-12'><p>" + JSON.stringify(currentView[channel]) + "</p></div>");

     $("#results").append(div)

     $("#results").fadeIn({
     "duration": SLIDE_DUR
     });
     */
}

function addChannelData(channel, data) {

    var cv = currentView[channel];

    cv[ICON] = data.logo; //TODO: why null?
    cv[USER_NAME] = data.display_name;
    cv[URL] = data.url;

}


function makeDiv(data, mode, notExistUser) {

    var row = "<div class='item row ";

    var userExists = notExistUser === undefined;
    var streaming;

    if (!userExists) {
        row += "st-unknown";
        streaming == false;
    }
    else {
        streaming = data[IS_STREAMING]

        row += streaming ? "st-live" : "st-offline";
    }

    //Update before returning
    updatedStarted(-1);

    if (started === 0)
    {
        $("#results").slideDown({ //fadeIn;
            "duration": SLIDE_DUR
        }, function() { isAnimating = false; })
    }

    if (mode === LIVE) {
        if (!streaming)
            return;
    }
    else if (mode === OFFLINE) {
        if (streaming || !userExists)
            return;
    }

    row += "'/>"


    var div = $(row);
    var tmp;

    if (!userExists) {
        tmp = "<div class='st-unknown col-xs-12'>" +
            "<h2 class='text-center'>" +
            "<b>" + notExistUser + "</b> does not exist!" +
            "</h2>" +
            "</div>";

        div.append(tmp);
    }
    else {
        //Icon
        var img = data[ICON] === null ? "" : ("<img class='img img-responsive center-block' src='" + data[ICON] + "'/>");

        tmp = "<div class='col-xs-1'>" + img + "</div>";
        div.append(tmp);

        //Username
        tmp = "<div class='col-xs-4'>" +
            "<h2 class='vertical_center'>" + data[USER_NAME] + "</h2>" +
            "</div>";
        div.append(tmp);


        //Status
        var status;

        if (!streaming)
            status = "Offline";
        else {
            status = data[GAME] + ": " + data[STATUS];
        }

        tmp = "<div class='col-xs-7 status'>" +
            "<a href='" + data[URL] + "' target='_blank'>" + status + "</a>" +
            "</div>";

        div.append(tmp);
    }


    if (!userExists) {
        $("#results").append(div);
    }
    else if (streaming) {
        $("#results").prepend(div);
    }
    else {
        var unknown = $("#results div[class~='st-unknown']");

        if (unknown.length === 0) {
            $("#results").append(div);
        }
        else {
            div.insertBefore(unknown[0]);
        }
    }

}

function getChannel(channel, mode) {

    $.ajax({
        type: "GET",
        url: makeRequest("channels", channel),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {


            addChannelData(channel, data)
            makeDiv(currentView[channel], mode);
        },
        error: function (errorMessage) {
            makeDiv(currentView[channel], mode, channel);
        }
    });
}

function load(mode) {

    $("#results").slideUp({ //fadeOut
        "duration": SLIDE_DUR,
        "done": function () {

            $("#results").empty();

            $.each(channels, function (idx, channel) {
                updatedStarted(1);

                currentView[channel] = {};

                getStream(channel, mode);
            })
        }
    });
}


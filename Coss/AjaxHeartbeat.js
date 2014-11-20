userActive = true;
heartbeating = false;
var interval = 60;
var end = 600;
var beats = 0;
var timeoutTime = interval * 1000;

function heartbeat() {
    if (userActive == true || (beats * interval < end)) {
        var theDate = new Date();
        //console.log(theDate.toLocaleTimeString().toString() + " = " + "beat... with... userActive = " + userActive.toString() + " and beats * interval = " + (beats * interval).toString());
        if (userActive == true) {
            beats = 0;
        }
        userActive = false;
        beats++;
        ajaxTimer.forceHttpRequest();
        setTimeout('heartbeat();', timeoutTime);
    }
    else {
        var theDate = new Date();
        //console.log(theDate.toLocaleTimeString().toString() + " = " + "heartbeat stopped...");
        heartbeating = false;
        ajaxTimer.forceHttpRequest();
    }
}

function startHeartbeat() {
    if (heartbeating == false) {
        var theDate = new Date();
        //console.log(theDate.toLocaleTimeString().toString() + " = " + "starting the heartbeat...");
        if (userActive == true) {
            heartbeating = true;
            userActive = false;
            ajaxTimer.forceHttpRequest();
            beats = 0;
            setTimeout('heartbeat();', timeoutTime);
        }
    }
}
function AjaxTimeoutTimer(strLength) {
    function hideDiv() {
        ref.objDiv = cdcd("divAjaxTimer");
        ref.objIFr = cdcd("ifAjaxTimer");
        ref.objDiv.style.display = "none";
        ref.objIFr.style.display = "none"
    }
    function createAjaxConfirm() {
        var a = document.createElement("iframe");
        var b = document.createElement("div");
        var c = document.createElement("div");
        var d = document.createElement("div");
        var e = document.createElement("div");
        var f = document.createElement("input");
        var g = document.createElement("input");
        a.id = "ifAjaxTimer";
        a.src = "javascript:false;";
        b.id = "divAjaxTimer";
        c.id = "divAjaxTitle";
        d.id = "divAjaxContent";
        e.id = "divAjaxBut";
        f.type = "button";
        g.type = "button";
        f.id = "ajaxB1";
        g.id = "ajaxB2";
        f.className = "csd_button session_button_confirm";
        g.className = "csd_button session_button_ignore";
        f.onclick = function () {
            ajaxTimer.confirmTimer();
            return false
        };
        g.onclick = function () {
            ajaxTimer.ignoreTimer(); return false
        };
        f.value = "text";
        g.value = "text";
        b.appendChild(c);
        b.appendChild(d);
        e.appendChild(f);
        e.appendChild(g);
        b.appendChild(e);
        document.forms[0].appendChild(a); document.forms[0].appendChild(b); return true
    }
    function finishRequest() {
        var twx = window.clearTimeout(timerWarn);
        var bx = window.clearTimeout(timerUpdate);
        var strDoc = this.req.responseText;
        if (strDoc.indexOf("Session Updated - Server Time:") == 0) {
            hideDiv();
            var waitx = window.clearTimeout(timerWait);
            //timerWarn = window.setTimeout(loadMessage, ref.sessionLength)
            timerWarn = window.setTimeout(loadMessage, ref.sessionLength)
        } else {
            cdcd("divAjaxContent").innerHTML = _gYourSessionHasAlreadyTimedOut;
            var timerHide = window.setTimeout(hideDiv, 3e3);
            eval(ref.target);
            if (opener) {
                try {
                    window.close()
                }
                catch (e) { }
            }
        }
    }

    this.forceFinishRequest = function forceFinishRequest() {
        //var twx = window.clearTimeout(timerWarn);
        var twx = window.clearTimeout(timerWarn);
        var bx = window.clearTimeout(timerUpdate);
        var strDoc = this.req.responseText;
        if (strDoc.indexOf("Session Updated - Server Time:") == 0) {
            var waitx = window.clearTimeout(timerWait);
            //timerWarn = window.setTimeout(loadMessage, ref.sessionLength)
            timerWarn = window.setTimeout(loadMessage, ref.sessionLength)
        } else {
            var timerHide = window.setTimeout(hideDiv, 3e3);
            eval(ref.target);
            if (opener) {
                try {
                    window.close()
                }
                catch (e) { }
            }
        }
    }

    function makeHttpRequest() {
        if (ref.serverURL == null) {
            alert("Errror: Server Side Code was not specified by web master!");
            ref.objDiv.style.display = "none"; ref.objIfr.style.display = "none";
            return false
        }
        var a = /(\s|:)/gi;
        var b = "ts=" + (new Date).toString().replace(a, "");
        var c = new net.ContentLoader(ref.serverURL, finishRequest, null, "POST", b)
    }

    this.forceHttpRequest = function forceHttpRequest() {
        if (ref.serverURL == null) {
            alert("Error: Server Side Code was not specified by web master!");
            return false
        }
        var a = /(\s|:)/gi;
        var b = "ts=" + (new Date).toString().replace(a, "");
        var c = new net.ContentLoader(ref.serverURL, this.forceFinishRequest, null, "POST", b)
    }

    function extendedWait() {
        eval(ref.target);
        if (opener) {
            try { window.close() } catch (e) { }
        }
    }
    function updateMessage() {
        var a = "Updating Session.";
        for (x = 0; x < intDotCount; x++)
            a += "."; cdcd("divAjaxContent").innerHTML = a;
        intDotCount++;
        if (intDotCount > 4)
            intDotCount = 0
    }
    function scrollIn() {
        if (parseInt(intStep) + parseInt(ref.top) <= parseInt(intStop)) {
            ref.top += intStep;
            var a = ref.top + GetScroll();
            ref.objDiv.style.top = a + "px";
            ref.objIFr.style.top = a + "px"
        }
        else {
            var b = window.clearInterval(timerScroll);
            ref.objDiv.style.top = GetScroll() + intStop + "px";
            ref.objIFr.style.top = ref.objDiv.style.top
        }
    }
    function GetScroll() {
        var a = document.documentElement.scrollTop;
        if (!a) a = document.body.scrollTop;
        if (!a) a = window.pageYOffset;
        if (!a) a = 0;
        return a
    }
    function loadMessage() {
        if (ref.loaded == false)
            ref.loaded = createAjaxConfirm();
        ref.objDiv = cdcd("divAjaxTimer");
        ref.objIFr = cdcd("ifAjaxTimer");
        ref.objDiv.style.zIndex = "1000";
        ref.objDiv.style.top = "-1000px";
        ref.objIFr.style.zIndex = "1000";
        ref.objIFr.style.top = "-1000px";
        ref.objDiv.style.display = "block";
        ref.objIFr.style.display = "block";
        if (navigator.userAgent.toLowerCase().indexOf("opera") != -1) ref.objIFr.style.visibility = "hidden";
        cdcd("divAjaxBut").style.display = "block";
        cdcd("divAjaxContent").innerHTML = ref.message;
        cdcd("divAjaxTitle").innerHTML = ref.title;
        cdcd("ajaxB1").value = ref.confirm;
        cdcd("ajaxB2").value = ref.ignore;
        calcBrowserSize();
        ref.objDiv.style.top = -ref.intDivHeight + "px";
        ref.objIFr.style.top = -ref.intDivHeight + "px";
        ref.top = -ref.intDivHeight;
        timerScroll = window.setInterval(scrollIn, 1);
        timerWait = window.setTimeout(extendedWait, ref.maxWait)
    }
    function calcBrowserSize() {
        if (self.innerHeight) {
            ref.intHeight = self.innerHeight;
            ref.intDivHeight = ref.objDiv.scrollHeight
        }
        else if (document.documentElement && document.documentElement.clientHeight) {
            ref.intHeight = document.documentElement.clientHeight;
            ref.intDivHeight = ref.objDiv.clientHeight
        }
        else if (document.body) {
            ref.intHeight = document.body.clientHeight;
            ref.intDivHeight = ref.objDiv.clientHeight
        }
        ref.intHeight = parseInt(ref.intHeight);
        ref.intDivHeight = parseInt(ref.intDivHeight)
    }
    this.loaded = false;
    this.intHeight = 600;
    this.intDivHeight = 150;
    this.objDiv = null;
    this.objIFr = null;
    this.top = 0;
    this.sessionLength = 1e3 * 60 * 479;
    if (typeof strLength != "undefined")
        this.sessionLength = strLength;
    //var timerWarn = window.setTimeout(loadMessage, this.sessionLength);
    timerWarn = window.setTimeout(loadMessage, this.sessionLength);
    this.maxWait = 1e3 * 60 * 1;
    this.title = _gTitle;
    this.message = _gMessage;
    this.confirm = _gConfirm;
    this.ignore = _gIgnore;
    this.extendedMessage = _gExtendedMessage;
    this.serverURL = _gServerURL;
    this.target = _gTarget;
    var ref = this;
    var timerScroll = null;
    var timerReject = null;
    var intStep = 2;
    var intStop = Math.floor(ref.intHeight / 5);
    var timerUpdate = null;
    var intDotCount = 0;
    var timerWait = null;
    this.confirmTimer = function () {
        timerUpdate = window.setInterval(updateMessage, 250);
        cdcd("divAjaxBut").style.display = "none";
        makeHttpRequest()
    };
    this.ignoreTimer = function () {
        ref.objDiv = cdcd("divAjaxTimer");
        ref.objIFr = cdcd("ifAjaxTimer");
        ref.objDiv.style.display = "none";
        ref.objIFr.style.display = "none";
        eval(ref.target);
        if (opener) {
            try { window.close() } catch (e) { }
        }
    }
}
var ajaxTimer = new AjaxTimeoutTimer




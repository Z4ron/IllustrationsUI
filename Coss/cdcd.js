if (typeof (__jqmobile) == "undefined") {
    __jqmobile = false;
}
if (typeof (__airplaneMode) == "undefined") {
    __airplaneMode = false;
}
function cdcsjs_IsJQMobile() {
    return __jqmobile;
}
function cdcsjs_IsInAirplaneMode() {
    return __airplaneMode;
}
function cdcd2(name) {
    if (typeof ($find) == "undefined") {
        return cdcd(name);
    } else {
        var o = null;
        o = $find(name);
        if (o) {
            return o;
        } else {
            return cdcd(name);        
        }
    }
}
window["cdcd2"] = cdcd2;
function cdcd(name) {
    var o = null;
    var o = document.getElementById(name);
    if (o) {
        return o;
    }
    o = eval("document.forms[0]." + name + ";");
    if (o) {
        return o;
    }
    //alert("in cdcd '"+name+"' is null");
    return null;
}
window["cdcd"] = cdcd;
function openercdcd(name) {
    //mobile uses iframe for popups - not a seperate window
    if (__jqmobile) {
        if (parent) {
            var o = parent.document.getElementById(name);
            if (o) {
                return o;
            }
            o = eval("parent.document.forms[0]." + name + ";");
            if (o) {
                return o;
            }
        }
    } else {
        if (opener) {
            var o = opener.document.getElementById(name);
            if (o) {
                return o;
            }
            o = eval("opener.document.forms[0]." + name + ";");
            if (o) {
                return o;
            }
        }
    }
    //alert("in opener cdcd '"+name+"' is null");
    return null;
}
window["openercdcd"] = openercdcd;

try {
    /*
    Note: This block of code was placed here because this was the only location where this seems to work......
    DX Filters are no longer Supported in IE10 - http://msdn.microsoft.com/en-us/library/ie/hh801215(v=vs.85).aspx 
    The MSIE version in the UserAgent string is drastically different between IE10 and IE11, so we cannot rely on that
    Instead we will use a combination of AppName and the Trident Version to determine if we need to remove the DX filters.
    IE10+ Trident version > 6.0
    */
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var tridentVersion = parseInt((navigator.userAgent).match(/Trident\/[0-9]*[0-9].[0-9]*[0-9]/).toString().replace('Trident/', ''));
        var cssId = 'removeDXfilterIE';  // you could encode the css path itself to generate id..
        if ((tridentVersion > 5) && !document.getElementById(cssId)) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = '../Css/removeDXFilter.css';
            link.media = 'all';
            head.appendChild(link);
        }
    }
} catch (e) { }
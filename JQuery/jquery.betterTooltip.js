/*-------------------------------------------------------------------------------
	A Better jQuery Tooltip
	Version 1.0
	By Jon Cazier
	jon@3nhanced.com
	01.22.08
-------------------------------------------------------------------------------*/

$.fn.betterTooltip = function (options) {

    /* Setup the options for the tooltip that can be 
    accessed from outside the plugin              */
    var defaults = {
        speed: 200,
        delay: 200
    };

    var options = $.extend(defaults, options);

    /* Create a function that builds the tooltip 
    markup. Then, prepend the tooltip to the body */
    getTip = function () {
        var tTip =
			"<div class='tip'>" +
				"<div class='tipMid'>" +
				"</div>" +
				"<div class='tipBtm'></div>" +
			"</div>";
        return tTip;
    }
    $("body").prepend(getTip());

    /* Give each item with the class associated with 
    the plugin the ability to call the tooltip    */
    $(this).each(function () {

        var $this = $(this);
        var tip = $('.tip');
        var tipInner = $('.tip .tipMid');

        var offset = $(this).offset();
        var tLeft = offset.left;
        if (tLeft == 0 || tLeft == '0') {
            tLeft = parseInt(this.style.left.replace('px', '')) + 185;
        }
        var tWidth = $this.width();
        var tHeight = $this.height();

        /* the class of the item whose title we are lifting */
        var tClass = $this.attr('class');

        /* Mouse over and out functions*/
        $this.hover(
			function () {
			    var sTop = this.style.top;
			    var tTop = sTop.replace('px', '');
			    var tTitle = (this.title);
			    this.title = "";
			    setColor(tClass);
			    tipInner.html(tTitle);
			    setTip(tTop, tLeft);
			    setTimer();
			},
			function () {
			    stopTimer();
			    tip.hide();
			    this.title = tipInner.html();
			}
		);

        /* Delay the fade-in animation of the tooltip */
        setTimer = function () {
            $this.showTipTimer = setInterval("showTip()", defaults.delay);
        }

        stopTimer = function () {
            clearInterval($this.showTipTimer);
        }

        /* Position the tooltip relative to the class 
        associated with the tooltip                */
        setTip = function (top, left) {
            var topOffset = tip.height();
            var negCheck = top - topOffset - 30;
            var xTip = (left - 30) + "px";
            var yTip;

            if (negCheck < 0) {
                yTip = "0px";
            }
            else {
                yTip = (top - topOffset - 30) + "px";
            }
            tip.css({ 'top': yTip, 'left': xTip });
        }

        /* This function stops the timer and creates the
        fade-in animation                          */
        showTip = function () {
            stopTimer();
            tip.animate({ "top": "+=20px", "opacity": "toggle" }, defaults.speed);
        }

        setColor = function (typeOfTip) {
            /* set the color for the hover at runtime */
            if (typeOfTip.indexOf("info") !== -1) {
                /* info hover */
                $('.tip').removeClass('alertTip');
                $('.tipMid').removeClass('alertTipMid');
                $('.tipBtm').removeClass('alertTipBtm');
                $('.tip').addClass('infoTip');
                $('.tipMid').addClass('infoTipMid');
                $('.tipBtm').addClass('infoTipBtm');
            }
            else {
                /* alert hover */
                $('.tip').removeClass('infoTip');
                $('.tipMid').removeClass('infoTipMid');
                $('.tipBtm').removeClass('infoTipBtm');
                $('.tip').addClass('alertTip');
                $('.tipMid').addClass('alertTipMid');
                $('.tipBtm').addClass('alertTipBtm');
            }
        }
    });
};
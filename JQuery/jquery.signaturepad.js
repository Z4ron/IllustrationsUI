/**
* @preserve SignaturePad: A jQuery plugin for assisting in the creation of an HTML5 canvas
* based signature pad. Records the drawn signature in JSON for later regeneration.
*
* Dependencies: FlashCanvas/1.5, json2, jquery/1.3.2+
*
* @project ca.thomasjbradley.applications.signaturepad
* @author Thomas J Bradley <hey@thomasjbradley.ca>
* @link http://thomasjbradley.ca/lab/signature-pad
* @link http://github.com/thomasjbradley/signature-pad
* @copyright Copyright MMXI, Thomas J Bradley
* @license New BSD License
* @version {{version}}
*/

/**
* Usage for accepting signatures:
*  $('.sigPad').signaturePad()
*
* Usage for displaying previous signatures:
*  $('.sigPad').signaturePad({displayOnly:true}).regenerate(sig)
*  or
*  var api = $('.sigPad').signaturePad({displayOnly:true})
*  api.regenerate(sig)
*/
(function($) {

    function SignaturePad(selector, options) {
        //* Reference to the object for use in public methods
        var self = this
            , settings = $.extend({}, $.fn.signaturePad.defaults, options)
            , context = $(selector)
            , canvas = $(settings.canvas, context)
            , element = canvas.get(0)
            , canvasContext = null
            , previous = { 'x': null, 'y': null }
            , output = []
            , mouseLeaveTimeout = false
            , touchable = false
            , eventsBound = false;


        //* Draws a line on canvas using the mouse position. Checks previous position to not draw over top of previous drawing
        //* @param {Object} e The event object
        //* @param {Number} newYOffset A pixel value for drawing the newY, used for drawing a single dot on click
        function drawLine(e, newYOffset) {
            var offset = $(e.target).offset(), newX, newY;

            clearTimeout(mouseLeaveTimeout);
            mouseLeaveTimeout = false;

            if (typeof e.changedTouches !== 'undefined') {
                newX = Math.floor(e.changedTouches[0].pageX - offset.left);
                newY = Math.floor(e.changedTouches[0].pageY - offset.top);
            }
            else {
                newX = Math.floor(e.pageX - offset.left);
                newY = Math.floor(e.pageY - offset.top);
            }

            if (previous.x === newX && previous.y === newY) { return true; }
            if (previous.x === null) { previous.x = newX; }
            if (previous.y === null) { previous.y = newY; }
            if (newYOffset) { newY += newYOffset; }

            canvasContext.beginPath();
            canvasContext.moveTo(previous.x, previous.y);
            canvasContext.lineTo(newX, newY);
            canvasContext.lineCap = settings.penCap;
            canvasContext.stroke();
            canvasContext.closePath();

            output.push({
                'lx': newX,
                'ly': newY,
                'mx': previous.x,
                'my': previous.y
            });

            previous.x = newX;
            previous.y = newY;
        }

        //* Callback registered to mouse/touch events of the canvas
        //* Stops the drawing abilities
        function stopDrawing() {
            if (touchable) {
                canvas.each(function() {
                    this.ontouchmove = null;
                });
            }
            else {
                canvas.unbind('mousemove.signaturepad');
            }

            previous.x = null;
            previous.y = null;

            if (output.length > 0) {
                updateOutputField(JSON.stringify(output));
            }
        }

        function updateOutputField(newVal) {
            $(settings.output, context).val(newVal);
            if (typeof settings.signedCallback === "function" && settings.readyForProcessing) {
                settings.signedCallback(settings.currentCtlName, newVal);
            }
        }

        //* Draws the signature line
        function drawSigLine() {
            if (!settings.lineWidth)
                return false;

            canvasContext.beginPath();
            canvasContext.lineWidth = settings.lineWidth;
            canvasContext.strokeStyle = settings.lineColour;
            canvasContext.moveTo(settings.lineMargin, settings.lineTop);
            canvasContext.lineTo(element.width - settings.lineMargin, settings.lineTop);
            canvasContext.stroke();
            canvasContext.closePath();
        }

        //* Clears all drawings off the canvas and redraws the signature line
        function clearCanvas() {
            stopDrawing();

            canvasContext.fillStyle = settings.bgColour;
            canvasContext.fillRect(0, 0, element.width, element.height);

            if (!settings.displayOnly) {
                drawSigLine();
            }

            canvasContext.lineWidth = settings.penWidth;
            canvasContext.strokeStyle = settings.penColour;

            //$(settings.output, context).val('');
            updateOutputField('');

            output = [];

            //debugger;
            //if (typeof settings.signedCallback === "function" && settings.readyForProcessing) { settings.signedCallback(settings.currentCtlName, JSON.stringify(output)); }
        }

        //* Callback registered to mouse/touch events of canvas. Triggers the drawLine function
        function startDrawing(e, o) {
            if (touchable) {
                canvas.each(function() {
                    this.addEventListener('touchmove', drawLine, false)
                });
            }
            else {
                canvas.bind('mousemove.signaturepad', drawLine);
            }

            // Draws a single point on initial mouse down, for people with periods in their name
            drawLine(e, 1);
        }

        //* Removes all the mouse events from the canvas
        function disableCanvas() {
            eventsBound = false;

            stopDrawing();

            if (touchable) {
                canvas.each(function() {
                    this.removeEventListener('touchstart', stopDrawing)
                    this.removeEventListener('touchend', stopDrawing)
                    this.removeEventListener('touchmove', drawLine)
                });
            }
            else {
                canvas.unbind('mousedown.signaturepad');
                canvas.unbind('mouseup.signaturepad');
                canvas.unbind('mousemove.signaturepad');
                canvas.unbind('mouseleave.signaturepad');
            }

            $(settings.clear, context).hide();
            $(settings.clear, context).unbind('click.signaturepad');
        }


        //* Lazy touch event detection. Uses the first press on the canvas to detect either touch or mouse reliably. Will then bind other events as needed
        function initDrawEvents(e) {
            if (eventsBound) { return false; }

            eventsBound = true;

            if (typeof e.changedTouches !== 'undefined') { touchable = true; }

            if (touchable) {
                canvas.each(function() {
                    this.addEventListener('touchend', stopDrawing, false)
                    this.addEventListener('touchcancel', stopDrawing, false)
                });

                canvas.unbind('mousedown.signaturepad');
            }
            else {
                canvas.bind('mouseup.signaturepad', function(e) { stopDrawing(); });
                canvas.bind('mouseleave.signaturepad', function(e) {
                    if (!mouseLeaveTimeout) {
                        mouseLeaveTimeout = setTimeout(function() {
                            stopDrawing();
                            clearTimeout(mouseLeaveTimeout);
                            mouseLeaveTimeout = false;
                        }, 500);
                    }
                });

                canvas.each(function() {
                    this.ontouchstart = null;
                });
            }
        }

        //* Triggers the abilities to draw on the canvas. Sets up mouse/touch events, hides and shows descriptions and sets current classes
        function drawIt() {
            $(settings.typed, context).hide();
            clearCanvas();

            canvas.each(function() {
                this.ontouchstart = function(e) {
                    e.preventDefault();
                    initDrawEvents(e);
                    startDrawing(e, this);
                }
            });

            canvas.bind('mousedown.signaturepad', function(e) {
                initDrawEvents(e);
                startDrawing(e, this);
            });

            //canvas.bind("mouseup.signaturepad", function() { alert("mouseup!"); stopDrawing(); if (typeof settings.signedCallback === "function" && settings.readyForProcessing) { settings.signedCallback(settings.currentCtlName, JSON.stringify(output)); } });

            $(settings.clear, context).bind('click.signaturepad', function(e) { e.preventDefault(); clearCanvas(); });
            $(settings.typeIt, context).bind('click.signaturepad', function(e) { e.preventDefault(); typeIt(); });
            $(settings.drawIt, context).unbind('click.signaturepad');
            $(settings.drawIt, context).bind('click.signaturepad', function(e) { e.preventDefault(); });

            $(settings.typeIt, context).removeClass(settings.currentClass);
            $(settings.drawIt, context).addClass(settings.currentClass);
            $(settings.sig, context).addClass(settings.currentClass);

            $(settings.typeItDesc, context).hide();
            $(settings.drawItDesc, context).show();
            $(settings.clear, context).show();
        }

        //* Triggers the abilities to type in the input for generating a signature. Sets up mouse events, hides and shows descriptions and sets current classes
        function typeIt() {
            clearCanvas();
            disableCanvas();
            $(settings.typed, context).show();

            $(settings.drawIt, context).bind('click.signaturepad', function(e) { e.preventDefault(); drawIt(); });
            $(settings.typeIt, context).unbind('click.signaturepad');
            $(settings.typeIt, context).bind('click.signaturepad', function(e) { e.preventDefault(); });

            //$(settings.output, context).val('');
            updateOutputField('');

            $(settings.drawIt, context).removeClass(settings.currentClass);
            $(settings.typeIt, context).addClass(settings.currentClass);
            $(settings.sig, context).removeClass(settings.currentClass);

            $(settings.drawItDesc, context).hide();
            $(settings.clear, context).hide();
            $(settings.typeItDesc, context).show();
        }

        //* Callback registered on key up and blur events for input field. Writes the text fields value as Html into an element
        function type(val) {
            $(settings.typed, context).html(val.replace(/>/g, '&gt;').replace(/</g, '&lt;'));

            while ($(settings.typed, context).width() > element.width) {
                var oldSize = $(settings.typed, context).css('font-size').replace(/px/, '');
                $(settings.typed, context).css('font-size', oldSize - 1 + 'px');
            }
        }

        //* Default onBeforeValidate function to clear errors
        function onBeforeValidate(context, settings) {
            $('p.' + settings.errorClass, context).remove();
            context.removeClass(settings.errorClass);
            $('input, label', context).removeClass(settings.errorClass);
        }

        //* Default onFormError function to show errors
        function onFormError(errors, context, settings) {
            if (errors.nameInvalid) {
                context.prepend(['<p class="', settings.errorClass, '">', settings.errorMessage, '</p>'].join(''));
                $(settings.name, context).focus();
                $(settings.name, context).addClass(settings.errorClass);
                $('label[for=' + $(settings.name).attr('id') + ']', context).addClass(settings.errorClass);
            }

            if (errors.drawInvalid) {
                context.prepend(['<p class="', settings.errorClass, '">', settings.errorMessageDraw, '</p>'].join(''));
            }
        }

        //* Validates the form to confirm a name was typed in the field. If drawOnly also confirms that the user drew a signature
        function validateForm() {
            var valid = true,
            errors = { drawInvalid: false, nameInvalid: false },
            onBeforeArguments = [context, settings],
            onErrorArguments = [errors, context, settings];

            if (settings.onBeforeValidate && typeof settings.onBeforeValidate === 'function') {
                settings.onBeforeValidate.apply(self, onBeforeArguments);
            }
            else {
                onBeforeValidate.apply(self, onBeforeArguments);
            }

            if (settings.drawOnly && output.length < 1) {
                errors.drawInvalid = true;
                valid = false;
            }

            if ($(settings.name, context).val() === '') {
                errors.nameInvalid = true;
                valid = false;
            }

            if (settings.onFormError && typeof settings.onFormError === 'function') {
                settings.onFormError.apply(self, onErrorArguments);
            }
            else {
                onFormError.apply(self, onErrorArguments);
            }

            return valid;
        }

        //* Redraws the signature on a specific canvas
        function drawSignature(paths, context, saveOutput) {
            for (var i in paths) {
                if (typeof paths[i] === 'object') {
                    context.beginPath();
                    context.moveTo(paths[i].mx, paths[i].my);
                    context.lineTo(paths[i].lx, paths[i].ly);
                    context.lineCap = settings.penCap;
                    context.stroke();
                    context.closePath();

                    if (saveOutput) {
                        output.push({
                            'lx': paths[i].lx,
                            'ly': paths[i].ly,
                            'mx': paths[i].mx,
                            'my': paths[i].my
                        });
                    }
                }
            }
        }

        //* Initialisation function, called immediately after all declarations. Technically public, but only should be used internally
        function init() {
            settings.readyForProcessing = true;
            
            // Fixes the jQuery.fn.offset() function for Mobile Safari Browsers i.e. iPod Touch, iPad and iPhone
            if (parseFloat(((/CPU.+OS ([0-9_]{3}).*AppleWebkit.*Mobile/i.exec(navigator.userAgent)) || [0, '4_2'])[1].replace('_', '.')) < 4.1) {
                $.fn.Oldoffset = $.fn.offset;
                $.fn.offset = function() {
                    var result = $(this).Oldoffset();
                    result.top -= window.scrollY;
                    result.left -= window.scrollX;

                    return result
                }
            }

            //* unbind events (in case these were previously bound.
            disableCanvas();

            // Disable selection on the typed div and canvas
            $(settings.typed, context).bind('selectstart.signaturepad', function(e) { return $(e.target).is(':input') });
            canvas.bind('selectstart.signaturepad', function(e) { return $(e.target).is(':input') });

            if (!element.getContext && FlashCanvas)
                FlashCanvas.initElement(element);

            if (element.getContext) {
                canvasContext = element.getContext('2d');

                $(settings.sig, context).show();

                if (!settings.displayOnly) {
                    if (!settings.drawOnly) {
                        $(settings.name, context).bind('keyup.signaturepad', function() {
                            type($(this).val());
                        });

                        $(settings.name, context).bind('blur.signaturepad', function() {
                            type($(this).val());
                        });

                        $(settings.drawIt, context).bind('click.signaturepad', function(e) {
                            e.preventDefault();
                            drawIt();
                        });
                    }

                    if (settings.drawOnly || settings.defaultAction === 'drawIt') {
                        drawIt();
                    }
                    else {
                        typeIt();
                    }

                    if (settings.validateFields) {
                        if ($(selector).is('form')) {
                            $(selector).bind('submit.signaturepad', function() { return validateForm(); });
                        } else {
                            $(selector).parents('form').bind('submit.signaturepad', function() { return validateForm(); });
                        }
                    }

                    $(settings.sigNav, context).show();
                }
            }
        }

        $.extend(self,
        {
            //* Initializes SignaturePad
            init: function() { init() },

            //* Regenerates a signature on the canvas using an array of objects. Follows same format as object property
            regenerate: function(paths) {
                settings.readyForProcessing = false;
                self.clearCanvas();
                $(settings.typed, context).hide();

                if (typeof paths === 'string') {
                    paths = JSON.parse(paths);
                }

                drawSignature(paths, canvasContext, true);

                if ($(settings.output, context).length > 0) {
                    //$(settings.output, context).val(JSON.stringify(output));
                    updateOutputField(JSON.stringify(output));
                }

                settings.readyForProcessing = true;
            },

            //* Clears the canvas. Redraws the background colour and the signature line
            clearCanvas: function() { clearCanvas(); },

            //* Returns the signature as a Js array
            getSignature: function() { return output; },

            //* Returns the signature as a Json string
            getSignatureString: function() { return JSON.stringify(output); },

            //* Returns the signature as an image. Re-draws the signature in a shadow canvas to create a clean version
            getSignatureImage: function() {
                var tmpCanvas = document.createElement('canvas'),
                    tmpContext = null,
                    data = null;

                tmpCanvas.style.position = 'absolute';
                tmpCanvas.style.top = '-999em';
                tmpCanvas.width = element.width;
                tmpCanvas.height = element.height;
                document.body.appendChild(tmpCanvas);

                if (!tmpCanvas.getContext && FlashCanvas) {
                    FlashCanvas.initElement(tmpCanvas);
                }

                tmpContext = tmpCanvas.getContext('2d');
                tmpContext.fillStyle = settings.bgColour;
                tmpContext.fillRect(0, 0, element.width, element.height);
                tmpContext.lineWidth = settings.penWidth;
                tmpContext.strokeStyle = settings.penColour;

                drawSignature(output, tmpContext);
                data = tmpCanvas.toDataURL.apply(tmpCanvas, arguments);

                document.body.removeChild(tmpCanvas);
                tmpCanvas = null;

                return data;
            },

            //* Disables control...
            disableCanvas: function() { disableCanvas(); },

            canvas: canvas
        });
    }

    /**
    * Create the plugin
    * Returns an Api which can be used to call specific methods
    *
    * @param {Object} options The options array
    *
    * @return {Object} The Api for controlling the instance
    */
    $.fn.signaturePad = function(options) {
        var api = null

        this.each(function() {
            api = new SignaturePad(this, options)
            api.init()
        })

        return api
    }

    /**
    * Expose the defaults so they can be overwritten for multiple instances
    *
    * @type {Object}
    */
    $.fn.signaturePad.defaults = {
        defaultAction: 'typeIt' // What action should be highlighted first: typeIt or drawIt
      , displayOnly: false // Initialize canvas for signature display only; ignore buttons and inputs
      , drawOnly: false // Whether the to allow a typed signature or not
      , canvas: 'canvas' // Selector for selecting the canvas element
      , sig: '.sig' // Parts of the signature form that require Javascript (hidden by default)
      , sigNav: '.sigNav' // The TypeIt/DrawIt navigation (hidden by default)
      , bgColour: '#ffffff' // The colour fill for the background of the canvas
      , penColour: '#145394' // Colour of the drawing ink
      , penWidth: 2 // Thickness of the pen
      , penCap: 'round' // Determines how the end points of each line are drawn (values: 'butt', 'round', 'square')
      , lineColour: '#ccc' // Colour of the signature line
      , lineWidth: 1 // Thickness of the signature line
      , lineMargin: 5 // Margin on right and left of signature line
      , lineTop: 45 // Distance to draw the line from the top
      , name: '.name' // The input field for typing a name
      , typed: '.typed' // The Html element to accept the printed name
      , clear: '.clearButton' // Button for clearing the canvas
      , typeIt: '.typeIt a' // Button to trigger name typing actions (current by default)
      , drawIt: '.drawIt a' // Button to trigger name drawing actions
      , typeItDesc: '.typeItDesc' // The description for TypeIt actions
      , drawItDesc: '.drawItDesc' // The description for DrawIt actions (hidden by default)
      , output: '.output' // The hidden input field for remembering line coordinates
      , currentClass: 'current' // The class used to mark items as being currently active
      , validateFields: true // Whether the name, draw fields should be validated
      , errorClass: 'error' // The class applied to the new error Html element
      , errorMessage: 'Please enter your name' // The error message displayed on invalid submission
      , errorMessageDraw: 'Please sign the document' // The error message displayed when drawOnly and no signature is drawn
      , onBeforeValidate: null // Pass a callback to be used instead of the built-in function
      , onFormError: null // Pass a callback to be used instead of the built-in function
      , activatedClass: 'activated' // class for when the signature box is activated
      , deactivatedClass: 'deactivated' // class for when the signature box is activated
      , signedCallback: null
      , currentCtlName: ""
      , readyForProcessing: false

    }
} (jQuery))

// ======================================================================================================================

var signString = " Sign ";
var captureString = " Capture ";
var clearString = "Clear Signature";

function displaySignaturePad(index) {

    //debugger;

    try {

        //* Here are the rules determining whether or not to show the stylus signing control
        // -----------------------------------------------------------------------------------------
        var sigPad = $("[name=sigPad" + index + "]");

        //Start check to see if we already have a signature value from a non-iPad while on an iPad, if so don't load the stylus control and don't alert the user that they don't have topaz installed
        var isTopazSigPresent = false;
        var tmpTopazSig = "";

        try {
            tmpTopazSig = $("[name=fldaSIG_X_" + index + "]").val();
            if (tmpTopazSig.substring(0, 6) == "[SIG_X") {
                //data not loaded - so get out
                return true;
            }
            if ((Left(tmpTopazSig, 2) != "[{" || Right(tmpTopazSig, 2) != "}]") && tmpTopazSig.length > 4) {
                isTopazSigPresent = true;
                if (local_cdcd("cossTopazTL462HSBInstalled").value != "NO") {
                    local_cdcd("cossTopazTL462HSBInstalled").value = "NO";
                }
                if (local_cdcd("cossInterlinkEPadInkInstalled").value != "NO") {
                    local_cdcd("cossInterlinkEPadInkInstalled").value = "NO";
                }
            }
        }
        catch (e) {

        }

        var showStylusSigPad = false;
        if (ipadSignatureSupported == "YES" && isTopazSigPresent == false) {
            var browserName = $.getBrowserName();
            if (browserName.indexOf("Safari-iPhone") != -1 || browserName.indexOf("Safari-iPad") != -1) {
                showStylusSigPad = true;
            }
        }
        // -----------------------------------------------------------------------------------------
        
        //alert("ipadSignatureSupported=" + ipadSignatureSupported);
        //alert("isTopazSigPresent=" + isTopazSigPresent);
        //alert("browserName=" + browserName);
        //alert("showStylusSigPad=" + showStylusSigPad);
        //alert("tmpTopazSig=" + tmpTopazSig.substring(0,10));
        
        // DEBUGGING CODE
        // -----------------------------------------------------------------------------------------
        //showStylusSigPad = true;
        // -----------------------------------------------------------------------------------------

        // -----------------------------------------------------------------------------------------
        //* If we've decided to show the stylus signature...
        if (showStylusSigPad == true) {

            var fra = $("[name=fra" + index + "]");
            var obj = $("[name=obj" + index + "]");
            var sigVal = $("[name=fldaSIG_X_" + index + "]").val();
            var topazButton = $("[name=btn" + index + "]");

            var clearButton = $("a", $("span .clearButton", sigPad));
            clearButton.text(clearString);
            clearButton.css("vertical-align", "top");

            var sigPadSignBtn = $("#sigExecSignCaptureBtn" + index);
            if (cossIsClientLocked == "YES") {
                sigPadSignBtn.attr("disabled", "disabled");
            }

            //var sigPadSignSpan = sigPadSignBtn.parent().parent();
            //sigPadSignSpan.css("position", "absolute");
            //sigPadSignSpan.offset({ "top": sigPad.offset().top + 26, "left": sigPad.offset().left + 400 });

            $("#IsSigning" + index).val("NO");
            local_cdcd("btn" + index).disabled = true; //? sigExecSignCaptureBtn?
            topazButton.attr('disabled', 'disabled');

            if (local_cdcd("cossTopazTL462HSBInstalled").value != "NO") {
                local_cdcd("cossTopazTL462HSBInstalled").value = "NO";
            }
            if (local_cdcd("cossInterlinkEPadInkInstalled").value != "NO") {
                local_cdcd("cossInterlinkEPadInkInstalled").value = "NO";
            }

            fra.css("border", "0px");
            $(".csd_signature").attr("class", "");

            //* If we've found our object, remove it as well as the button it comes with
            if (obj[0]) {
                obj.remove();
                topazButton.remove();
            }

            //* Do any last minute formatting of the signature pad.
            reformatSigPad(index);            
            
            //* Show the signature pad and set up the options
            sigPad.show();
            

            //* Activate the signature pad, regenerating signature if there's any data
            initializeSignaturePad(sigVal, sigPad, index, true);

            // DEBUGGING CODE
            // -----------------------------------------------------------------------------------------
            //showSigpadHiddenFields();
            // -----------------------------------------------------------------------------------------

        }
        else {
            if (sigPad[0]) { sigPad.hide(); }
        }
    }
    catch (ex) {
        //alert('an error occurred while setting up the signature: ' + ex.message);
    }
}

function reformatSigPad(index) {

    var sigPad = $("[name=sigPad" + index + "]");
    var fra = $("[name=fra" + index + "]");
    var sigPadSignBtn = $("#sigExecSignCaptureBtn" + index);
    var sigPadClearButton = $("span .clearButton", sigPad);

    //* Put the buttons outside the signature pad.
    //debugger;
    var pad = $(".sigPad", fra);
    var sigExecSpan = $(".sigExec", fra);
    var sigNavSpan = $(".sigNav", fra);
    var canvas = $(".pad", fra);
    var tbl = $("<table />");
    var tr1 = $("<tr />");
    var tr2 = $("<tr />");
    var td1 = $("<td />");
    var td2 = $("<td />");

    tbl = tbl.appendTo(sigNavSpan);
    tr1 = tr1.appendTo(tbl);
    tr2 = tr2.appendTo(tbl);  
    td1 = td1.appendTo(tr1);
    td2 = td2.appendTo(tr2);
    td1.append(sigPadClearButton);
    td1.append($("<font>&nbsp;</font>"));
    td1.css("text-align", "left");
    td2.css("text-align", "left");
    td2.append(sigPadSignBtn);
    tbl.css("border", "0px green solid");
    tbl.css("width", "100px");

    canvas.css("border", "1px silver solid")
    canvas.css("left", "1px");
    canvas.css("position", "relative");

    sigExecSpan.css({ "position": "", "left": "", "top": "", "border": "0px blue solid" });
    sigNavSpan.css("float", "right");
    pad.css("border", "0px silver solid");

}

function showSigpadHiddenFields() {
    //debugger;
    var sigD = $("[name=fldaSIG_D_" + index + "]").val();
    var sigT = $("[name=fldaSIG_T_" + index + "]").val();
    var sigZ = $("[name=fldaSIG_Z_" + index + "]").val();

    $("[name=fldaSIG_D_" + index + "]").remove();
    $("[name=fldaSIG_T_" + index + "]").remove();
    $("[name=fldaSIG_Z_" + index + "]").remove();

    sigPadSignSpan.append("<input name='fldaSIG_D_" + index + "' value='" + sigD + "'/>");
    sigPadSignSpan.append("<input name='fldaSIG_T_" + index + "' value='" + sigT + "'/>");
    sigPadSignSpan.append("<input name='fldaSIG_Z_" + index + "' value='" + sigZ + "'/>");
}

function initializeSignaturePad(sigVal, sigPad, index, displayOnly) {

    //* Activate the signature pad, regenerating signature if there's any data
    var options = {};
    if (displayOnly) {
        options = { 'currentCtlName': index, 'displayOnly': true, 'lineWidth': 1, 'signedCallback': sigChange }
    }
    else {
        options = { 'currentCtlName': index, 'drawOnly': true, 'validateFields': false, 'lineWidth': 1, 'signedCallback': sigChange }
    }

    if (sigVal.length > 0) {
        var sig = evalSignatureString(sigVal);
        sigPad.signaturePad(options).regenerate(sig);
    }
    else {
        sigPad.signaturePad(options);
    }

}

function local_cdcd(name) {
    var o = cdcd(name);
    if (!o) {
        var idString = "#" + name;
        var nameString = "[name=" + name + "]";

        if ($(idString)[0]) { o = $(idString)[0]; }
        else { if ($(nameString)[0]) { o = $(nameString)[0]; } }
    }

    return o;
}

function sigButtonClick(index, sigPadButton) {

    var topazButton = $("[name=btn" + index + "]");
    //topazButton.click();
    
    var sigPad = $("[name=sigPad" + index + "]");
    var sigVal = $("[name=fldaSIG_X_" + index + "]").val();
    var sig = evalSignatureString(sigVal);
    var canvas = $(".pad", sigPad);

    //* If the signature is being enabled....
    var displayOnly = (sigPadButton.attr("value") != signString);
    if (!displayOnly) {
        sigPadButton.attr("value", captureString);
        canvas.css("border", "1px red dashed");
    }
    else { // else if the signature is completed
        sigPadButton.attr("value", signString);
        canvas.css("border", "1px silver solid");
    }

    initializeSignaturePad(sigVal, sigPad, index, displayOnly);
    return displayOnly;
}

function evalSignatureString(sigVal) {
    var sig = {};
    try {
        sig = eval(sigVal);
    }
    catch (ex) {
        sig = {};
        //alert("sig data is bad: " + sigVal);
    }
    return sig;
}

function sigChange(ctl, val) {

    try {
        //alert('saving data: ' + val.toString());
        var p1 = ctl;
        var _1 = cdcsjs_GetDataObjectName(p1);
        var _2 = p1.replace(_1, "");

        if (val === "[]") { val = ""; }

        $("[name=fldaSIG_X_" + ctl + "]").attr("numPoints", val.length.toString());
        if (val.length > 0) {
            $("[name=fldaSIG_Z_" + _2 + "]").val(cdcsjs_GetNow());
            $("[name=fldaSIG_D_" + _2 + "]").val(cdcsjs_GetDate());
            $("[name=fldaSIG_T_" + _2 + "]").val(cdcsjs_GetTime());
            $("[name=fldaSIG_M_" + _2 + "]").val("stylus");
            $("[name=fldaSIG_K_" + _2 + "]").val(p1);
            $("[name=fldaSIG_P_" + _2 + "]").val(val.length);
        } else {
            $("[name=fldaSIG_Z_" + _2 + "]").val("");
            $("[name=fldaSIG_D_" + _2 + "]").val("");
            $("[name=fldaSIG_T_" + _2 + "]").val("");
            $("[name=fldaSIG_M_" + _2 + "]").val("");
            $("[name=fldaSIG_K_" + _2 + "]").val("");
            $("[name=fldaSIG_P_" + _2 + "]").val("");
        }
    }
    catch (ex) {
        alert('an error occurred while updating this signature: ' + ex.message);
    }
}
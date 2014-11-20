$(document).ready(function() {

    //* If we're in compact mode, that means we're being hosted in IX
    if (inCompactMode == true) {
        //* Hide our navigation buttons so IX can take over.
        $("#branding").hide();
        $("#nav-util").hide();

        //* Check for body clicks so we can send the message IX to close the tray.
        $('body').click(function() {
        
            try
            {            
                parent.CloseTray();
            }
            catch (ex) 
            {
                CloseTray();
            }
            return true;
        });

        try{ 
            parent.ResizeIFrame();
        }
        catch (ex) {
            ResizeIFrame();
        }
    }
});

function CloseTray() {
    //create the message to send
    var messageToSend = CreateCrossIFrameMessageData(ixMessageEvent.CloseTrayMessage);
    parent.postMessage(messageToSend, '*');
}
function ResizeIFrame() {
    //create the message to send
    var messageToSend = CreateCrossIFrameMessageData(ixMessageEvent.ResizeIFrameMessage, $(document).height());
    parent.postMessage(messageToSend, '*');
}

var ixMessageEvent = { CloseTrayMessage: 0, ResizeIFrameMessage: 1, ShowIFrameLoadingMessage: 2 };

function CreateCrossIFrameMessageData(messageToSend, iFrameSize) {
    var messageData = new Object();

    messageData.message = messageToSend;
    messageData.iFrameSize = iFrameSize;

    return JSON.stringify(messageData);
}
function postMessage(messageToSend, str) {
    parent.postMessage(messageToSend, str);
}
$(document).ready(function() {
    var ws = new WebSocket("ws://" + window.location.host);
    ws.onmessage = function(msg) {
        var msgObj = JSON.parse(msg.data);
        var newMessageElement = $("<div></div>");
        var name = $("<span></span>").addClass("name").text(msgObj.name);
        var message = $("<span></span>").addClass("message").text(msgObj.message);

        newMessageElement.append(name).append(message);
        $("#chatbox").prepend(newMessageElement);
    };

    $("#sendButton").on("click", function(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        var message = $("#messageInput").val();
        var transferObject = {};

        transferObject.name = $("#nameInput").val() || "Anonymous";
        transferObject.message = $("#messageInput").val();
        ws.send(JSON.stringify(transferObject));
    });
});

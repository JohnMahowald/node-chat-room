var socket = io();
var chat = new Chat(socket);

function getMessage() {
  var message = $("#outgoing").val();
  return message;
};

function updateGroupMessage(message) {
  var $li = $("<li>");
  $li.html("<strong>" + message.user + "</strong>" + ": " + message.text);
  $("#group-messages").append($li);
  $("#incoming").scrollTop(1000);
}

function postCurrentStatus(response) {
  var $li1 = $("<li>");
  $li1.text("You are now in: " + response.currentRoom);
  $("#group-messages").append($li1);
  var $li2 = $("<li>");
  $li2.text(response.message);
  $("#group-messages").append($li2);
	$("#current-room").html(response.currentRoom);
}

$(document).ready(function(){
	$("#outgoing").on("keypress", function(e) {
		if (e.keyCode == 13) {
			processOutgoingMessage()
			setTimeout( function() {
				$("#outgoing").val("")
			}, 0)
		}
	})
	
  $("#message-submit").on("click", function(event) {
    event.preventDefault();
		processOutgoingMessage();
  })
	
	function processOutgoingMessage (event) {
    var message = getMessage();
    var commandRegex = /\//;
    if (commandRegex.exec(message)) {
      chat.processCommand(message)
    } else {
      chat.sendMessage(message);
    }
		$("#outgoing").val("").focus()	
	}
});
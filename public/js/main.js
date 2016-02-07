var Engine = (function(global) {
	//var socket = io();
  //var socket = io.connect('https://104.197.194.141/');
  var socket = io.connect('https://192.168.0.106/');
  

// Initialize variables
  var $window = $(window);
  var $messages = $('.messages'); // Messages area
  var $inputMessage = $('.inputMessage'); // Input message input box
  var $chatPage = $('.chat.page'); // The chatroom page
  
	connected = true;

	 socket.on('new message', function (data) {
	 	console.log('on new message')
    	addChatMessage(data);
  	});

	// Sends a chat message
  function sendMessage () {
    var message = $inputMessage.val();
    // Prevent markup from being injected into the message
    message = cleanInput(message);
    // if there is a non-empty message and a socket connection
    if (message && connected) {
      $inputMessage.val('');
      addChatMessage({
        //username: username,
        message: message
      });
      // tell server to execute 'new message' and send along one parameter
      socket.emit('new message', message);
    }
  }
  function addChatMessage (data, options) {
  	$messages.append(data.message);
  }

  function cleanInput (input) {
    return $('<div/>').text(input).text();
  }

  $window.keydown(function (event) {
    
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;      
    }
  });

})(this);
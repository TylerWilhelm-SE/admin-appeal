var socket = io();

socket.on('connect', function () {
  console.log('Connected to Server');
  
});

socket.on('disconnect', function () {
  console.log('Disconnected from Server');
});

socket.on('newMessage', function(message){
	console.log('newMessage', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);
	jQuery('#messageList').append(li);
});


jQuery('#messageForm').on('submit', function(event){
	event.preventDefault();
	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function(){

	});

});
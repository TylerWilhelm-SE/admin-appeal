var socket = io();

socket.on('connect', function () {
  console.log('Connected to Server');
  var paramaters = jQuery.deparam(window.location.search);
  socket.emit('join', paramaters, function(error){
  	if(error){
  		alert(error);
  		window.location.href = '/';
  	}
  	else{
  		console.log('Valid Paramaters');
  	}
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from Server');
});
socket.on('updateAppellantList', function(appellants){
	console.log('Users List', appellants);
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
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const {realString} = require('./utils/validate.js');
const {Users} = require('./utils/user.js');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var appellants = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

 
 	socket.on('join', function (paramaters, callback){
 		if(!realString(paramaters.user) || !realString(paramaters.group)){
 			return callback('Username or Group is missing')
 		}

 		//Joins user to specified group chat
 		socket.join(paramaters.group);
 		appellants.removeAppellant(socket.id);
 		appellants.addAppellant(socket.id, paramaters.name, paramaters.group);
 		

 		io.to(paramaters.group).emit('updateAppellantList', appellants.getAppellantList(paramaters.group));
 		 //send message to new user
	 	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Appeal Chat'));

	  	//send message to all other users (new join)
	 	socket.broadcast.to(paramaters.group).emit('newMessage', generateMessage('Admin', 	`${paramaters.user} has Joined`));

 		callback();
 	});

  socket.on('createMessage', (message, callback) => {
  	console.log('createMessage', message);
  	io.emit('newMessage', generateMessage(message.from, message.text));
  	callback('This is From the Server');
  	// socket.broadcast.emit('newMessage', {
  	// 	from: message.from,
  	// 	text: message.text,
  	// 	createdAt: new Date().getTime()
  	// });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
    var appellant = appellants.removeAppellant(socket.id);
    if(appellant){
    	io.to(appellant.group).emit('updateAppellantList', appellants.getAppellantList(appellant.group));
    	io.to(appellant.group).emit('newMessage', generateMessage('Admin', `${appellant.user} has left`));    
    }
  });
});


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

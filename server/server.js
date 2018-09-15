const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', ()=> {
    console.log('User was disconnected (disconnect)');
  });

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (msg, ackCallback) => {
    console.log('createMessage received from client', msg);

    io.emit('newMessage', generateMessage(msg.from, msg.text));

    // socket.broadcast.emit('newMessage', {
    //   from: msg.from,
    //   text: msg.text,
    //   createdAt: new Date().getTime()
    // });

    ackCallback('This is from the server');

  });

});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

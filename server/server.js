const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', ()=> {
    console.log('User was disconnected (disconnect)');
  });

  socket.emit('newMessage', {
    from: 'ed',
    text: 'hello',
    createdAt: '123'
  });

  socket.on('createMessage', (msg) => {
    console.log('createMessage received from client', msg);

    io.emit('newMessage', {
      from: msg.from,
      text: msg.text,
      createdAt: new Date().getTime()
    })

  });

});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

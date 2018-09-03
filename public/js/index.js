var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'EdR',
    text: 'Hey, this is a msg from the client',
    createdAt: 123
  })

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (msg) {
  console.log('New message received from server, ', msg);
});

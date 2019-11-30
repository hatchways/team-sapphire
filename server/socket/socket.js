const { io } = require('../app');

io.on('connection', (socket) => {
  console.log('connected');

  socket.on('disconnect', () => {
    console.log(`${user} disconnected`);
  });
})

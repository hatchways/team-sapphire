const { io } = require("../app");
const jwt = require("jsonwebtoken");
const cookie = require('cookie');

io.use((socket, next) => {
  const cookies = cookie.parse(socket.handshake.headers.cookie);
  if (cookies.token) {
    const token = cookies.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    socket.userId = decodedToken.userId;
    next();
  } else {
    next("Unable to authenticate");
  }
})
.on("connection", (socket) => {
  console.log(`${socket.userId} connected`);

  socket.on("disconnect", () => {
    console.log(`${socket.userId} disconnected`);
  });
})

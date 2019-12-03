const { io } = require("../app");
const jwt = require("jsonwebtoken");
const cookie = require('cookie');

const getDecodedToken = (socket) => {
  const cookies = cookie.parse(socket.handshake.headers.cookie);
  const token = cookies.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  return decodedToken;
}

io.use((socket, next) => {
  if (getDecodedToken(socket)) {
    next();
  }
})
.on("connection", (socket) => {
  console.log("connected");
  socket.userId = getDecodedToken(socket).userId;

  socket.on("disconnect", () => {
    const userId = socket.userId;
    console.log(`${userId} disconnected`);
  });
})

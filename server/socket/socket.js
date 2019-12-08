const express = require("express");
const jwt = require("jsonwebtoken");
const cookie = require('cookie');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(4000, () => {
  console.log("Socket running on port 4000!");
});
const io = require('socket.io')(server);

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

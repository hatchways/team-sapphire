const cookie = require('cookie');
const jwt = require("jsonwebtoken");
const { mentionNotification } = require("../services/notifications/mentionsChecker");

module.exports = (io) => {
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

    mentionNotification.on("completed", (job, result) => {
      if (result) {
        socket.emit("newMentions", (true));
      }
    });

    socket.on("getNewMentions", userId => {
      if (socket.userId === userId) {
        socket.emit("newMentions", true);
      } else {
        socket.emit("newMentions", false);
      }
    })

    socket.on("disconnect", () => {
      console.log(`${socket.userId} disconnected`);
    });
  })
};

const { io } = require("../app");

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("setId", (user) => {
    socket.name = user;
    socket.emit("setId", socket.name);
  })

  socket.on("disconnect", () => {
    const user = socket.name;
    console.log(`${user} disconnected`);
  });
})

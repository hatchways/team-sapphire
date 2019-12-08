const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const corsOptions = {
  origin: "http://localhost:3000"
};
const Arena = require("bull-arena");
const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const authRoutes = require("./routes/auth");
const settingsRouter = require("./routes/settings");
const searchRouter = require("./routes/search");
const emailRouter = require("./routes/email");

const app = express();

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use(authRoutes);
app.use("/settings", settingsRouter);
app.use("/search", searchRouter);
app.use(emailRouter);
app.use(
  "/",
  Arena(
    {
      queues: [
        {
          // Name of the bull queue, this name must match up exactly with what you've defined in bull.
          name: "emailQueue",

          // Hostname or queue prefix, you can put whatever you want.
          hostId: "Mentions",

          // Redis auth.
          redis: "redis://127.0.0.1:6379"
        }
      ]
    },
    {
      basePath: "/arena",
      disableListen: true
    }
  )
);

// Error handler
app.use(function(err, req, res, next) {
  res.status(401).send({ success: false, error: err });
});

const server = app.listen(4000, () => {
  console.log("Server running on port 4000!");
});

const io = require("socket.io")(server);

module.exports = {
  app,
  io
};

require("./socket/socket");

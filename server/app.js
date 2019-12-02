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

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const authRoutes = require("./routes/auth");
const redditRouter = require("./routes/reddit");
const settingsRouter = require("./routes/settings");
const searchRouter = require("./routes/search");

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
app.use("/reddit", redditRouter);
app.use("/settings", settingsRouter);
app.use("/search", searchRouter);

// Error handler
app.use(function(err, req, res, next) {
  res.status(401).send({ success: false, error: err });
});

app.listen(4000, () => {
  console.log("Server running on port 4000!");
});

module.exports = app;

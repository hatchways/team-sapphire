// import createError from "http-errors";
// import express, { json, urlencoded } from "express";
// import { join } from "path";
// import cookieParser from "cookie-parser";
// import logger from "morgan";

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const indexRouter = require('./routes/index');
const pingRouter = require('./routes/ping');
// const userRouter = require('./routes/user');
const authRoutes = require("./routes/auth").router;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));


app.use("/", indexRouter);
app.use("/ping", pingRouter);
// app.use("/user", userRouter);
app.use(authRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(4000, () => {
  console.log("Server running on port 4000!");
});

module.exports = app;

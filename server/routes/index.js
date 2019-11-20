const express = require("express");
const router = express.Router();

// Middleware to verify users on protected routes
const jwtVerify = require('./auth').jwtVerify;

router.get("/welcome", function(req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

// Example usage of jwtverify middleware
// router.get('/homepage', jwtVerify, (req,res,next) => {
//   res.send('VERIFIED RESPONSE')
// })

module.exports = router;

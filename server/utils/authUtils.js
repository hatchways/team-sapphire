const jwt = require("jsonwebtoken");

function validateRegistration(request) {
  if (request.username.trim().length === 0) {
    return "Please enter a username";
  }
  if (request.password.trim().length < 6) {
    return "Password must be at least 6 characters long";
  }
}

async function jwtVerify(req, res, next) {
  if (req.cookies.token) {
    const token = req.cookies.token;
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.send({ authenticated: false });
      } else {
        const userId = decoded.userId;
        if (req.body.userId && req.body.userId !== userId) {
          res.send({ authenticated: false });
        } else {
          next();
        }
      }
    });
  } else {
    res.send({ authenticated: false });
  }
}

module.exports = {
  validateRegistration,
  jwtVerify
};

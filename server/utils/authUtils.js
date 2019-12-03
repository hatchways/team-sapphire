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
  if (req.cookies) {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      res.status(401).send({ authenticated: false });
    } else {
      next();
    }
  } else {
    res.status(401).send({ authenticated: false });
  }
}

module.exports = {
    validateRegistration,
    jwtVerify
}

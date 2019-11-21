function validateRegistration(request) {
  if (request.username.trim().length === 0) {
    return "Please enter a username";
  }
  if (request.password.trim().length < 6) {
    return "Password must be at least 6 characters long";
  }
}

function jwtVerify(req, res, next) {
  try {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).send({ error: "Invalid Request" });
  }
}

module.exports = {
    validateRegistration,
    jwtVerify
}
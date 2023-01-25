const jwt = require("jsonwebtoken");

const User = require("../model/user");

const asyncHandler = require("express-async-handler");

const requireAuth = asyncHandler(async (req, res, next) => {
  const token = req.token;
  if (!token) {
    res.status(400);
    throw new Error("not authorized");
    return;
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedToken) {
    res.status(400);
    throw new Error("something went wrong");
    return;
  }

  next();
});

const checkUser = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).send("not authorized");
    return;
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  let user = await User.findById(decodedToken.data.id);
  if (!user) {
    res.status(400);
    throw new Error("not authorized");
    return;
  }
  res.json({ token: token });
});

module.exports = {
  requireAuth,
  checkUser,
};

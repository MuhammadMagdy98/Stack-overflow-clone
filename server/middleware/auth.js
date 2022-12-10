const jwt = require("jsonwebtoken");

const User = require("../model/user");

const asyncHandler = require("express-async-handler");

const requireAuth = asyncHandler(async (req, res, next) => {
  const token = req.token;
  console.log(`token is ${token}`);
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

  console.log(`decodedToken = ${decodedToken}`);

  next();
});

const checkUser = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(`token is ${token}`);

  if (!token) {
    console.log("not authorized");
    res.status(400);
    throw new Error("not authorized");
    return;
  }

  console.log(token);

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  console.log(`decoded token ${decodedToken}`);
  console.log(`decoded token id ${JSON.stringify(decodedToken)}`);
  let user = await User.findById(decodedToken.id);
  if (!user) {
    res.status(400);
    throw new Error("not authorized");
    return;
  }
  res.json({ token: token, username: user.username });
});

module.exports = {
  requireAuth,
  checkUser,
};

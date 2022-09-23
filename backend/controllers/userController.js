const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const register = asyncHandler(async (req, res) => {
  // Get input fields
  const { username, password, passwordConfirm } = req.body;
  // Validate data
  if (
    !username ||
    !password ||
    !passwordConfirm ||
    password !== passwordConfirm
  ) {
    res.status(400);
    throw new Error('Invalid credentials');
  }

  // Check if user exists
  const usernameTaken = await User.findOne({ username });
  if (usernameTaken) {
    res.status(400);
    throw new Error('Username is taken');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      username: user.username,
      token: generateJWT({ id: user._id }),
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  // Check if user exists and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      username: user.username,
      token: generateJWT({ id: user._id }),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

const me = asyncHandler(async (req, res) => {
  // Get current user from req
  const { _id, username } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    username,
  });
});

// Generate JWT
const generateJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  register,
  login,
  me,
};

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

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

  // Hash password

  // Create user

  res.send('valid');
});

const login = async (req, res) => {
  res.send('login');
};

const me = async (req, res) => {
  res.send('me');
};

module.exports = {
  register,
  login,
  me,
};

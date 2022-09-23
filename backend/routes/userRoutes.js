const express = require('express');
const { register, login, me } = require('../controllers/userController');

// Create router
const router = express.Router();

// Require functions from user controller
router.post('/register', register);
router.post('/login', login);
router.get('/me', me);

// Export router
module.exports = router;

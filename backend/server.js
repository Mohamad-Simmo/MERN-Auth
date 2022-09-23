const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectedDB = require('./config/db');

const port = process.env.PORT || 5000;

// Connect to mongo database
connectedDB();

// Initialization and middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create user route
app.use('/api/users', require('./routes/userRoutes'));

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`.rainbow));

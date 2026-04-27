/**
 * app.js
 * Main Express application setup, error handling, and routing initialization.
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { errorHandler } = require('./middleware/errorHandler');
const apiRouter = require('./routes/api');

const app = express();

// Middleware setup
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

//Allow all origins, methods, and headers
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// API routes
app.use('v1/api', apiRouter);

export default app;
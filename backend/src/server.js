/**
 * server.js
 * Entry point for the application. Starts the server and connects to the database.
 */
import app from './app';
import db from './db';
import envConfig from './config/env';

const PORT = envConfig.port || 3000;
db.connectDB();
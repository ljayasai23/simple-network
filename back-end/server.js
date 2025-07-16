require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Database Connection with Visual Feedback
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('\x1b[32m%s\x1b[0m', '✅ MongoDB Connected'); // Green checkmark
  })
  .catch(err => {
    console.log('\x1b[31m%s\x1b[0m', '❌ MongoDB Connection Failed'); // Red X
    console.error(err);
  });

// Server Startup with Visual Feedback
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', `✅ Server Running on http://localhost:${PORT}`); // Green checkmark
  console.log('\x1b[36m%s\x1b[0m', '👉 Try these endpoints:'); // Blue text
  console.log('\x1b[33m%s\x1b[0m', `POST /auth/register - Create user`); // Yellow text
  console.log('\x1b[33m%s\x1b[0m', `POST /auth/login - Login user`); // Yellow text
});

// Handle shutdown gracefully
process.on('SIGINT', () => {
  mongoose.connection.close();
  console.log('\n\x1b[31m%s\x1b[0m', '⏹️ Server stopped');
  process.exit(0);
});
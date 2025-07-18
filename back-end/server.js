require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const app = express();
const path = require('path');

//Enchanced CORS comfig'n
app.use(cors({
  origin:  process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); // Add this before routes

// Middleware
app.use(express.json());

// In server.js, add this test route BEFORE other routes:
app.get('/api/healthcheck', (req, res) => {
  res.json({ 
    status: 'active',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Routes
app.use('/api/auth', authRoutes);

// Handle root route
app.get('/', (req, res) => {
  res.send(`
    <h1>Simple Network API</h1>
    <p>Available endpoints:</p>
    <ul>
      <li>POST /auth/register</li>
      <li>POST /auth/login</li>
    </ul>
  `);
});

// Error handling MIddleware
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});




// Database Connection with Visual Feedback
mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'network',
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
  })
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
  
});

// Handle shutdown gracefully
process.on('SIGINT', () => {
  mongoose.connection.close();
  console.log('\n\x1b[31m%s\x1b[0m', '⏹️ Server stopped');
  process.exit(0);
});
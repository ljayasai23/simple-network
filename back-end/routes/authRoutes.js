const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: 'User not found. Please register.' });
  }

  // Simple password check (use bcrypt in production)
  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  res.json({ message: 'Login successful', user });
});

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(400).json({ message: 'Username already exists' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Add this
const bcrypt = require('bcryptjs'); // Add this for password hashing

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // 1. Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Verify password (using bcrypt)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your_fallback_secret', // Always have a fallback for development
      { expiresIn: '1h' }
    );

    // 4. Return token and minimal user info
    res.json({ 
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// Register (updated with password hashing)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // 1. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 2. Create user
    const user = new User({ 
      username, 
      password: hashedPassword // Store hashed password
    });
    
    await user.save();
    
    // 3. Generate token for immediate login
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your_fallback_secret',
      { expiresIn: '1h' }
    );

    res.status(201).json({ 
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });
    
  } catch (err) {
    res.status(400).json({ 
      message: 'Registration failed',
      error: err.message
    });
  }
});



module.exports = router;
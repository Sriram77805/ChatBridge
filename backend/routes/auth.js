const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    user = new User({ username, password: hashed, lastSeen: new Date(), isOnline: true });
    await user.save();
    const payload = { user: { id: user._id, username: user.username } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, avatar: user.avatar, lastSeen: user.lastSeen } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});


// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    // Update last seen and online status
    user.lastSeen = new Date();
    user.isOnline = true;
    await user.save();
    const payload = { user: { id: user._id, username: user.username } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, avatar: user.avatar, lastSeen: user.lastSeen } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});


// Get all users
router.get('/users', auth, async (req, res) => {
try {
const users = await User.find().select('-password');
res.json(users);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


// Optional: endpoint to get current user
router.get('/me', auth, async (req, res) => {
try {
const user = await User.findById(req.user.id).select('-password');
res.json(user);
} catch (err) {
res.status(500).send('Server error');
}
});


module.exports = router;
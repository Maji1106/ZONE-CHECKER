// controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const secret = 'your_jwt_secret';

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });
};

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = await User.create({ username, password: hashedPassword });
    const token = generateToken(user);
    res.status(200).json({ auth: true, token });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).json({ auth: false, token: null });

    const token = generateToken(user);
    res.status(200).json({ auth: true, token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

module.exports = { register, login };

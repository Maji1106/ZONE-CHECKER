const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const User = require('../models/user.model');
const Role = require('../models/role.model'); // ถ้ามี Role model
const config = require('../config/auth.config');

const secret = config.secret || 'your_jwt_secret';

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });
};

// Register a new user
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).send({ message: "Please provide all required fields" });
    return;
  }

  // Prepare user data
  const newUser = {
    username,
    email,
    password: bcrypt.hashSync(password, 8),
  };

  try {
    const user = await User.create(newUser);
    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });
      await user.setRoles(roles);
      res.send({ message: "User registered successfully!" });
    } else {
      await user.setRoles([1]);
      res.send({ message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong while registering a new user." });
  }
};

// Login user
exports.signin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ message: "Please provide username and password" });
    return;
  }

  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 }); // 1 day
    const authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong while signing in." });
  }
};

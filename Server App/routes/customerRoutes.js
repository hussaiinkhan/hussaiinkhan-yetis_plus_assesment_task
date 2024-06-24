const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler= require('express-async-handler')
const validator = require('validator');
const Customer = require('../models/customerModel');
const Ad = require('../models/adModel');
const authMiddleware = require('../middlewares/authHandler');
const config = require('../config/config');

const router = express.Router();

// Register customer
router.post('/register', asyncHandler(async (req, res) => {
  const { name, surname, budget, phone, password } = req.body;

  // Validate phone number
  if (!validator.isMobilePhone(phone, 'any')) {
    return res.status(400).json({ msg: 'Invalid phone number' });
  }

  try {
    let customer = await Customer.findOne({ phone });
    if (customer) {
      return res.status(400).json({ msg: 'Customer already exists' });
    }
    customer = new Customer({ name, surname, budget, phone, password });
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(password, salt);
    await customer.save();
    res.send('Customer registered');
  } catch (err) {
    res.status(500).send('Server error');
  }
}));

// Login customer
router.post('/login', asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  try {
    let customer = await Customer.findOne({ phone });
    if (!customer) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = { customer: { id: customer.id } };
    jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
}));

// Middleware to protect routes
router.use(authMiddleware);

// List ads with filtering and sorting
router.get('/ads', asyncHandler(async (req, res) => {
  const { latitude, longitude, sort } = req.query;
  let filter = {};
  if (latitude && longitude) {
    filter = {
      'area.latitude': latitude,
      'area.longitude': longitude,
    };
  }
  try {
    let ads = await Ad.find(filter);
    if (sort) {
      ads = ads.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
    }
    res.json(ads);
  } catch (err) {
    res.status(500).send('Server error');
  }
}));

module.exports = router;

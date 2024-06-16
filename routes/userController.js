
const express = require("express");
const router = express.Router();
const User = require('../models/userModel');


app.get('/api/users/check-contact/:contact', async (req, res) => {
  const contact = req.params.contact;

  try {

    const existingUser = await User.findOne({ contact });


    const isUnique = !existingUser;

    
    res.json({ isUnique });
  } catch (error) {
    console.error('Error checking contact number uniqueness:', error);
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

const bcrypt = require('bcrypt');
const User = require('../models/user.model'); // Import your User model

async function signup(name, email, password) {
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw new Error('Email is already registered.');
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      // Add other relevant user information if needed
    });

    return newUser;
  } catch (error) {
    throw new Error('An error occurred during signup.');
  }
}

module.exports = {
  signup,
};

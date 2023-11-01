const mongoose = require('mongoose');
async function connect() {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/dashboard');

    console.log('Connected!');
  } catch (error) {
    console.log('Connecte failure!', error);
  }
}

module.exports = { connect };

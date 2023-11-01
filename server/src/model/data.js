const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  dateID: String,
  prodID: String,
  catID: String,
  fabID: String,
  magID: String,
});

module.exports = mongoose.model('Data', dataSchema);

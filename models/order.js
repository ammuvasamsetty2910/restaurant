const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  location: String,
  time: String,
  items: [String],
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

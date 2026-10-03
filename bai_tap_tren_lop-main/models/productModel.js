const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  promotion_price: {
    type: Number,
    min: 0,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  tag: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['new', 'top'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);

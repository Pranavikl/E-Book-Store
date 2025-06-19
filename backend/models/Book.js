const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  description: String,
  image: String,
  price: Number
});

module.exports = mongoose.model('Book', bookSchema);

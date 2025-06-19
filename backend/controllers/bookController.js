const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  const search = req.query.search || "";
  const books = await Book.find({
    title: { $regex: search, $options: 'i' }
  });
  res.json(books);
};

exports.addBook = async (req, res) => {
  const newBook = new Book(req.body);
  const savedBook = await newBook.save();
  res.json(savedBook);
};

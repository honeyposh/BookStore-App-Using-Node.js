const Book = require("../models/book");
exports.getIndex = (req, res, next) => {
  Book.find()
    .then((book) => {
      res.render("book/index", {
        pageTitle: "Books",
        path: "/",
        books: book,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getDetails = (req, res, next) => {
  const bookId = req.params.bookId;
  Book.findById(bookId)
    .then((book) => {
      res.render("book/detail", {
        pageTitle: "Details",
        path: "/",
        book: book,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

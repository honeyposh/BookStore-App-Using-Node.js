const Book = require("../models/book");
exports.getBooks = (req, res, next) => {
  Book.find()
    .then((book) => {
      res.render("admin/book", {
        pageTitle: "Books",
        path: "/admin/books",
        books: book,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getAddBook = (req, res, next) => {
  res.render("admin/add-book", {
    pageTitle: "Add-Book",
    path: "/admin/add-book",
    editing: false,
  });
};
exports.postAddBook = (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const year = req.body.year;
  const imgUrl = req.body.imgUrl;
  const description = req.body.description;
  const price = req.body.price;
  const book = new Book({
    title: title,
    author: author,
    year: year,
    imgUrl: imgUrl,
    description: description,
    price: price,
  });
  book
    .save()
    .then((result) => {
      // console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getEditBook = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }
  const bookId = req.params.bookId;
  Book.findById(bookId).then((book) => {
    if (!book) {
      res.redirect("/");
    }
    return res.render("admin/add-book", {
      pageTitle: "Add-Book",
      path: "/admin/add-book",
      editing: editMode,
      book: book,
    });
  });
};
exports.postEditBook = (req, res, next) => {
  const bookId = req.body.bookId;
  const updatedTitle = req.body.title;
  const updatedAuthor = req.body.author;
  const updatedYear = req.body.year;
  const updatedImgUrl = req.body.imgUrl;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;
  Book.findById(bookId)
    .then((book) => {
      book.title = updatedTitle;
      book.author = updatedAuthor;
      book.year = updatedYear;
      book.imgUrl = updatedImgUrl;
      book.description = updatedDescription;
      book.price = updatedPrice;
      return book.save();
    })
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

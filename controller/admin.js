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
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

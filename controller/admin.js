const User = require("../models/user");
const Book = require("../models/book");
const bcrypt = require("bcrypt");
require("dotenv").config();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});
exports.getBooks = (req, res, next) => {
  // console.log(req.user.isAdmin);
  // console.log(req.session.isLoggedIn);
  Book.find()
    .then((book) => {
      res.render("admin/book", {
        pageTitle: "Books",
        path: "/admin/books",
        books: book,
        isAuthenticated: req.session.isLoggedIn,
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
    isAuthenticated: req.session.isLoggedIn,
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
      isAuthenticated: req.session.isLoggedIn,
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
exports.getLogin = (req, res, next) => {
  res.render("admin/login", {
    pageTitle: "Login",
    path: "/admin/login",
    isAuthenticated: req.session.isLoggedIn,
  });
};
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/admin/signup");
      }
      bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save((err) => {
            res.redirect("/");
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getSignup = (req, res, next) => {
  res.render("admin/signup", {
    pageTitle: "Signup",
    path: "/admin/signup",
    isAuthenticated: req.session.isLoggedIn,
  });
};
exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/admin/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
          });
          return user.save();
        })
        .then((result) => {
          console.log(result);
          transporter
            .sendMail({
              to: email,
              from: "shop@nodecomplete.com",
              subject: "Signup succeded",
              html: "<h1>You succesfully signed up!!!</h1>",
            })
            .then((info) => {
              res.redirect("/admin/login");
            });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

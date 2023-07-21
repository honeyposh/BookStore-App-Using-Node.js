const express = require("express");
const route = express.Router();
const adminController = require("../controller/admin");
const adminLoggedIn = require("../middleware/isAuth");
route.get(
  "/admin/add-book",
  adminLoggedIn.isLoggedAdmin,
  adminController.getAddBook
);
route.get(
  "/admin/books",
  adminLoggedIn.isLoggedAdmin,
  adminController.getBooks
);
route.get(
  "/admin/edit/:bookId",
  adminLoggedIn.isLoggedAdmin,
  adminController.getEditBook
);
route.post(
  "/admin/add-book",
  adminLoggedIn.isLoggedAdmin,
  adminController.postAddBook
);
route.post(
  "/admin/edit-book",
  adminLoggedIn.isLoggedAdmin,
  adminController.postEditBook
);
route.get("/admin/login", adminController.getLogin);
route.get("/admin/signup", adminController.getSignup);
route.post("/admin/signup", adminController.postSignup);
route.post("/admin/login", adminController.postLogin);
route.get("/admin/logout", adminController.getLogOut);
module.exports = route;

const express = require("express");
const route = express.Router();
const adminController = require("../controller/admin");
route.get("/admin/add-book", adminController.getAddBook);
route.get("/admin/books", adminController.getBooks);
route.post("/admin/add-book", adminController.postAddBook);
route.get("/admin/edit/:bookId", adminController.getEditBook);
route.post("/admin/edit-book", adminController.postEditBook);
module.exports = route;

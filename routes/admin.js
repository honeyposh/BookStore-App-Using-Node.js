const express = require("express");
const route = express.Router();
const adminController = require("../controller/admin");
route.get("/admin/add-book", adminController.getAddBook);
route.get("/admin/books", adminController.getBooks);
route.post("/admin/add-book", adminController.postAddBook);
module.exports = route;

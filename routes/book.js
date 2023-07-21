const express = require("express");
const bookController = require("../controller/book");
const isAuth = require("../middleware/isAuth");
const route = express.Router();
route.get("/", bookController.getIndex);
route.get("/details/:bookId", isAuth.isLogged, bookController.getDetails);
module.exports = route;

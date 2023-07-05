const express = require("express");
const bookController = require("../controller/book");
const route = express.Router();
route.get("/", bookController.getIndex);
route.get("/details/:bookId", bookController.getDetails);
module.exports = route;

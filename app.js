const express = require("express");
const bodyParser = require("body-parser");
const bookRoute = require("./routes/book");
const adminRoute = require("./routes/admin");
const errorController = require("./controller/error");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(bookRoute);
app.use(adminRoute);
app.use(errorController.get404);
mongoose
  .connect(
    `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.gqajp9t.mongodb.net/bookStore?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected");
  })
  .then(() => {
    app.listen(3000);
    console.log("server is listening on port 3000");
  })
  .catch((err) => {
    console.log(err);
  });

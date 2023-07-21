const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bookRoute = require("./routes/book");
const adminRoute = require("./routes/admin");
const User = require("./models/user");
require("dotenv").config();
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const errorController = require("./controller/error");
const store = new MongoDbStore({
  uri: `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.gqajp9t.mongodb.net/bookStore?retryWrites=true&w=majority`,
  collection: "sessions",
});
const app = express();
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      // console.log(req.user);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "views");
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

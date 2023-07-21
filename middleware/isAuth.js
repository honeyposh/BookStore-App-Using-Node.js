exports.isLogged = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/admin/login");
  }
  next();
};
exports.isLoggedAdmin = (req, res, next) => {
  if (!(req.user.isAdmin && req.session.isLoggedIn)) {
    return res.redirect("/");
  }
  next();
};

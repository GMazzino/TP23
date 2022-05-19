export function webAuth(req, res, next) {
  if (req.session?.name) {
    next();
  } else {
    res.redirect("/login");
  }
}

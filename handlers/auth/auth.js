let name;

export function webAuth(req, res, next) {
  if (req.session?.name) {
    name = req.session.name;
    next();
  } else {
    res.redirect("/login");
  }
}
export { name };

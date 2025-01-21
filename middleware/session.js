const sessionCheck = (req, res, next) => {
  const noTokenIgnore = [
    "/dependencies/htmx.min.js",
    "/login/",
    "/register/",
    "/auth/login",
    "/auth/register",
    "/auth/session"
  ];

  const withTokenRedirect = ["/login/", "/register/"];

  console.log(withTokenRedirect.includes(req.path));
  console.log(req.session.token !== undefined);

  if (req.session.token !== undefined && withTokenRedirect.includes(req.path)) {
    res.redirect("/");
    return;
  }
  
  if (noTokenIgnore.includes(req.path)) {
    next();
    return;
  }

  if (req.session.token === undefined) {
    res.redirect("/login/");
    return;
  }

  next();
};

module.exports = sessionCheck;

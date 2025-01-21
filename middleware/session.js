const sessionCheck = (req, res, next) => {
  const noTokenIgnore = [
    "/dependencies/htmx.min.js",
    "/login/",
    "/register/",
    "/auth/login",
    "/auth/register",
    "/auth/session",
    "/auth/hash",
  ];

  const withTokenRedirect = ["/login/", "/register/"];

  console.log(withTokenRedirect.includes(req.path));
  console.log(req.session.token !== undefined);

  // Check if the user is logged in and at the login or register page
  // If so, redirect to the home page
  if (req.session.token !== undefined && withTokenRedirect.includes(req.path)) {
    res.redirect("/");
    return;
  }

  // Check if the user is on a page that ignores the token
  // If so, continue to the next middleware
  if (noTokenIgnore.includes(req.path)) {
    next();
    return;
  }

  // If the user is not logged in and not on the login or register page
  // Redirect to the login page
  if (
    req.session.token === undefined &&
    !withTokenRedirect.includes(req.path)
  ) {
    res.redirect("/login/");
    return;
  }

  next();
};

module.exports = sessionCheck;

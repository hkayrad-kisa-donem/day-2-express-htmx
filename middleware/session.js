const express = require("express");
const router = express.Router();

const authCheck = (req, res, next) => {
  const ignorePaths = [
    "/login",
    "/login/",
    "/dependencies/htmx.min.js",
    "/auth/session/set",
    "/auth/session/get",
    "/auth/session/destroy",
  ];

  /* if (ignorePaths.includes(req.path)) {
    return next();
  }

  if (!req.session.user) {
    return res.redirect("/login");
  } */

  next();
};

/* router.get("/auth/session/set", (req, res) => {
  req.session.user = { name: "admin" };
  req.session.save();
  res.send("Session set").redirect("/");
});

router.get("/auth/session/get", (req, res) => {
  const username = req.session.user.name;
  res.send(`username: ${username}`);
});

router.get("/auth/session/destroy", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error destroying session:", err);
    } else {
      res.send("Session destroyed");
    }
  });
}); */

module.exports = [authCheck, router];

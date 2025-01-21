const express = require("express");
const router = express.Router();
const sha256 = require("crypto-js/sha256");
const { randomUUID } = require("crypto");
const session = require("cookie-session");

const testCheckHash =
  "43008ab37824784377dd78a90f34657ef4bcafbdd5eaeff096e388c265373a98";

const testSessionToken = "267619ff-b986-489c-9d11-3d014c168c63";

router.post("/auth/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userHash = sha256(username).toString();
  console.log(`Registering user: ${randomUUID()}`);
  res.send("User registered");
});

router.post("/auth/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userHash = sha256(`${username}${password}`).toString();

  if (userHash !== testCheckHash) {
    res.send("Invalid username or password");
    return;
  }

  req.session.token = testSessionToken;
  
  res.send("User logged in");
});

router.get("/auth/session", (req, res) => {
  if (req.session.token !== undefined) {
    res.send(`${req.session.token}`);
    return;
  }
  res.send("No session token");
});

router.get("/auth/logout", (req, res) => {
  req.session.token = undefined;
  res.send("User logged out");
});

module.exports = router;

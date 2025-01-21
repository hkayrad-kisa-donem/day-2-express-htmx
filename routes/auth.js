const express = require("express");
const router = express.Router();
const sha256 = require("crypto-js/sha256");

router.post("/auth/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(`Registering user: ${username} with password: ${password}`);
  const userHash = sha256(username, password).toString();
  console.log(`User hash: ${userHash}`);
  res.send("User registered");
});

router.post("/auth/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(`Logging in user: ${username} with password: ${password}`);
  const userHash = sha256(username, password).toString();
  console.log(`User hash: ${userHash}`);
  res.send("User logged in");
});

module.exports = router;

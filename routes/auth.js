const express = require("express");
const router = express.Router();
const sha256 = require("crypto-js/sha256");
const { randomUUID } = require("crypto");

const dataStore = function () {
  var userHashList = [
    {
      username: 'hkayrad',
      hash: 'abd108d978ac7e811949942a7353190c1ec5e4d061440d1ce3bb2f79a7da44a3',
    },
  ];

  return {
    hashUser: (username, password) => {
      const userHash = sha256(`${username}${password}`).toString();
      return userHash;
    },

    checkUser: (username, password) => {
      const userHash = sha256(`${username}${password}`).toString();
      console.log({username: username, hash: userHash});
      //? Array.prototype.include doesn't work on objects, need to use Array.prototype.some
      //? to check if the object is in the array.
      return userHashList.some((user) => user.hash === userHash);
    },

    addUser: (username, password) => {
      const userHash = sha256(`${username}${password}`).toString();
      const user = { username: username, hash: userHash };
      const isUserAlreadyRegistered = userData.checkUser(username, password);
      if (isUserAlreadyRegistered) {
        return false;
      }

      userHashList.push(user);
      return true;
    },

    getUser: (username, password) => {
      const userHash = sha256(`${username}${password}`).toString();
      return userHashList.find((user) => user.hash === userHash);
    },

    getUsers: () => {
      return userHashList;
    }
  };
};

const userData = dataStore();

router.post("/auth/hash", (req, res) => {
  const { username, password } = req.body;
  const userHash = userData.hashUser(username, password);
  res.send(userHash);
});

router.post("/auth/register", (req, res) => {
  const { username, password } = req.body;
  const isUserAdded = userData.addUser(username, password);
  if (isUserAdded) {
    res.send("User registered");
    return;
  }
  res.send("User already registered");
});

router.post("/auth/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const isUserValid = userData.checkUser(username, password);
  console.log(isUserValid);
  if (isUserValid) {
    const token = randomUUID();
    req.session.token = token;
    res.send(token);
    return;
  }
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

//? FOR DEBUGGING PURPOSES
router.get("/auth/users", (req, res) => {
  const usersList = userData.getUsers();
  var usersTable = "<table><tr><th>Username</th><th>Hash</th></tr>";
  usersList.forEach((user) => {
    usersTable += `<tr>
                    <td>${user.username}</td>
                    <td>${user.hash}</td>
                  </tr>`;
  });
  usersTable += "</table>";

  res.status(200).send(usersTable);
});


module.exports = router;

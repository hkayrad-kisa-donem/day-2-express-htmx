const express = require("express");
const router = express.Router();

const defaultUsers = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Doe" },
  { id: 4, name: "Alice" },
  { id: 5, name: "Bob" },
  { id: 6, name: "Charlie" },
  { id: 7, name: "David" },
  { id: 8, name: "Eve" },
  { id: 9, name: "Frank" },
  { id: 10, name: "Grace" },
];

const dataStore = function () {
  var users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Doe" },
    { id: 4, name: "Alice" },
    { id: 5, name: "Bob" },
    { id: 6, name: "Charlie" },
    { id: 7, name: "David" },
    { id: 8, name: "Eve" },
    { id: 9, name: "Frank" },
    { id: 10, name: "Grace" },
  ];

  return {
    restoreUsers: () => {
      users = defaultUsers;
    },

    getUsers: () => {
      return users;
    },

    deleteUser: (userId) => {
      if (!userId) {
        throw new Error("Invalid user ID");
      }

      users = users.filter((user) => user.id !== userId);
      return userId;
    },
  };
};

const data = dataStore();

router.get("/api/v1/users/restore", (req, res) => {
  data.restoreUsers();
  console.log("Users restored");
  res.sendStatus(200);
});

router.get("/api/v1/users", (req, res) => {
  var usersTable = "<table><tr><th>ID</th><th>Name</th></tr>";
  data.getUsers().forEach((user) => {
    usersTable += `<tr hx-target='next #status' hx-delete='/api/v1/users/${user.id}/delete'><td>${user.id}</td><td>${user.name}</td></tr>`;
  });
  usersTable += "</table><span id='status'></span>";

  res.status(200).send(usersTable);
});

router.delete("/api/v1/users/:id/delete", (req, res) => {
  const userId = req.params.id;
  const deletedUserId = data.deleteUser(parseInt(userId));
  res.status(200).send(`User ${deletedUserId} deleted`);
});

module.exports = router;

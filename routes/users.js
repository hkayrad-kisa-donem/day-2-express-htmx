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
      //TODO
    },

    getUsers: () => {
      return users;
    },

    getUsersTable: () => {
      var usersTable = "<table><tr><th>ID</th><th>Name</th><th> </th></tr>";
      users.forEach((user) => {
        usersTable += `<tr>
                        <td hx-target='next #status' hx-delete='/api/v1/users/${user.id}'>${user.id}</td>
                        <td>${user.name}</td>
                        <td hx-get='/api/v1/users/${user.id}/edit' hx-target='#users'>Edit</td>
                      </tr>`;
      });
      usersTable += "</table><span id='status'></span>";
      return usersTable;
    },

    deleteUser: (userId) => {
      if (!userId) {
        throw new Error("Invalid user ID");
      }

      users = users.filter((user) => user.id !== userId);
      return userId;
    },

    updateUser: (userId, name) => {
      if (!userId) {
        throw new Error("Invalid user ID");
      }

      const user = users.find((user) => user.id === userId);
      user.name = name;
      return user;
    },
  };
};

const data = dataStore();

router.get("/api/v1/users/restore", (req, res) => {
  res.send("Not implemented");
});

router.get("/api/v1/users", (req, res) => {
  var usersTable = data.getUsersTable();
  console.log(data.getUsers());
  res.status(200).send(usersTable);
});

router.delete("/api/v1/users/:id", (req, res) => {
  const userId = req.params.id;
  const deletedUserId = data.deleteUser(parseInt(userId));
  res.status(200).send(`User ${deletedUserId} deleted`);
});

router.get("/api/v1/users/:id/edit", (req, res) => {
  const userId = req.params.id;
  const user = data.getUsers().find((user) => user.id === parseInt(userId));
  res.send(
    `<form hx-put='/api/v1/users/${user.id}' id='editForm'>
      <output>${user.id}</output>
      <input type='text' name='name' value='${user.name}' />
      <button hx-put='/api/v1/users/${user.id}' hx-target='#editForm'>Update</button>
    </form>`
  );
});

router.put("/api/v1/users/:id", (req, res) => {
  const userId = req.params.id;
  const name = req.body.name;
  data.updateUser(parseInt(userId), name);
  const updatedUsersTable = data.getUsersTable();
  res.send(updatedUsersTable);
});

module.exports = router;

const express = require("express");
const session = require("express-session");
const helmet = require("helmet");

const app = express();

app.use(
  session({
    secret: "testSecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./middleware/whitelist"));
app.use(helmet());

app.use(require("./routes/auth"));
app.use(require("./routes/users"));
app.use(require("./routes/posts"));

app.use("/", express.static("public"));

app.listen(80, () => {
  console.log("Server is running on http://localhost:80");
});

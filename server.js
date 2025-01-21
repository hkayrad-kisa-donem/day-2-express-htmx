const express = require("express");
const session = require("cookie-session");
const helmet = require("helmet");

const app = express();

app.use(
  session({
    name: "session",
    keys: ["key1"],
    sameSite: "lax",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./middleware/session"));
app.use(require("./middleware/whitelist"));
app.use(helmet());

app.use(require("./routes/auth"));
app.use(require("./routes/users"));
app.use(require("./routes/posts"));

app.use("/", express.static("public"));

app.listen(80, () => {
  console.log("Server is running on http://localhost:80");
});

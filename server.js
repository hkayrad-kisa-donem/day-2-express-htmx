const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(require("./middleware/whitelist"));
app.use(helmet());
app.use(require("./routes/users"));
app.use(require("./routes/posts"));

app.use('/', express.static("public"));

app.listen(80, () => {
  console.log("Server is running on http://localhost:80");
});

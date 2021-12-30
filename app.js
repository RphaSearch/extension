const express = require("express");
const path = require("path");
var submitRouter = require('./routes/submit');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "build")));
app.use('/submit', submitRouter);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
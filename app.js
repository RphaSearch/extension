require("dotenv").config();

const express = require("express");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.send("connected");
});

app.post("/api/v1/answer", (req, res) => {
  const { context, prev_qa, question } = req.body;

  const payload = {
    conext: context,
    prev_qa: prev_qa,
    question: question,
  };

  axios
    .post(`http://${process.env.ML_HOST}/answer`, payload)
    .then((response) => {
      const { answer } = response.data;
      res.json({ answer: answer });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

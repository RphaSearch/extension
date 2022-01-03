require("dotenv").config();

const express = require("express");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// /api/v1/context?q=query
app.get("/api/v1/context", (req, res) => {
  const query = req.query.q;

  let url = "https://en.wikipedia.org/w/api.php?";

  let params = {
    action: "query",
    list: "search",
    srsearch: query,
    srwhat: "text",
    srlimit: "1",
    format: "json",
  };

  url = url + "?origin=*";
  Object.keys(params).forEach((key) => {
    url += "&" + key + "=" + params[key];
  });

  axios
    .get(url)
    .then((response) => {
      response = response.data;

      url =
        "https://en.wikipedia.org/w/api.php?" +
        new URLSearchParams({
          origin: "*",
          action: "parse",
          page: `${response.query.search[0].title}`,
          format: "json",
        });

      axios
        .get(url)
        .then((response) => {
          const html = response.data.parse.text["*"];
          const $ = cheerio.load(html);
          res.json({ context: $("p").text() });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
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
  console.log(`Example app listening at http://localhost:${port}`);
});

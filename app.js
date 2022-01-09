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
  res.send("connected");
});

const url = "https://en.wikipedia.org/w/api.php?";

// /api/v1/context?q=query
app.get("/api/v1/context", (req, res) => {
  const query = req.query.q;

  const searchParams = new URLSearchParams({
    origin: "*",
    action: "query",
    list: "search",
    srsearch: query,
    srwhat: "text",
    srlimit: "1",
    format: "json",
  });

  axios
    .get(url + searchParams)
    .then((response) => {
      response = response.data;

      axios
        .get(
          "https://en.wikipedia.org/w/api.php?" +
            new URLSearchParams({
              origin: "*",
              action: "parse",
              page: `${response.query.search[0].title}`,
              format: "json",
            })
        )
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

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at https://rphasearch.herokuapp.com/`);
});

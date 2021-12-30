var express = require('express');
var router = express.Router();

const axios = require("axios");

router.get('/', function(req,res){
    res.render("index",  {title: 'React App'});
});

router.post('/', function(req,res) {
    var contexts = req.body.contexts;
    var question = req.body.question;
    var prev_qa = req.body.prev_qa;

    axios
      .post("/predict", {
        context: contexts,
        question: question,
        prev_qa: prev_qa
      })
      .then(function (response) {
        res.send(response);
      })
      .catch(function (error) {
        console.log(error);
      });
});

module.exports = router;
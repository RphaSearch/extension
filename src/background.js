/* global chrome */
let context;
let prevQA = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "context": {
      context = request.context;
      prevQA = [];
      break;
    }

    case "getPrevQA": {
      sendResponse({ prevQA });
      break;
    }

    case "answer": {
      const question = request.question;
      prevQA.push(question);

      const url = `https://rphasearch.herokuapp.com/api/v1/answer`;
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context: context,
          prev_qa: prevQA,
          question: question,
        }),
      };

      let answer;
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          answer = data.answer;
          prevQA.push(answer);

          sendResponse({ answer });
        })
        .catch((error) => console.log(error));
      return true;
    }

    default: {
      console.log({ message: "something's wrong", request: request });
      break;
    }
  }
});

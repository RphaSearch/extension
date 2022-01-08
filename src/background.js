/* global chrome */
let context;
let prevQA = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "context":
      context = request.context;
      prevQA = [];
      console.log({ context, prevQA });
      break;

    case "getPrevQA":
      sendResponse({ prevQA });
      break;

    case "answer":
      const question = request.question;

      const url = `http://${process.env.ML_HOST}/answer`;
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

      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          let answer = data.answer;
          prevQA.push(question);
          prevQA.push(answer);

          port.postMessage({ answer });
        })
        .catch((error) => console.log(error));
      break;

    default:
      console.log({ message: "something's wrong", response: response });
      break;
  }
});

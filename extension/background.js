//TODO: store context and prevQA in background
// access using messages
let context;
let prevQA = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  context = request.context;
  prevQA = [];
  console.log({ context, prevQA });
});

chrome.runtime.onConnect.addListener((port) => {
  port.postMessage({ prevQA });

  port.onMessage.addListener((msg) => {
    const question = msg.question;

    const url = "http://localhost:5000/answer";
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
  });
});

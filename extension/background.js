//TODO: store context and prevQA in background
// access using messages
let context;
let prevQA = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  context = request.context;
});

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "question")
    port.onMessage.addListener((msg) => {
      const question = msg.question;

      const url = "http://192.168.35.183:5000/answer";
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
          // TODO: print answer to chat box
          console.log(answer);
          port.postMessage({ answer });
          prevQA.push(question);
          prevQA.push(answer);
        })
        .catch((error) => console.log(error));
    });
});

/*
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      chrome.runtime.sendMessage({ context: $("p").text() });
    },
  });
});
*/

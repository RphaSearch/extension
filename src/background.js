/* global chrome */
let context;
let prevQA = [];
let popupQA = [];
let count = 1;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "context": {
      context = request.context;
      prevQA = [];
      popupQA = [];
      break;
    }

    case "getPrevQA": {
      sendResponse({ popupQA });
      break;
    }

    case "answer": {
      count = count+1;
      const question = request.question;
      prevQA.push(question);
      popupQA=[...popupQA,{message:question,count:`-${count}`,type:'q'}]

      popupQA.map((qa)=>(console.log(`message:${qa.message}, count:${qa.count}, type:${qa.type}`)));
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
      let answer;
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          answer = data.answer;
          prevQA.push(answer);
          popupQA=[...popupQA,{message:data.answer,count:`-${count}`,type:'a'}]
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

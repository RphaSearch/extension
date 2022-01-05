function addChat(msg, className) {
  const newDiv = document.createElement("div");
  const newP = document.createElement("p");
  const newContent = document.createTextNode(msg);
  newDiv.className = className;
  newP.appendChild(newContent);
  newDiv.appendChild(newP);

  const currentDiv = document.getElementsByClassName("input-container")[0];
  document.body.insertBefore(newDiv, currentDiv);
}

function addQuestion(msg) {
  addChat(msg, "container");
}

function addAnswer(msg) {
  addChat(msg, "container darker");
}

const port = chrome.runtime.connect({ name: "question" });

let prevQA;
port.onMessage.addListener((msg) => {
  if (msg.prevQA) {
    prevQA = msg.prevQA || [];

    let question = true;
    for (let chat of prevQA) {
      if (question) {
        addQuestion(chat);
      } else {
        addAnswer(chat);
      }
      question = !question;
    }
  }

  if (msg.answer) {
    addAnswer(msg.answer);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // load previous quesitons and answers

  const button = document.getElementById("send");
  const input = document.getElementById("input");

  // send question to background.js
  button.addEventListener("click", () => {
    const question = input.value;
    // if input is not empty
    if (question) {
      port.postMessage({ question });
      addQuestion(question);
    }
  });

  // click button when enter is pressed
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      button.click();
    }
  });
});

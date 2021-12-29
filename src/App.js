import "./App.css";

const axios = require("axios");

function App() {
  function submitButton_click() {
    let context = document.getElementById("#context");
    let question = document.getElementById("#question");
    let answer = document.getElementById("#answer");

    axios
      .post("/submit", {
        context: context.value,
        question: question.value,
      })
      .then(function (response) {
        answer.value = response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <label for="context">CONTEXT PARAGRAPH</label>
        <textarea id="context" name="contexts" rows="5" cols="33"></textarea>
        <label for="question">QUESTION</label>
        <textarea id="question" name="question" rows="3" cols="33"></textarea>
        <label for="answer">ANSWER</label>
        <textarea id="answer" name="answer" rows="3" cols="33"></textarea>
        <button id="submitButton" onclick={submitButton_click}>
          Submit
        </button>
      </header>
    </div>
  );
}

export default App;

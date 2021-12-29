import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>

      <label for="contexts">CONTEXT PARAGRAPH</label>
      <textarea id="contexts" name="contexts" rows="5" cols="33"></textarea>

      <label for="question">QUESTION</label>
      <textarea id="question" name="question" rows="3" cols="33"></textarea>
    
      <label for="answer">ANSWER</label>
      <textarea id="answer" name="answer" rows="3" cols="33"></textarea>

      <button id="submitButton" onclick="submitButton_click();">Submit</button>

      <script>
        /*왜 오류가 날까요;ㅅ;*/
        function submitButton_click() {
          let contextsValue = document.getElementById('#contexts');
          let questionValue = document.getElementById('#question');
          let answerValue = document.getElementById('#answer');

          axios.post('/submit', {
            context: contextsValue.value,
            question: question.value,
          })
          .then(function (response) {
            answer.value = response;
          })
          .catch(function (error) {
            console.log(error);
          })
        }
      </script>
    </div>
  );
}

export default App;
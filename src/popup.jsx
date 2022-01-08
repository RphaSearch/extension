/* global chrome */
import { useEffect, useRef, useState } from "react";
import React from "react";
import { render } from "react-dom";

function App() {
  const [history, setHistory] = useState([]);

  const message = useRef();

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "getPrevQA" }, (reponse) => {
      setHistory(reponse.prevQA);
    });
  }, []);

  function addHistory(event) {
    event.preventDefault();
    setHistory((prevHistory) => [...prevHistory, message.current.value]);
  }

  return (
    <div>
      <div>
        {history.map((msg) => (
          <div key={msg}>{msg}</div>
        ))}
      </div>

      <form onSubmit={addHistory}>
        <input type="text" ref={message} />
        <input type="submit" value="ask" />
      </form>
    </div>
  );
}

render(<App />, document.getElementById("root"));

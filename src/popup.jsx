/* global chrome */
import { useEffect, useRef, useState } from "react";
import React from "react";
import { render } from "react-dom";
import Chat from "./components/Chat.jsx";
import Standby from "./components/Standby.jsx";

function App() {
  const [history, setHistory] = useState([]);
  const message = useRef();
  const [count, setCount] = useState(0);
  const [standby, setStandby] = useState(false);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "getPrevQA" }, (reponse) => {
      setHistory(reponse.popupQA);
    });
  }, []);

  function addHistory(event) {
    if (standby === false) {
      setStandby(true);
      const messagevalue = message.current.value;
      message.current.value = "";
      event.preventDefault();
      setHistory((prevHistory) => [
        ...prevHistory,
        { message: messagevalue, count: count, type: "q" },
      ]);
      setCount((precount) => precount + 1);

      chrome.runtime.sendMessage(
        { type: "answer", question: messagevalue },
        (response) => {
          setHistory((prevHistory) => {
            return [
              ...prevHistory,
              { message: response.answer, count: count, type: "a" },
            ];
          });
          setStandby(false);
        }
      );
    }
  }

  return (
    <div>
      {" "}
      <img src="logo.png" />
      <div>
        {history.map((hst) => (
          <div key={`${hst.count}${hst.type}`}>
            <Chat msg={hst.message} qa={hst.type} />
          </div>
        ))}
        {standby === true ? <Standby /> : <></>}
      </div>
      <form
        onSubmit={standby ? () => {} : addHistory}
        style={{ width: "100%", height: "25px" }}
      >
        <input
          type="text"
          ref={message}
          style={{ width: "85%", height: "100%" }}
        />
        <input
          type="submit"
          value=""
          style={{
            width: "35px",
            height: "35px",
            background: "url(search.png) no-repeat",
            backgroundSize: "30px 30px",
            transform: "translate(0px,13px)",
          }}
        />
      </form>
    </div>
  );
}

render(<App />, document.getElementById("root"));

/* global chrome */
import { useEffect, useRef, useState } from "react";
import React from "react";
import { render } from "react-dom";
import Chat from "./components/Chat"
function App() {
  const [history, setHistory] = useState([]);
  const message = useRef();
  const [count, setCount] = useState(0);
  const [wating,setWating] = useState(false);
  useEffect(() => {
    chrome.runtime.sendMessage({ type: "getPrevQA" }, (reponse) => {
      setHistory(reponse.popupQA);
    });
  }, []);

  function addHistory(event) {
    if(wating===false)
    {
        setWating(true)
    const messagevalue = message.current.value;
    message.current.value= "";
    event.preventDefault();
    setHistory((prevHistory) => [...prevHistory, {message:messagevalue, count: count,type:'q'} ]);
    setCount((precount)=>(precount+1))
    
    chrome.runtime.sendMessage(
      { type: "answer", question: messagevalue },
      (response) => {
          setHistory((prevHistory) => {return ([...prevHistory, {message:response.answer, count:count,type:'a'}])});
          setWating(false);
      }
    );
    }
  }
  return (
    <div> <img src="title3.png" />
      <div>{history.map((hst) => (
          <div key={`${hst.count}${hst.type}`}><Chat msg={hst.message} qa={hst.type}/></div>
          ))}
          {wating===true?<div>wating...</div>:<></>}
      </div>
      
      <form onSubmit={addHistory}>
        <input type="text" ref={message} />
        <input type="submit" value="ask" />
      </form>
      <div>질문갯수: {history.length}</div>
    </div>
  );
}

render(<App />, document.getElementById("root"));

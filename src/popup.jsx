/* global chrome */
import { useEffect, useRef, useState } from "react";
import React from "react";
import { render } from "react-dom";
import Chat from   "./components/Chat";
import Wating from "./components/Wating";
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
          {wating===true?<Wating/>:<></>}
      </div>
      
      <form onSubmit={wating?()=>{}:addHistory} style={{width:'100%', height:'25px'}}>
        <input type="text" ref={message} style={{width:'85%',height:'100%'}} />
        <input type="submit" value=""style={{width: '35px',height:'35px',background:"url(search.png) no-repeat",backgroundSize:"30px 30px",transform:"translate(0px,13px)"}} />
      </form>
      <div style={{paddingTop:"20px"}}>질문갯수: {count}</div>
    </div>
  );
}

render(<App />, document.getElementById("root"));

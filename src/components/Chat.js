import React from "react";
export default function Chat(props) {
  return props.qa==='q'?<div style={{color:'red'}}>{props.msg}</div>:
  <div style={{color:'blue'}}>{props.msg}</div>;
}

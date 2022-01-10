import React from "react";
export default function Chat(props) {
  return props.qa==='q'?
  <div style={{padding:'5px'}}><div style={{color:'#2D3738',fontSize:20,backgroundColor:'#E5E2CD',borderRadius :'5px',padding:'4px'}}>{props.msg}</div></div>
    :
  <dlv style={{padding:'5px'}}><div style={{color:'#E5E2CD',fontSize:20,backgroundColor:'#5E5D55',borderRadius :'5px',padding:'4px'}}>{props.msg}</div></dlv>;
}

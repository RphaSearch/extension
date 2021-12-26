import { useRef, useState , useEffect } from 'react'
import {FaSearch} from 'react-icons/fa'
import Content from './Content';
import Message from './Message'
export default function SearchBar()
{
    const [query,setQuery] = useState([]);
    const [message,setMessage] = useState([]);
    const [content,setContent] = useState([]);
    const searchRef = useRef();
    function Condition(query){
        var array = query.split('+');
        if (array.length<5){return "query"+array.length +": "+ array[array.length -1]+"  "+ (5-array.length )+"개의 질문이 더 필요합니다.";}
        else {return "pass"}
    }
    function Dummy(){
        var array = ""
        for(let i = 0 ; i<1000;i++)
        {
            array= array+"더미데이터:" +i;
        }
        return array;
    }
    function Request(query){
        setQuery([])
        setMessage([])
        setContent(Dummy)
    }
    useEffect(()=>{
        if(query.length>0)
        {
            var res = Condition(Serialization(query))
            console.log(res)
            if (res == "pass")
            {
                Request(Serialization(query));
            }
            else
            {
                AddState(message,setMessage,res);
            }
        }
    },[query]);

    function AddState(state,setfunction,value){
        setfunction(state =>[...state,value])
    }
    function Search()
    {
        let value = searchRef.current.value;
        if (value !="")
        {
            setContent(false)
            AddState(query,setQuery,value);
            searchRef.current.value = "";
            
        }
    }
    function Serialization(array)
    {
        var result = ""
        for(let i = 0; i<array.length;i++)
        {
            if (result==="")
            {
                result = array[i]
            }
            else
            {
                result = result +"+"+ array[i];
            }
        }
        return result;
    }
    return(
        <>
        <div style={{padding:50}}>
            <div className="input-group">
      <input type="text" className="form-control" placeholder="Search for..." ref={searchRef}/>
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={Search}
          style={{background:'#BBDDFF', color:'blue'}}>
        <FaSearch/>
          </button>
        </span>
        </div>
        </div>

        {   (message.map(message=>(
            <Message text={message} key={message.split(":")[0]}/>)
        ))}
        <Content text={content}/>
        </>
    );
}
import { useRef } from 'react'
import {FaSearch} from 'react-icons/fa'
import {connect} from 'react-redux'
import {Question , Answer,Focus,Blur,Htmlupdate,Slice}
from '../modules/search'
function SearchBar(props)
{
    const searchRef = useRef();
    const onCheckEnter =(e)=>{
    if(e.key ==='Enter'){
    Search()
    }}
        function Search()
        {
            let value = searchRef.current.value;
            if (value !=="")
            {
                props.onQuestion(value);
                searchRef.current.value = "";
            }
        }
    return(
        <>
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..." 
                ref={searchRef} onFocus={ props.onFocus } onBlur={props.onBlur} onKeyPress={onCheckEnter}/>
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" 
          onClick={Search} 
          style={{ color:'white',backgroundColor:'blue'
          }} >
                <FaSearch/>
          </button>
        </span>
        </div>
        </>
    );
}
const mapStateToProps = (state)=>{
    return (state.search)
}
const mapDispatchToProps =(dispatch)=>{
    return {
        onQuestion: (query)=>dispatch(Question(query)),
        onAnswer: (query)=>dispatch(Answer(query)),
        onFocus: ()=>dispatch(Focus()),
        onBlur:()=>dispatch(Blur()),
        onHtmlupdate:(html)=>dispatch(Htmlupdate(html)),
        onSlice:(frontword,word,backword)=>dispatch(Slice(frontword,word,backword))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchBar);
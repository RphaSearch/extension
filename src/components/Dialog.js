
import {connect} from 'react-redux'
import DialogText from './DialogText'
function Dialog(props)
{
    return (
        <>
        {props.focus&&<div className="Dialog">
            {props.query.map((query)=>(<DialogText 
            key={query.key} text={query.text} type={query.type}/>))}
        </div>
}
        </>
            
    )
}

const mapStateToProps = (state)=>{
    return {query:state.search.query,
            focus:state.search.focus}
}
export default connect(mapStateToProps)(Dialog);
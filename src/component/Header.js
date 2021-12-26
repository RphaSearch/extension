import { GiAtom } from "react-icons/gi";
export default function Header()
{
    return(
        
    <div className="page-header" style = {{
        background: '#99CCFF', padding:20
        }}>
        <h1  style={{color : 'white'}}> <GiAtom style={{color:"blue"}}/>ALPAH SEARCH </h1>
    </div>
    );
}
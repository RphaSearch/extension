const QUESTION    = 'search/QUESTION'
const ANSWER      = 'search/ANSWER'
const REMOVEQUERY = 'search/REMOVEQUERY'
const HTMLUPDATE  = 'search/HTMLUPDATE'
const SLICE       = 'search/SLICE'
const FOCUS       = 'search/FOCUS'
const BLUR        = 'search/BLUR'
export const Question    = (query) => ({type:QUESTION,query})
export const Answer      = (query) => ({type:ANSWER,query})
export const Removequery = ()      => ({type:REMOVEQUERY})
export const Htmlupdate    = (html)  => ({type:HTMLUPDATE,html})
export const Slice       = (frontword,word,backword) => ({type:SLICE,
    frontword:frontword,word:word,backword:backword})
export const Focus = () => ({ type:FOCUS })
export const Blur  = () => ({ type:BLUR  })
const initailState = {
    query:[],
    answer:[],
    question:[],
    html: null,
    slice :{frontword:"",
            word:"",
            backword:""},
    focus:false
}
export default function search(state=initailState,action){
    switch (action.type){
        case QUESTION:
            var key = state['query'].length
            return{
                ...state,
                query: [{key:key,text:action.query,type:'Q'},...state['query']],
                question:[action.query,...state['question']]
            }
        case ANSWER:
            var key = state['query'].length
            return{
                ...state,
                query: [{key:key,text:action.query,type:'A'},...state['query']],
                answer:[action.query,...state['answer']]
            }
        case REMOVEQUERY:
            return{
                ...state,
                query:[],
                answer:[],
                question:[],
            }
        case HTMLUPDATE:
            return {
                ...state,
                html: action['html']
            }
        case SLICE:
            return{
                ...state,
                slice :{
                    frontword:action['frontword'],
                    word:action['word'],
                    backword:action['backword']
                }
            }
        case FOCUS:
            return{
                ...state,
                focus:true
            }
        case BLUR:
            return{
                ...state,
                focus:false
            }
        default: return (state)
    }  
}
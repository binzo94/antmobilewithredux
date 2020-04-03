import * as BACKLOG from '../constants/backlogType.js';
import * as PATH from '../config/path.js';
import {fetchAsyncPost,fetchAsyncGet,fetchAsyncPostNoCore} from  '../fetch/fetchAsync.js';
import {hashHistory} from 'react-router';
function backlogRequest(){
    return {
        type:BACKLOG.BACKLOG_REQUEST,
        isFetching:true
    }
}

function backlogSuccess(data){
    return {
        type:BACKLOG.BACKLOG_SUCCESS,
        isFetching:false,
        data
    }
}
export function backlogNofetch(){
    return {
        type:BACKLOG.BACKLOG_NOFETCH,
        isFetching:false,
    }
}
export function getBacklog(){
    return (dispatch)=>{
        dispatch(backlogRequest());
        //PATH.BASEURL+'api/getLeaderActvByTime.do'
        return fetchAsyncGet(PATH.BASEPATH+'getMatters.do','processType=-1&matterType=-1').then(res=>{
            if(res.status===200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(
            json=>{

                dispatch(backlogSuccess(JSON.parse(json)));
            })
    }
}

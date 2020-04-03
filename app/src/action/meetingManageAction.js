import * as MEETINGMANAGE from '../constants/meetingManageType.js';
import * as PATH from '../config/path.js';
import {hashHistory} from 'react-router';
import {fetchAsyncPost,fetchAsyncGet,fetchAsyncPostNoCore} from  '../fetch/fetchAsync.js';
//会议安排
function meetingArrangeRequest(){
    return {
        type:MEETINGMANAGE.MEETINGARRANGE_REQUEST,
        isFetching:true
    }
}

function meetingArrangeSuccess(data,isquery){
    return {
        type:MEETINGMANAGE.MEETINGARRANGE_SUCCESS,
        isFetching:false,
        data,
        isquery
    }
}
export function meetingArrangeHasmore(){
    return {
        type:MEETINGMANAGE.MEETINGARRANGE_HASMORE,
        nomore:false,
    }
}
function meetingArrangeIsloading(){
    return {
        type:MEETINGMANAGE.MEETINGARRANGE_ISLOADING,
        isloading:true
    }
}
export function meetingArrangeNofetech() {
    return {
        type:MEETINGMANAGE.MEETINGARRANGE_NOFETCH,
        isFetching:false
    }
}
export function meetingArrange(name,st,et,page,num,isquery){
    return (dispatch)=>{
        if(isquery){
            dispatch(meetingArrangeRequest());
        }
        else{
            dispatch(meetingArrangeIsloading());
        }
        return fetchAsyncGet(PATH.BASEPATH+'myJoin.do','confTopic='+name+'&startTime='+st+'&endTime='+et+'&startPage='+page+'&pageSize='+num).then((res)=>{

            if (res.status === 200) {
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
                return;
            }
        }).then(json=>{
                dispatch(meetingArrangeSuccess(JSON.parse(json),isquery));
        })
    }
}

//会议详情
function meetingDetailRequest(){
    return {
        type:MEETINGMANAGE.MEETINGDETAIL_REQUEST,
        isFetching:true
    }
}

function meetingDetailSuccess(data){
    return {
        type:MEETINGMANAGE.MEETINGDETAIL_SUCCESS,
        isFetching:false,
        data
    }
}

export function meetingDetail(){
    return (dispatch)=>{
        dispatch(meetingDetailRequest());
        return fetchAsyncGet(PATH.BASEPATH+'login.do',"userName=" + userName + "&password=" + passWord).then((res)=>{
            if (res.status === 200) {
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
                return;
            }
        }).then(json=>{
            dispatch(meetingDetailSuccess(JSON.parse(json)));
        })
    }
}
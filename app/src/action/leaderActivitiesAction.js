import * as LEADEACTIVITIES from '../constants/leaderActivitiesType.js';
import * as PATH from '../config/path.js';
import {fetchAsyncPost,fetchAsyncGet,fetchAsyncPostNoCore} from  '../fetch/fetchAsync.js';
import {hashHistory} from 'react-router';
function activitiesRequest(){
    return {
        type:LEADEACTIVITIES.ACTIVITIES_REQUEST,
        isFetching:true
    }
}

function activitiesSuccess(data){
    return {
        type:LEADEACTIVITIES.ACTIVITIES_SUCCESS,
        isFetching:false,
        data
    }
}
export function activitiesNofetch(){
    return {
        type:LEADEACTIVITIES.ACTIVITIES_NOFETCH,
        isFetching:false,
    }
}
export function getActivities(st,days){
    return (dispatch)=>{
        dispatch(activitiesRequest());
        //PATH.BASEURL+'api/getLeaderActvByTime.do'
        return fetchAsyncGet(PATH.BASEPATH+'getLeaderActvByTime.do','sTime='+st+'&days='+days).then(res=>{
            if(res.status===200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(
            json=>{
            dispatch(activitiesSuccess(JSON.parse(json)));
        })
    }
}

//领导活动详情
function activityDetailRequest(){
    return {
        type:LEADEACTIVITIES.ACTIVITIESDETAIL_REQUEST,
        isFetching:true
    }
}

function activityDetailSuccess(data){
    return {
        type:LEADEACTIVITIES.ACTIVITIESDETAIL_SUCCESS,
        isFetching:false,
        data
    }
}

export function getActivityDetail(){
    return (dispatch)=>{
        dispatch(activityDetailRequest());
        //return fetchAsyncGet(PATH.BASEURL+'','').then(res=>{
        return fetchAsyncGet(PATH.BASEPATH+'','').then(res=>{
            if(res.status === 200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(json=>{
            dispatch(activityDetailSuccess(JSON.parse(JSON)));
        })
    }
}
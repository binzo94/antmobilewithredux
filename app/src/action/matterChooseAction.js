import * as MATTERCHOOSE from '../constants/matterChooseType.js';
import * as PATH from '../config/path.js';
import {fetchAsyncPost,fetchAsyncGet} from  '../fetch/fetchAsync.js';
import {hashHistory} from 'react-router';
export function matterChooseRequest(){
	return {
		type:MATTERCHOOSE.MATTERCHOOSE_REQUEST,
		isFetching:true,
	}
}

export function matterChooseSuccess(data,isquery){
	return {
		type:MATTERCHOOSE.MATTERCHOOSE_SUCCESS,
		isFetching:false,
		data,
        isquery
	}
}

export function matterChooseCountSuccess(data){
	return {
		type:MATTERCHOOSE.MATTERCHOOSE_COUNT,
		count:data
	}
}
export function matterChooseHasmore(){
    return {
        type:MATTERCHOOSE.MATTERCHOOSE_HASMORE,
        nomore:false,
    }
}
function matterChooseIsloading(){
    return {
        type:MATTERCHOOSE.MATTERCHOOSE_ISLOADING,
        isloading:true
    }
}
export function matterChooseNofetech() {
    return {
        type:MATTERCHOOSE.MATTERCHOOSE_NOFETCH,
        isFetching:false
    }
}
export function matterChooseFailed(message){
	return {
		type:MATTERCHOOSE.MATTERCHOOSE_FAILED,
		isFetching:false,
		message,
	}
}

export function getMatters(processType,matterType,pageSize,pageIndex,isquery){
	return (dispatch) =>{
        if(isquery){
            dispatch(matterChooseRequest());
        }
        else{
            dispatch(matterChooseIsloading());
        }
        return fetchAsyncGet(PATH.BASEPATH+'getMatters.do','processType='+processType+'&matterType='+matterType+'&pageSize='+pageSize+'&pageIndex='+pageIndex).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then((json) => {

            if (json) {
                dispatch(matterChooseSuccess(JSON.parse(json)));
            } else {
                dispatch(matterChooseFailed("获取数据失败"));
            }
        }).catch((e) => {
            dispatch(matterChooseFailed(e));
        });
    }
}

export function getEndMatters(processType,pageSize,pageIndex,isquery){
	return (dispatch) =>{
        if(isquery){
            dispatch(matterChooseRequest());
        }
        else{
            dispatch(matterChooseIsloading());
        }
        return fetchAsyncGet(PATH.BASEPATH+'getEndMatters.do','processType='+processType+'&pageSize='+pageSize+'&pageIndex='+pageIndex).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then((json) => {

            if (json) {
                dispatch(matterChooseSuccess(JSON.parse(json)));
            } else {
                dispatch(matterChooseFailed("获取数据失败"));
            }
        }).catch((e) => {
            dispatch(matterChooseFailed(e));
        });
    }
}

export function getSearchMatters(subject,stime,etime,pageSize,pageIndex,isquery){
	return (dispatch) =>{
        if(isquery){
            dispatch(matterChooseRequest());
        }
        return fetchAsyncGet(PATH.BASEPATH+'getSearchMatters.do','title='+subject+'&pageSize='+pageSize+'&pageIndex='+pageIndex+'&startTime='+stime+'&endTime='+etime).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then((json) => {
            if (json) {
                dispatch(matterChooseSuccess(JSON.parse(json)));
            } else {
                dispatch(matterChooseFailed("获取数据失败"));
            }
        }).catch((e) => {
            dispatch(matterChooseFailed(e));
        });
    }
}
export function getSearchMattersCount(subject,stime,etime,isquery){
	return (dispatch) =>{
        return fetchAsyncGet(PATH.BASEPATH+'getSearchMattersCount.do','subject='+subject+'&startTime='+stime+'&endTime='+etime).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then((json) => {

            if (json) {
                dispatch(matterChooseCountSuccess(JSON.parse(json)));
            } else {
                dispatch(matterChooseFailed("获取数据失败"));
            }
        }).catch((e) => {
            dispatch(matterChooseFailed(e));
        });
    }
}
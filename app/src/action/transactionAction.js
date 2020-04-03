import * as TRANSACTIONTYPE from '../constants/transactionType.js';
import * as PATH from '../config/path.js';
import {fetchAsyncPost,fetchAsyncGet,fetchAsyncGetNoCore} from  '../fetch/fetchAsync.js';
import {hashHistory} from 'react-router';
require('es6-object-assign').polyfill();
export function transactionRequest(){
	return {
		type:TRANSACTIONTYPE.TRANSACTION_REQUEST,
		isFetching:true,
	}
}

export function transactionSuccess(totalcount){
	return {
		type:TRANSACTIONTYPE.TRANSACTION_SUCCESS,
		isFetching:false,
		totalcount,
	}
}

export function transactionFailed(message){
	return {
		type:TRANSACTIONTYPE.TRANSACTION_FAILED,
		isFetching:false,
		message,
	}
}

export function emailRequest(){
	return {
		type:TRANSACTIONTYPE.USEREMAIL_REQUEST,
		isFetching:true,
	}
}

export function emailSuccess(emailAddress){
	return {
		type:TRANSACTIONTYPE.USEREMAIL_SUCCESS,
		isFetching:false,
		emailAddress,
	}
}

export function emailFailed(message){
	return {
		type:TRANSACTIONTYPE.USEREMAIL_FAILED,
		isFetching:false,
		message,
	}
}

export function emailInfoRequest(){
	return {
		type:TRANSACTIONTYPE.EMAILINFO_REQUEST,
		isFetching:true,
	}
}

export function emailInfoSuccess(emailInfo){
	return {
		type:TRANSACTIONTYPE.EMAILINFO_SUCCESS,
		isFetching:false,
		emailInfo,
	}
}

export function emailInfoFailed(message){
	return {
		type:TRANSACTIONTYPE.EMAILINFO_FAILED,
		isFetching:false,
		message,
	}
}

export function getFourTotalAmount(){
    return (dispatch) =>{
        dispatch(transactionRequest());
        return fetchAsyncGet(PATH.BASEPATH+'getFourTotalAmount.do','').then((res) => {
            if (res.status === 200) {
                return res.json();
			}
			if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then((json) => {
            if (json) {
                dispatch(transactionSuccess(JSON.parse(json)));
            } else {
                dispatch(transactionFailed("获取数据失败"));
            }
        }).catch((e) => {
            dispatch(transactionFailed(e));
        });
    }
}

export function getEmailByName(userName){
	return (dispatch) =>{
			dispatch(emailRequest());
			return fetchAsyncGet(PATH.BASEPATH+'getEmailByName.do','userName='+userName).then((res) => {
					if (res.status === 200) {
							return res.json();
					}
					if(res.status === 503){
						hashHistory.push('/login');
					}
			}).then((json) => {
					if (json) {
							dispatch(emailSuccess(json));
							dispatch(getEmailInfo(json));
					} else {
							dispatch(emailFailed("获取数据失败"));
					}
			}).catch((e) => {
					dispatch(emailFailed(e));
			});
	}
}


export function getEmailInfo(userEmail){
	return (dispatch) =>{
			dispatch(emailInfoRequest());
			return fetchAsyncGetNoCore(PATH.EMAILPATH+'receiveMessage.do','parameter='+userEmail).then((res) => {

					if (res.status === 200) {
							return res.json();
					}
					if(res.status === 503){
						hashHistory.push('/login');
					}
			}).then((json) => {
					if (json) {
							dispatch(emailInfoSuccess(json));
					} else {
							dispatch(emailInfoFailed("获取数据失败"));
					}
			}).catch((e) => {
					dispatch(emailInfoFailed(e));
			});
	}
}

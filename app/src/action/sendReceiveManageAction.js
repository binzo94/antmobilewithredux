import * as MANAGE from '../constants/sendReceiveManageType.js';
import * as PATH from '../config/path.js';
import {fetchAsyncPost,fetchAsyncGet,fetchAsyncGetNoCore} from  '../fetch/fetchAsync.js';
import {hashHistory} from 'react-router';
export function amountRequest(){
	return {
		type:MANAGE.AMOUNT_REQUEST,
		isFetching:true,
	}
}

export function amountSuccess(data){
    return {
        type:MANAGE.AMOUNT_SUCCESS,
        isFetching:false,
        data
    }
}

export function amountFailed(message){
    return {
        type:MANAGE.AMOUNT_FAILED,
        isFetching:false,
        message
    }
}


//数量获取请求

export function getAmount(){
    return (dispatch) =>{
        dispatch(amountRequest());
        return fetchAsyncGet(PATH.BASEPATH+'getFourTotalAmount.do','').then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then((json) => {
            if (json) {
                dispatch(amountSuccess(JSON.parse(json)));
            } else {
                dispatch(amountFailed("获取数据失败"));
            }
        }).catch((e) => {
            dispatch(amountFailed(e));
        });
    }
}
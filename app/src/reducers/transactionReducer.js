import * as TRANSACTIONTYPE from '../constants/transactionType.js';
require('es6-object-assign').polyfill();

const initialState = {
    totalcount:[],
    emailAddress:'',
    emailInfo:'',
    isFetching: false,
};

export default function transaction(state=initialState,action) {
    switch(action.type){
      case TRANSACTIONTYPE.TRANSACTION_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
        })
      case TRANSACTIONTYPE.TRANSACTION_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            totalcount:action.totalcount,
        })

      case TRANSACTIONTYPE.TRANSACTION_FAILED:
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.message
        })

      case TRANSACTIONTYPE.USEREMAIL_REQUEST:
        return Object.assign({},state,{
          isFetching:true,
        })
      case TRANSACTIONTYPE.USEREMAIL_SUCCESS:
        return Object.assign({},state,{
          isFetching:false,
          emailAddress:action.emailAddress
        })
      case TRANSACTIONTYPE.USEREMAIL_FAILED:
        return Object.assign({},state,{
          isFetching:false,
          userEmailError:action.message
        })
      case TRANSACTIONTYPE.EMAILINFO_REQUEST:
        return Object.assign({},state,{
          isFetching:true,
        })

      case TRANSACTIONTYPE.EMAILINFO_SUCCESS:
        return Object.assign({},state,{
          isFetching:false,
          emailInfo:action.emailInfo
        })

      case TRANSACTIONTYPE.EMAILINFO_FAILED:
        return Object.assign({},state,{
          isFetching:false,
          emailInfoError:action.message
        })
      default:
        return state;
    }
}

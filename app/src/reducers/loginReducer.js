import * as LOGINTYPE from '../constants/loginType.js';
const initialState = {
    token: null,
    userName: null,
    passWord:null,
    isFetching: false,
    versionurl:"",
    cancelLoginValue:false,   //注销登录  true：注销登录
};

export default function login(state=initialState,action) {
    switch(action.type){
      case LOGINTYPE.LOGIN_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
        })
      case LOGINTYPE.LOGIN_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            userName:action.userInfo.userName,
            passWord:action.userInfo.passWord,
            success:true
        })
        case LOGINTYPE.HAS_NEW_VERSION:
            return Object.assign({}, state, {
                versionurl:action.versionurl
            })
      case LOGINTYPE.LOGIN_FAILED:
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.message,
            success:false
        })
      case LOGINTYPE.CANCEL_LOGIN:{
        return Object.assign({},state,{
            isFetching:true,
            cancelLoginValue:action.cancelLogin,
        })
      } 
      case LOGINTYPE.MAIL_MSG_SUCCESS:{
        return Object.assign({},state,{
            isFetching:true,
            mailMsg:action.mailMsg,
        })
      }
      case LOGINTYPE.MAIL_MSG_REQUEST:
      return Object.assign({}, state, {
          isFetching: true,
      })
        case LOGINTYPE.MAIL_COUNT_SUCCESS:{
            return Object.assign({}, state, {
                mailCount:action.mailCount
            })
        }
      default:
        return state;
    }
}

import * as LOGINTYPE from '../constants/loginType.js';
import * as PATH from '../config/path.js';
import {fetchAsyncPost,fetchAsyncGet,} from  '../fetch/fetchAsync.js';
import {Toast} from 'antd-mobile';
import {hashHistory} from 'react-router';
import setupWebViewJavascriptBridge from '../callios.js';
import judge from '../judge.js';
import {getAmount} from '../action/sendReceiveManageAction.js';
export function loginRequest(){
    return {
        type:LOGINTYPE.LOGIN_REQUEST,
        isFetching:true,
    }
}
export function loginReceive(userInfo){
    return {
        type:LOGINTYPE.LOGIN_SUCCESS,
        isFetching:false,
        userInfo
    }
}
export function loginFailed(message){
    return {
        type:LOGINTYPE.LOGIN_FAILED,
        isFetching:false,
        message
    }
}
export function mailMsgRequest(){
    return {
        type:LOGINTYPE.MAIL_MSG_REQUEST,
        isFetching:false
    }
}
export function mailMsgReceive(mailMsg){
    return {
        type:LOGINTYPE.MAIL_MSG_SUCCESS,
        isFetching:false,
        mailMsg:mailMsg
    }
}
export function hasNewVersion(versionurl){
    return {
        type:LOGINTYPE.HAS_NEW_VERSION,
        versionurl:versionurl
    }
}
export function checkVersion() {
    sessionStorage.setItem('hascheck',"1");
 if(judge()){
        //调用安卓方法
        window.system=0;
      //  window.versions=androidConnector.getVersionName();
    }
    else{
     window.system=1;
 }
    return (dispatch)=>{
        return fetchAsyncGet(PATH.BASEPATH+'getVersions.do',"versions=" +  window.versions+"&system=" +window.system).then((res) => {
            if (res.status === 200) {
                return res.json();

            }
            if(res.status === 503){
                hashHistory.push('/login');
                return;
            }
        }).then((json)=>{

            if(json!=""){
                var parten=/^"(.*)"$/;
                var arr=parten.exec(json);
                if(arr!=null){
                    dispatch(hasNewVersion(arr[1]))

                }else {
                    dispatch(hasNewVersion(json))
                }

            }
        })
    }


}
export function loginBySkip(userName,passWord){
    return (dispatch)=>{
        dispatch(loginRequest());
        return fetchAsyncPost(PATH.BASEPATH+'login.do',"userName=" + userName + "&password=" + passWord).then((res) => {
            if (res.status === 200) {
                return res.json();

            }
            if(res.status === 503){
                hashHistory.push('/login');
                return;
            }
        }).then((json)=>{
            var j=JSON.parse(json);
            if (j.USERNAME!="") {
                Toast.hide();
                localStorage.setItem('userName',userName);
                localStorage.setItem('fullname',j.FULLNAME);
                localStorage.setItem('schema',j.SCHEMA);
                localStorage.setItem('passWord',passWord);
                localStorage.setItem('remember',remember?"true":"false");
                localStorage.setItem('autoLogin',autoLogin===true?"true":"flase");
                dispatch(getAmount());
                dispatch(getMailSid());
                if(judge()){
                    //调用安卓方法
                    let channelId = androidConnector.getPreferences("channelId");
                    dispatch(saveChannelID(channelId,3));
                    androidConnector.save(j.USERID,userName,passWord,j.FULLNAME,j.SCHEMA);
                }
                else{
                    setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getChannelId', function(data) {
                            dispatch(saveChannelID(data.channel_id,4));
                        })
                        bridge.callHandler('getUserBaseInfo',{userid:j.USERID,username:userName,password:passWord,fullname:j.FULLNAME,schema:j.SCHEMA}, function(response) {
                        })
                    })
                }

            }
            if(json==1){
                localStorage.setItem('userName',userName);
                localStorage.setItem('passWord',passWord);
                dispatch(getAmount());
                dispatch(getMailSid());
               // dispatch(getMailCount());


            }
            else{
                hashHistory.push('/homePage/'+"null");
                localStorage.setItem('userName',"");
                Toast.info('暂无权限！！！',2);
                dispatch(loginFailed("用户名或密码为空"));
            }

        })
    }
}
export function login(userName,passWord,remember,autoLogin){
    Toast.loading('登录中，请稍后',20000);
    return (dispatch) =>{
        dispatch(loginRequest());
        let data = {
            userName:userName,
            password:passWord
        };
        return fetchAsyncPost(PATH.BASEPATH+'login.do',"userName=" + userName + "&password=" + passWord).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then((json) => {
            var j=JSON.parse(json);
            if (j.USERNAME!=null) {
                Toast.hide();
                localStorage.setItem('userName',userName);
                localStorage.setItem('fullname',j.FULLNAME);
                localStorage.setItem('schema',j.SCHEMA);
                localStorage.setItem('passWord',passWord);
                localStorage.setItem('remember',remember?"true":"false");
                localStorage.setItem('autoLogin',autoLogin===true?"true":"flase");
                dispatch(loginReceive(data));
                hashHistory.push('/homePage/'+userName);
                //androidConnector.save(j.USERID,userName,passWord,j.FULLNAME,j.SCHEMA);
                if(judge()){
                    //调用安卓方法
                    let channelId = androidConnector.getPreferences("channelId");
                    dispatch(saveChannelID(channelId,3));
                    androidConnector.save(j.USERID,userName,passWord,j.FULLNAME,j.SCHEMA);
                }
                else{
                    setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getChannelId', function(data) {
                            dispatch(saveChannelID(data.channel_id,4));
                        })
                        bridge.callHandler('getUserBaseInfo',{userid:j.USERID,username:userName,password:passWord,fullname:j.FULLNAME,schema:j.SCHEMA}, function(response) {
                        })
                    })
                }
            } else {
                Toast.info('用户名或密码错误!',1);
                dispatch(loginFailed("用户名或密码为空"));
            }
        }).catch((e) => {
            dispatch(loginFailed(e));
            // alert('请求数据错误');
        });
    }

    Toast.hide();
}
export function gljypLogin(userName,passWord){
    Toast.loading('登录中，请稍后',20000);
    return (dispatch) =>{
        dispatch(loginRequest());
        let data = {
            userName:userName,
            password:passWord
        };
        return fetchAsyncPost(PATH.BASEPATH+'gljypLogin.do',"userName=" + userName + "&password=" + passWord).then((res) => {
            Toast.hide();
            if (res.status === 200) {
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then((json) => {
            var j=JSON.parse(json);
            if (j.USERNAME!=null) {
                localStorage.setItem('userName',userName);
                localStorage.setItem('fullname',j.FULLNAME);
                localStorage.setItem('schema',j.SCHEMA);
                localStorage.setItem('passWord',passWord);
                dispatch(loginReceive(data));
                hashHistory.push('/homePage/'+userName);
                if(judge()){
                    //调用安卓方法
                    let channelId = androidConnector.getPreferences("channelId");
                    dispatch(saveChannelID(channelId,3));
                    androidConnector.save(j.USERID,userName,passWord,j.FULLNAME,j.SCHEMA);
                }
                else{
                    setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getChannelId', function(data) {
                            dispatch(saveChannelID(data.channel_id,4));
                        })
                        bridge.callHandler('getUserBaseInfo',{userid:j.USERID,username:userName,password:passWord,fullname:j.FULLNAME,schema:j.SCHEMA}, function(response) {
                        })
                    })
                }
            } else {
                hashHistory.push('/login');
                Toast.info('用户名或密码错误!',1);
                dispatch(loginFailed("用户名或密码为空"));
            }
        }).catch((e) => {
            dispatch(loginFailed(e));
            // alert('请求数据错误');
        });
    }

}
/**
 * 获取邮箱的sid和未读数量
 */
export function getMailSid(){
    return (dispatch)=>{
       // return fetchAsyncGet(PATH.BASEPATH+'getCoreMailSession.do',"").then((res) => {
        return fetchAsyncPost(PATH.BASEPATH+'getMsgForEmail.do',"").then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
                return;
            }
        }).then(
            (json)=>{
                let data = JSON.parse(json);
                dispatch(mailMsgReceive(data));
        })
    }
}
function getMailCountReceive(MailCount) {
    return {
        type:LOGINTYPE.MAIL_COUNT_SUCCESS,
            mailCount:MailCount
    }
}
export function getMailCount(){
    return (dispatch)=>{
        return fetchAsyncGet(PATH.BASEPATH+'getCoreMailCount.do',"").then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
                return;
            }
        }).then(
            (json)=>{
                let data = JSON.parse(json);
                dispatch(getMailCountReceive(data));
            })
    }
}
/**
 * 单点登录
 */
export function QWTLogin(userId){
    return (dispatch)=>{
        dispatch(loginRequest());
        return fetchAsyncPost(PATH.BASEPATH+'qwtLogin.do',"userId="+userId).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
                return;
            }
        }).then((json)=>{
            var j=JSON.parse(json);
            if (j.USERNAME!=null) {
                localStorage.setItem('userName',j.USERNAME);
                localStorage.setItem('fullname',j.FULLNAME);
                localStorage.setItem('schema',j.SCHEMA);
                localStorage.setItem('passWord',j.PASSWORD);
               // dispatch(loginReceive(data));
                hashHistory.push('/homePage/'+j.USERNAME);
                if(judge()){
                    //调用安卓方法
                    let channelId = androidConnector.getPreferences("channelId");
                    dispatch(saveChannelID(channelId,3));
                    androidConnector.save(j.USERID,j.USERNAME,j.PASSWORD,j.FULLNAME,j.SCHEMA);
                }
                else{
                    setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getChannelId', function(data) {
                            dispatch(saveChannelID(data.channel_id,4));
                        })
                        bridge.callHandler('getUserBaseInfo',{userid:j.USERID,username:j.USERNAME,password:j.PASSWORD,fullname:j.FULLNAME,schema:j.SCHEMA}, function(response) {
                        })
                    })
                }

            } else {
                hashHistory.push('/login');
                Toast.info('账号异常!',1);
                dispatch(loginFailed("账号异常"));
            }
        })
    }
}

//保存channelId
export function saveChannelID(id,type){
    return fetchAsyncPost(PATH.BASEPATH+'saveChannelID.do',"channelID=" + id+"&type="+type);
}

//删除channelId
export function deleteChannelID(){
    return fetchAsyncPost(PATH.BASEPATH+'deleteChannelID.do');
}

export function cancelLogin(cancelLogin){
    return {
        type:LOGINTYPE.CANCEL_LOGIN,
        cancelLogin
    }
}
//注销
export function cancellation(type){
    return (dispatch) =>{
        dispatch(cancelLogin(true));
        if(type==undefined){
            hashHistory.push('/login');
        }
        if(judge()){
           // dispatch(deleteChannelID());
            //注销调用安卓方法
            if(type!=undefined){
                androidConnector.logout1();
            }
            else {
                androidConnector.logout();
            }

        }
        else{
            //注销调用IOS方法
           // dispatch(deleteChannelID());
            setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('logout', function(response) {

                })
            })
        }
    }
}

import * as DETAIL from '../constants/detailType.js';
import * as PATH from '../config/path.js';
import {Toast} from 'antd-mobile';
import {fetchAsyncPost,fetchAsyncGet,fetchAsyncPostNoCore} from  '../fetch/fetchAsync.js';
import {hashHistory} from 'react-router';
//详细信息
export function cardListRequest(){
    return {
        type:DETAIL.CARDLIST_REQUEST,
        isFetching:true,
    }
}

export function cardListSuccess(cardListData){
    return {
        type:DETAIL.CARDLIST_SUCCESS,
        isFetching:false,
        cardListData,
    }
}

export function cardListFailed(message){
    return {
        type:DETAIL.CARDLIST_FAILED,
        isFetching:false,
        message,
    }
}

//审批意见
export function approvalRequest(){
    return {
        type:DETAIL.APPROVAL_REQUEST,
        isFetching:true,
    }
}

export function approvalSuccess(approvalOpinions){
    return {
        type:DETAIL.APPROVAL_SUCCESS,
        isFetching:false,
        approvalOpinions,
    }
}


export function approvalFailed(message){
    return {
        type:DETAIL.APPROVAL_FAILED,
        isFetching:false,
        message,
    }
}


//下一步处理人，人员树

export function staffRequest(){
    return {
        type:DETAIL.STAFF_REQUEST,
        isFetching:true,
    }
}

export function staffSuccess(staffTree){
    return {
        type:DETAIL.STAFF_SUCCESS,
        isFetching:false,
        staffTree,
    }
}

export function staffFailed(message){
    return {
        type:DETAIL.STAFF_FAILED,
        isFetching:false,
        message
    }
}


//下一步任务
export function nextTaskRequest(){
    return {
        type:DETAIL.NEXTTASK_REQUEST,
        isFetching:true,
    }
}

export function nextTaskSuccess(nextTaskData){
    return {
        type:DETAIL.NEXTTASK_SUCCESS,
        isFetching:false,
        nextTaskData,
    }
}

export function nextTaskFailed(message){
    return {
        type:DETAIL.NEXTTASK_FAILED,
        isFetching:false,
        message,
    }
}

//审批流程信息
export function stepRequest(){
    return {
        type:DETAIL.STEP_REQUEST,
        isFetching:true,
    }
}

export function stepSuccess(processData){
    return {
        type:DETAIL.STEP_SUCCESS,
        isFetching:false,
        processData,
    }
}

export function stepFailed(message) {
    return {
        type: DETAIL.STEP_FAILED,
        isFetching: false,
        message,
    }
}


//流程下一步接口
export function nextStepRequest(){
    return {
        type:DETAIL.NEXTSTEP_REQUEST,
        isFetching:true,
    }
}

export function nextStepSuccess(nextStepData){
    return {
        type:DETAIL.NEXTSTEP_SUCCESS,
        isFetching:false,
        nextStepData,
    }
}

export function nextStepFailed(message){
    return {
        type:DETAIL.NEXTSTEP_FAILED,
        isFetching:false,
        message,
    }
}

//获取depID
export function depIDRequest(){
    return {
        type:DETAIL.DEPID_REQUEST,
        isFetching:true,
    }
}

export function depIDSuccess(depID){
    return {
        type:DETAIL.DEPID_SUCCESS,
        isFetching:false,
        depID,
    }
}

export function depIDFailed(message){
    return {
        type:DETAIL.DEPID_FAILED,
        isFetching:false,
        message,
    }
}

//获取当前步骤状态值
export function taskStateRequest(){
    return {
        type:DETAIL.TASKSTATE_REQUEST,
        isFetching:true,
    }
}

export function taskStateSuccess(state){
    return {
        type:DETAIL.TASKSTATE_SUCCESS,
        isFetching:false,
        state
    }
}

export function taskStateFailed(message){
    return {
        type:DETAIL.TASKSTATE_FAILED,
        isFetching:false,
        message,
    }
}

//获取下下步审核步骤
export function secondTaskRequest(){
    return {
        type:DETAIL.SECONDTASK_REQUEST,
        isFetching:true,
    }
}

export function secondTaskSuccess(secondTask){
    return {
        type:DETAIL.SECONDTASK_SUCCESS,
        isFetching:false,
        secondTask,
    }
}

export function secondTaskFailed(message){
    return {
        type:DETAIL.SECONDTASK_FAILED,
        isFetching:false,
        message,
    }
}


//只选审核步骤是，获取指定的下一步处理人
export function nextPersonRequest(){
    return {
        type:DETAIL.NEXTPERSON_REQUEST,
        isFetching:true,
    }
}
export function nextPersonSuccess(nextPerson){
    return {
        type:DETAIL.NEXTPERSON_SUCCESS,
        isFetching:false,
        nextPerson,
    }
}
export function nextPersonFailed(message){
    return {
        type:DETAIL.NEXTPERSON_FAILED,
        isFetching:false,
        message,
    }
}

export function nextThingsRequest(){
    return {
        type:DETAIL.NEXTTHINGS_MAP_REQUEST,
        isFetching:true,
    }
}

export function  nextThingsSuccess(thingsMap){
    return {
        type:DETAIL.NEXTTHINGS_MAP_SUCCESS,
        isFetching:true,
        thingsMap,
    }
}

export function depAndUserRequest(){
    return {
        type:DETAIL.DEPANDUSER_MAP_REQUEST,
        isFetching:true,
    }
}

export function  depAndUserSuccess(depAndUser){
    return {
        type:DETAIL.DEPANDUSER_MAP_SUCCESS,
        isFetching:true,
        depAndUser,
    }
}
//只选审核步骤是，获取指定的下一步处理人
export function getFixAssignTask(processID,taskID,taskName){
    return (dispatch)=>{
        dispatch(nextPersonRequest());
        return fetchAsyncGet(PATH.BASEPATH+'getFixAssignTask.do',"processID=" + processID +"&taskID="+taskID+"&taskName=" + encodeURIComponent(taskName)).then(res=>{
            if(res.status === 200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(json=>{
            dispatch(nextPersonSuccess(JSON.parse(json)));
        }).catch(e=>{
            dispatch(nextPersonFailed('请求异常'));
        });
    }
}

//获取下下步审核步骤
export function getSecondTask(processID,taskName){
    return (dispatch)=>{
        dispatch(secondTaskRequest());
        return fetchAsyncPost(PATH.BASEPATH+'getNextTask.do',"processID=" + processID + "&taskName=" + encodeURIComponent(taskName)).then(res=>{
            if(res.status === 200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(json=>{
            dispatch(secondTaskSuccess(JSON.parse(json)));
        }).catch(e=>{
            dispatch(secondTaskFailed('请求异常'));
        });
    }
}

//获取当前步骤状态值
export function getTaskState(processID,taskName){
    return (dispatch)=>{
        dispatch(nextTaskRequest());
        return fetchAsyncGet(PATH.BASEPATH+'getTaskState.do',"processID=" + processID + "&taskName=" + encodeURIComponent(taskName)).then(res=>{
            if(res.status === 200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(json=>{
            dispatch(taskStateSuccess(JSON.parse(json)));
        }).catch(e=>{
            dispatch(taskStateFailed('请求异常'));
        });
    }
}

//审核步骤
export function getNextTask(processID,taskName){
    return (dispatch)=>{
       // dispatch(nextTaskRequest());
        return fetchAsyncPost(PATH.BASEPATH+'getNextTask.do',"processID=" + processID + "&taskName=" + encodeURIComponent(taskName)).then(res=>{
            if(res.status === 200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(json=>{
            dispatch(nextTaskSuccess(JSON.parse(json)));
        }).catch(e=>{
            dispatch(nextTaskFailed('请求异常'));
        });
    }
}

//获取depID
export function getDepID(){
    return (dispatch)=>{
        dispatch(depIDRequest());
        return fetchAsyncGet(PATH.BASEPATH + 'getDepIDBySchema.do').then(res=>{
          if(res.status === 200){
              return res.json();
          }
          if(res.status === 503){
            hashHistory.push('/login');
          }
        }).then(json=>{
            let data = JSON.parse(json);
            dispatch(depIDSuccess(data));
        }).catch(e=>{
            dispatch(depIDFailed('请求异常'));
        });
    }
}

//获取人员树
export function departmentTree(depID,inputName){

    return (dispatch)=>{
        dispatch(staffRequest());
        return fetchAsyncPost(PATH.BASEPATH+'departmentTree.do','depID='+depID+'&fullName=' + inputName).then(res=>{
            if(res.status === 200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(json=>{
            if(json)
                dispatch(staffSuccess(JSON.parse(json)));
        }).catch(e=>{
            dispatch(staffFailed('请求异常求'));
        });
    }
}


//获取事项详情
export function getMatterInfoByID(runID,type,dbID){
    return (dispatch)=>{
        dispatch(cardListRequest());
        var parameter= 'runID=' + runID + '&type=' + type + '&dbID=' + dbID
        if(type==2){
            parameter='archivesID=' + runID + '&type=' + type + '&dbID=' + dbID
        }
        return fetchAsyncGet(PATH.BASEPATH+'getMatterInfoByID.do',parameter).then(res=>{
            if(res.status == 200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(json=>{
            let data = JSON.parse(json);
            dispatch(cardListSuccess(data));
            if(type==0){
               // dispatch(getNextTask(data.DEFID,data.ACTIVITYNAME));
            }

        }).catch(e=>{
            dispatch(cardListFailed('请求异常'));
        });
    }
}

//获取审批意见
export function getComments(){
    return (dispatch)=>{
        dispatch(approvalRequest);
        return fetchAsyncGet(PATH.BASEPATH+'getComments.do').then(res=>{
            if(res.status === 200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(json=>{
            if(json != '-1')
                dispatch(approvalSuccess(JSON.parse(json)));
            else
                dispatch(approvalFailed('请求方法异常'));
        }).catch(e=>{
            dispatch(approvalFailed('请求异常'));
        });
    }
}



//审批流程
export function getProcess(runID){
    return (dispatch)=>{
        dispatch(stepRequest());
        return fetchAsyncGet(PATH.BASEPATH+'getProcess.do','runID='+runID).then(res=>{
            if(res.status === 200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(json=>{
            if(json)
                dispatch(stepSuccess(JSON.parse(json)));
        }).catch(e=>{
            dispatch(stepFailed('请求异常'));
        });
    }
}


//下一步流程确认
export function nextStepSubmit(infomation) {
    return (dispatch) => {
        return fetchAsyncPost(PATH.BASEPATH + 'doTask.do', infomation).then(res => {
            if(res.status == 200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(json=>{
            var result = JSON.parse(json);
            if(result[0].success == "false"){
                Toast.fail(result[0].message, 3);
            }else{
                    dispatch(nextStepSuccess(1));
                    hashHistory.goBack();
                    hashHistory.push('/matterChoose/'+userName+'/'+processType+'/'+matterType);
            }
        }).catch(e=>{
            dispatch(cardListFailed('请求异常'));
        });
    }
}
//获取下一步流程审批步骤（陈）
export function getNextThings(processName,activityName,runID){
    return (dispatch)=>{
        return fetchAsyncGet(PATH.BASEPATH +'getNextThings.do','processName=' + processName + '&activityName=' + activityName +"&runId="+runID).then(res=>{
        // return fetchAsyncGet(PATH.BASEPATH+'getNextThings.do','processName=重庆市交通行政执法总队党委发文处理笺&activityName=处室初核').then(res=>{
            if(res.status == 200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(json=>{
            //setStateAsync({json,json});
            let thingsMap = JSON.parse(json);
            if(thingsMap!=null){
                dispatch(nextThingsSuccess(thingsMap.activitys));//下一步可选审批步骤
            }else{
                dispatch(nextThingsSuccess(false));//下一步可选审批步骤
            }
        }).catch(e=>{
            dispatch(cardListFailed('请求异常'));
        });
    }
}
//获取筛选的人员（陈）
export function getDeptAndUser(parameter){
    return (dispatch)=>{
        dispatch(nextThingsRequest());
            //return fetchAsyncGet(PATH.BASEPATH+'getNextThings.do','processName=' + processName + '&activityName=' + activityName ).then(res=>{
        return fetchAsyncPost(PATH.BASEPATH+'getDeptAndUser2.do',parameter).then(res=>{
            if(res.status == 200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(json=>{
            let depAndUser = JSON.parse(json);
            if(depAndUser!=null){
               dispatch(depAndUserSuccess(depAndUser));//下一步可选审批步骤
            }else{
                Toast.fail('数据获取失败', 3);
            }
        }).catch(e=>{
            dispatch(cardListFailed('请求异常'));
        });
    }
}

//获取上一步指定的人员（陈）
export function getNextTaskUser(runid,name){
    return (dispatch)=>{
        dispatch(nextThingsRequest());
        //return fetchAsyncGet(PATH.BASEPATH+'getNextThings.do','processName=' + processName + '&activityName=' + activityName ).then(res=>{
        return fetchAsyncPost(PATH.BASEPATH+'getNextTaskUser.do','roleIds=100175,100152&deptIds=&notShowDeptIds=' ).then(res=>{
            if(res.status == 200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(json=>{
            let depAndUser = JSON.parse(json);
            if(depAndUser!=null){
               dispatch(depAndUserSuccess(depAndUser));//下一步可选审批步骤
            }else{
                Toast.fail('数据获取失败', 3);
            }
        }).catch(e=>{
            dispatch(cardListFailed('请求异常'));
        });
    }
}

export function getMatterInfoByRunID(archivesId){
    return (dispatch)=>{
        dispatch(nextThingsRequest());
        //return fetchAsyncGet(PATH.BASEPATH+'getNextThings.do','processName=' + processName + '&activityName=' + activityName ).then(res=>{
        return fetchAsyncPost(PATH.BASEPATH+'getNextTaskUser.do','roleIds=100175,100152&deptIds=&notShowDeptIds=' ).then(res=>{
            if(res.status == 200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(json=>{
            let depAndUser = JSON.parse(json);
            if(depAndUser!=null){
               dispatch(depAndUserSuccess(depAndUser));//下一步可选审批步骤
            }else{
                Toast.fail('数据获取失败', 3);
            }
        }).catch(e=>{
            dispatch(cardListFailed('请求异常'));
        });
    }
}


export function updateIsPublicInfo(archivesId,isPublic){
    return (dispatch)=>{
        dispatch(nextThingsRequest());
        //return fetchAsyncGet(PATH.BASEPATH+'getNextThings.do','processName=' + processName + '&activityName=' + activityName ).then(res=>{
        return fetchAsyncPost(PATH.BASEPATH+'updateIsPublicInfo.do','archivesId='+archivesId+'&isPublic='+isPublic ).then(res=>{
            if(res.status == 200){
                return res.json();
            }
            if(res.status === 503){
                hashHistory.push('/login');
            }
        }).then(json=>{

        }).catch(e=>{
            dispatch(cardListFailed('请求异常'));
        });
    }
}

import * as DETAILTYPE from '../constants/detailType.js';
const initialState = {
    approvalOpinions:[],
    cardListData:[],
    nextTaskData:[],
    secondTask:[],
    processData:[],
    staffTree:[],
    nextStepData:0,//下一步流程确认返回值  0成功  1失败
    nextStepErrorMessage:'',
    taskState:[{'status':'1'}], //当前步骤状态值  0:只需填入审核意见 1：审核步骤 下一步处理人 审核意见   2：在1的基础上，添加下下一步处理人
    nextPerson:''
};

export default function detail(state=initialState,action){
    switch(action.type){
        case DETAILTYPE.APPROVAL_REQUEST:
            return Object.assign({},state,{
                isFetching:true,
            })
        case DETAILTYPE.APPROVAL_SUCCESS:
            return Object.assign({},state,{
                isFetching:false,
                approvalOpinions:action.approvalOpinions,
            })
        case DETAILTYPE.APPROVAL_FAILED:
            return Object.assign({},state,{
                isFetching:false,
                approvalErrorMessage:action.message,
            })
        case DETAILTYPE.STAFF_REQUEST:
            return Object.assign({},state,{
                isFetching:true,
            })
        case DETAILTYPE.STAFF_SUCCESS:
            return Object.assign({},state,{
                isFetching:false,
                staffTree:action.staffTree,
            })
        case DETAILTYPE.STAFF_FAILED:
            return Object.assign({},state,{
                isFetching:false,
                staffErrorMessage:action.message,
            })
        case DETAILTYPE.CARDLIST_REQUEST:
            return Object.assign({},state,{
                isFetching:true,
            })
        case DETAILTYPE.CARDLIST_SUCCESS:
            return Object.assign({},state,{
                isFetching:false,
                cardListData:action.cardListData,
            })
        case DETAILTYPE.CARDLIST_FAILED:
            return Object.assign({},state,{
                isFetching:false,
                cardListErrorMessage:action.message
            })
        case DETAILTYPE.NEXTTASK_REQUEST:
            return Object.assign({},state,{
                isFetching:true,
            })
        case DETAILTYPE.NEXTTASK_SUCCESS:
            return Object.assign({},state,{
                isFetching:false,
                nextTaskData:action.nextTaskData,
            })
        case DETAILTYPE.NEXTTASK_FAILED:
            return Object.assign({},state,{
                isFetching:false,
                nextTaskErrorMessage:action.message,
            })
        case DETAILTYPE.STEP_REQUEST:
            return Object.assign({},state,{
                isFetching:true,
            })
        case DETAILTYPE.STEP_SUCCESS:
            return Object.assign({},state,{
                isFetching:false,
                processData:action.processData,
            })
        case DETAILTYPE.STEP_FAILED:
            return Object.assign({},state,{
                isFetching:false,
                processErrorMessage:action.message,
            })
        case DETAILTYPE.NEXTSTEP_REQUEST:
            return Object.assign({},state,{
                isFetching:true,
            })
        case DETAILTYPE.NEXTSTEP_SUCCESS:
            return Object.assign({},state,{
                isFetching:false,
                nextStepData:action.nextStepData,
            })
        case DETAILTYPE.NEXTSTEP_FAILED:
            return Object.assign({},state,{
                isFetching:false,
                nextStepErrorMessage:action.message,
            })
        case DETAILTYPE.DEPID_REQUEST:
            return Object.assign({},state,{
                isFetching:true,
            })
        case DETAILTYPE.DEPID_SUCCESS:
            return Object.assign({},state,{
                isFetching:false,
                depID:action.depID,
            })
        case DETAILTYPE.DEPID_FAILED:
            return Object.assign({},state,{
                isFetching:false,
                depIDErrorMessage:action.message,
            })
        case DETAILTYPE.TASKSTATE_REQUEST:{
            return Object.assign({},state,{
                isFetching:true,
            })
        }
        case DETAILTYPE.TASKSTATE_SUCCESS:{
            return Object.assign({},state,{
                isFetching:false,
                taskState:action.state,
            })
        }
        case DETAILTYPE.TASKSTATE_FAILED:{
            return Object.assign({},state,{
                isFetching:false,
                taskStateErrorMessage:action.message,
            })
        }
        case DETAILTYPE.SECONDTASK_REQUEST:{
            return Object.assign({},state,{
                isFetching:true,
            })
        }
        case DETAILTYPE.SECONDTASK_SUCCESS:{
            return Object.assign({},state,{
                isFetching:false,
                secondTask:action.secondTask,
            })
        }
        case DETAILTYPE.SECONDTASK_FAILED:{
            return Object.assign({},state,{
                isFetching:false,
                secondTaskErrorMessage:action.message,
            })
        }

        case DETAILTYPE.NEXTPERSON_REQUEST:{
            return Object.assign({},state,{
                isFetching:true,
            })
        }
        case DETAILTYPE.NEXTPERSON_SUCCESS:{
            return Object.assign({},state,{
                isFetching:false,
                nextPerson:action.nextPerson,
            })
        }
        case DETAILTYPE.NEXTPERSON_FAILED:{
            return Object.assign({},state,{
                isFetching:false,
                nextPersonErrorMessage:action.message,
            })
        }
        case DETAILTYPE.NEXTPERSON_FAILED:{
            return Object.assign({},state,{
                isFetching:false,
                nextPersonErrorMessage:action.message,
            })
        }
        case DETAILTYPE.NEXTTHINGS_MAP_REQUEST:{
            return Object.assign({},state,{

            })
        }
        case DETAILTYPE.NEXTTHINGS_MAP_SUCCESS:{
            return Object.assign({},state,{
                thingsMap:action.thingsMap,
            })
        }
        case DETAILTYPE.DEPANDUSER_MAP_REQUEST:{
            return Object.assign({},state,{

            })
        }
        case DETAILTYPE.DEPANDUSER_MAP_SUCCESS:{
            return Object.assign({},state,{
                depAndUser:action.depAndUser,
            })
        }
        
        default:
            return state;
    }
}

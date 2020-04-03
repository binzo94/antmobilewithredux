import * as MEETINGMANAGE from '../constants/meetingManageType.js';
const initialState = {
    isFetching:false,
    data:[],
    isloading:false,
    nomore:false
};

export default function meetingManage(state=initialState,action){
    switch(action.type){
        //会议安排
        case MEETINGMANAGE.MEETINGARRANGE_REQUEST:
            return Object.assign({},state,{
                isFetching:true
            })
        case MEETINGMANAGE.MEETINGARRANGE_HASMORE:
            return Object.assign({},state,{
                nomore:action.nomore
            })
        case MEETINGMANAGE.MEETINGARRANGE_SUCCESS:
            if(action.isquery){
                return Object.assign({},state,{
                    isFetching:false,
                    data:action.data
                })

            }
            else{
                var hasnomore=false;
                if(action.data.length==0){
                    hasnomore=true
                }
                return Object.assign({},state,{
                    isFetching:false,
                    isloading:false,
                    data:state.data.concat(action.data),
                    nomore:hasnomore
                })
            }
        case MEETINGMANAGE.MEETINGARRANGE_ISLOADING:
            return Object.assign({},state,{
                isloading:action.isloading
            })
        case MEETINGMANAGE.MEETINGARRANGE_NOFETCH:
            return Object.assign({},state,{
                isFetching:false
            })
        //会议详情
        case MEETINGMANAGE.MEETINGDETAIL_REQUEST:
            return Object.assign({},state,{
                isFetching:true
            })
        
        case MEETINGMANAGE.MEETINGDETAIL_SUCCESS:
            return Object.assign({},state,{
                isFetching:false,
                meetingDetailData:action.data
            })
        default:
            return state;
    }
}

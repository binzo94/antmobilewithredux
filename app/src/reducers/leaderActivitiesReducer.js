import * as LEADEACTIVITIES from '../constants/leaderActivitiesType.js';
const initialState = {
};

export default function leaderActivities(state=initialState,action){
    switch(action.type){
        case LEADEACTIVITIES.ACTIVITIES_REQUEST:
            return Object.assign({},state,{
                isFetching:true
            })
        case LEADEACTIVITIES.ACTIVITIES_SUCCESS:
            return Object.assign({},state,{
                isFetching:false,
                data:action.data
            })
        case LEADEACTIVITIES.ACTIVITIES_NOFETCH:
            return Object.assign({},state,{
                isFetching:false,
            })
        
        case LEADEACTIVITIES.ACTIVITIESDETAIL_REQUEST:
            return Object.assign({},state,{
                isFetching:true
            })
        case LEADEACTIVITIES.ACTIVITIESDETAIL_SUCCESS:
            return Object.assign({},state,{
                isFetching:false,
                activityDetailData:action.data
            })
        
        default:
            return state;

    }
}
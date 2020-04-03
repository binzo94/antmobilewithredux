import * as BACKLOG from '../constants/backlogType.js';
const initialState = {
};

export default function backlog(state=initialState,action){
    switch(action.type){
        case BACKLOG.BACKLOG_REQUEST:
            return Object.assign({},state,{
                isFetching:true
            })
        case BACKLOG.BACKLOG_SUCCESS:
            return Object.assign({},state,{
                isFetching:false,
                data:action.data
            })
        case BACKLOG.BACKLOG_NOFETCH:
            return Object.assign({},state,{
                isFetching:false,
            })
        default:
            return state;

    }
}
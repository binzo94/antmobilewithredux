import * as MATTERCHOOOSE from '../constants/matterChooseType.js';
require('es6-object-assign').polyfill();

const initialState ={
	data:[],
	isFetching: false,
};

export default function matterChoose(state=initialState,action){
	switch(action.type){
      case MATTERCHOOOSE.MATTERCHOOSE_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
            data:[]
        })
        case MATTERCHOOOSE.MATTERCHOOOSETYPE_HASMORE:
            return Object.assign({},state,{
                nomore:action.nomore
            })
      case MATTERCHOOOSE.MATTERCHOOSE_SUCCESS:
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
        case MATTERCHOOOSE.MATTERCHOOOSE_ISLOADING:
            return Object.assign({},state,{
                isloading:action.isloading
            })
        case MATTERCHOOOSE.MATTERCHOOSE_COUNT:
            return Object.assign({},state,{
                count:action.count
            })
        case MATTERCHOOOSE.MATTERCHOOOSE_NOFETCH:
            return Object.assign({},state,{
                isFetching:false
            })
      case MATTERCHOOOSE.MATTERCHOOSE_FAILED:
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.message
        })
      default:
        return state;
    }
}

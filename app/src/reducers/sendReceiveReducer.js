import * as MANAGE from '../constants/sendReceiveManageType.js';
const initialState = {
};
//初始化时设置默认值会导致数组读取异常报错
export default function sendReceiveManage(state=initialState,action) {
    switch(action.type){
      case MANAGE.AMOUNT_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
        })
      case MANAGE.AMOUNT_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            totalcount:action.data,
        })

      case MANAGE.AMOUNT_FAILED:
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.message
        })
      default:
        return state;
    }
}

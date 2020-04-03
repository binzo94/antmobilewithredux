import * as MANAGE from '../constants/libraryManageType.js';
const initialState = {
};
//初始化时设置默认值会导致数组读取异常报错
export default function libraryManage(state=initialState,action) {
    switch(action.type){
      case MANAGE.LIBRARY_AMOUNT_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
        })
      case MANAGE.LIBRARY_AMOUNT_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            totalcount:action.data,
        })

      case MANAGE.LIBRARY_AMOUNT_FAILED:
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.message
        })
      default:
        return state;
    }
}

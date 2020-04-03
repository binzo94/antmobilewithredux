import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './loginReducer.js';
import transaction from './transactionReducer.js';
import matterChoose from './matterChooseReducer.js';
import detail from './detailReducer.js';
import sendReceiveManage from './sendReceiveReducer.js';
import meetingManage from './meetingManageReducer.js';
import libraryManage from './libraryReducer.js';
import leaderActivities from './leaderActivitiesReducer.js';
import backlog from './backlogReducer.js';
const rootReducer = combineReducers({
	login,
	transaction,
	matterChoose,
	detail,
	sendReceiveManage,
	meetingManage,
	libraryManage,
	leaderActivities,
    backlog,
	routing: routerReducer
});

export default rootReducer
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory,Route,Router,IndexRoute} from 'react-router';
import configStore from './configStore.js';
import Login from './components/Login/login.js';
import MatterChoose from './components/matterChoose/MatterChoose.js';
import Detail from './components/detail/Detail.js';
import HomePage from './components/homePage/homePage.js';//首页
import SendManage from './components/sendReceiveManage/sendManage.js';//发文管理
import ReceiveManage from './components/sendReceiveManage/receiveManage.js';//收文管理
import MeetingArrange from './components/meetingManage/meetingArrange.js';
import LeaderActivity from './components/leaderAct/LeaderActivity.js';
import Backlog from "./components/Backlog/Backlog";
import FastClick from "fastclick";
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
const store = configStore();
ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" >
		      <IndexRoute component={Login}/>
				<Route path='/login' component={Login} />
		      <Route path='/login/:userId' component={Login} />
                <Route path='/backlog/:userName' component={Backlog} />
			  <Route path='/homePage/:userName' component={HomePage} />
			  <Route path='/homePage/:userName/:passWord/:type' component={HomePage} />
			  <Route path='/sendManage/:userName' component={SendManage} />
			  <Route path='/receiveManage/:userName' component={ReceiveManage} />
		      <Route path='/matterChoose/:userName/:processType/:matterType' component={MatterChoose}/>
		      <Route path='/detail1/:userName/:runID/:dbID/:matterType/:processType(/:backlog)' component={Detail} />
			  <Route path='/meeting/:userName' component={MeetingArrange} />
			  <Route path='/leaderActivity/:userName' component={LeaderActivity} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
)

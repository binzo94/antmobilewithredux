import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory,Route,Router,IndexRoute} from 'react-router';
import configStore from './configStore.js';
import Login from './components/Login/login.js';
import MatterChoose from './components/matterChoose/MatterChoose.js';
import libraryChoose from './components/matterChoose/libraryChoose.js';
import Detail from './components/detail/Detail.js';
import SendManage from './components/sendReceiveManage/sendManage.js';//发文管理
import ReceiveManage from './components/sendReceiveManage/receiveManage.js';//收文管理
import MeetingArrange from './components/meetingManage/meetingArrange.js';
import LeaderActivity from './components/leaderAct/LeaderActivity.js';
import Backlog from "./components/Backlog/Backlog";
import library from './components/library/libraryManage.js';
import query from './components/query/queryChoose.js';
import FastClick from "fastclick";
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
const store = configStore();
const Homepage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/homePage/homePage.js').default)
    },'homepage')
};
ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" >
                <IndexRoute component={Login}/>
                <Route path='/login' component={Login} />
                <Route path='/login/:userId' component={Login} />
                <Route path='/backlog/:userName' component={Backlog} />
                <Route path='/homePage/:userName' getComponent={Homepage} />
                <Route path='/homePage/:userName/:passWord(/:type)' getComponent={Homepage} />
                <Route path='/sendManage/:userName' component={SendManage} />
                <Route path='/receiveManage/:userName' component={ReceiveManage} />
                <Route path='/matterChoose/:userName/:processType/:matterType' component={MatterChoose}/>
                <Route path='/detail1/:userName/:runID/:dbID/:matterType/:processType(/:backlog)' component={Detail} />
                <Route path='/meeting/:userName' component={MeetingArrange} />
                <Route path='/leaderActivity/:userName' component={LeaderActivity} />
                <Route path='/library/:userName' component={library} />
                <Route path='/query/:userName' component={query} />
                <Route path='/libraryChoose/:userName/:processType' component={libraryChoose} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)

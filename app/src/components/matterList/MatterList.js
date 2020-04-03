import * as PATH from '../../config/path.js';
import React from 'react';
import {WingBlank,WhiteSpace,Toast} from 'antd-mobile';
import head_img from './head.png';
import date_img from './date.png';
import person_img from './person.png';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import './MatterList.less';
class MatterList extends React.Component{
    _viewDetail(){//校验是否有下一个步骤。
        let runID = this.props.data.RUNID;
        let dbID = this.props.data.DBID_;
        let matterType = this.props.matterType;
        let processType = this.props.processType;
        let skipUrl='/detail1/'+this.props.userName+'/'+runID+'/'+dbID+'/'+matterType+'/'+processType;
        if(matterType==0){//待办
            var _params = "processName="+this.props.data.NAME+"&activityName="+this.props.data.ACTIVITY_NAME_+"&runId="+this.props.data.RUNID+"&taskId="+dbID;
            var url =PATH.BASEPATH+'getNextThings.do';
            fetch(url+'?'+_params,{
                method:'GET',
                credentials: 'include',
                headers:{
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                mode:'cors'
            }).then(res=>{
                if(res.status == 200){
                    return res.json();
                }
                if(res.status === 503){
                    hashHistory.push('/login');
                }
            }).then(json=>{
                if(json!=""){
                    let thingsMap = JSON.parse(json).activitys;
                   hashHistory.push({pathname:skipUrl,state:thingsMap});
                }else{
                        Toast.fail('暂不支持该步骤', 2);
                }
            }).catch(e=>{
            });
        }else{
            hashHistory.push({pathname:skipUrl});
        }
    }
	render(){
        let message;
        message = (
            <div className='matterList'>
                <WingBlank size = 'lg'>
                <WhiteSpace size = 'lg' />
                    <div className = 'head'>
                        <ul>
                            <li><img src={head_img}/></li>
                            <li><span>{this.props.data.ACTIVITY_NAME_}</span></li>
                            <li className='detail'><span onClick={this._viewDetail.bind(this)}>查看详情</span></li>
                        </ul>
                    </div>
                    <div className='content' onClick={this._viewDetail.bind(this)}>
                        <div className='left'>
                            <div className='up'>
                                <div className='mark'>
                                    <img src={date_img} alt='日期'/>
                                </div>
                                <div className="marktext">{this.props.data.CREATETIME}</div>
                            </div>
                            <div className='down'>
                                <div className='mark'>
                                    <img src={person_img} alt='姓名' />
                                </div>
                                <div className="marktext">{this.props.data.CREATOR}</div>
                            </div>
                        </div>
                        <div className='right'>
                            <WingBlank size = 'lg'>
                            <WhiteSpace size ='sm' />
                                <textarea className='textarea'readOnly='true' value={this.props.data.SUBJECT} />
                            <WhiteSpace size = 'sm' />
                            </WingBlank>
                        </div>
                    </div>
                <WhiteSpace size = 'lg' />
                </WingBlank>
            </div>
        );
        return message;
    }
}
export default MatterList;

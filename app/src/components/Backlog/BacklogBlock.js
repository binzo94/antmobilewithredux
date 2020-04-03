import { WingBlank,WhiteSpace } from 'antd-mobile';
import React from 'react';
import './BacklogBlock.less';
import date_img from '../matterList/date.png';
import person_img from '../matterList/person.png';
import todo from '../sendReceiveManage/todo.png';
import {hashHistory} from "react-router";
import * as PATH from "../../config/path";
import {Toast} from "antd-mobile/lib/index";
class BacklogBlock extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick=()=>{//校验是否有下一个步骤。
            let runID = this.props.data.RUNID;
            let dbID = this.props.data.DBID_;
            let matterType = 0;
            let processType = this.props.data.PROCESSTYPE;
            let skipUrl='/detail1/'+this.props.userName+'/'+runID+'/'+dbID+'/'+matterType+'/'+processType+'/backlog';
            console.log(skipUrl);
            var _params = "processName="+this.props.data.NAME+"&activityName="+this.props.data.ACTIVITY_NAME_+"&runId="+this.props.data.RUNID;
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

    }
    render() {
        return (  <div className='backlogList' onClick={this.handleClick}>
            <WingBlank size = 'lg'>
                <WhiteSpace size = 'lg' />
                <div className = 'head'>
                    <ul>
                        <li className = 'li1'><img src={todo}/></li>
                        <li className = 'li2'>{this.props.data.NAME}</li>
                        <li className='detail'>查看详情</li>
                    </ul>
                </div>
                <div className='content'>
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
        </div>);
    }
}
export default BacklogBlock;
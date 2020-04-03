import * as PATH from '../../config/path.js';
import React from 'react';
import {WingBlank,WhiteSpace,Toast} from 'antd-mobile';
import head_img from './head.png';
import date_img from './date.png';
import person_img from './person.png';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import './QueryList.less';
class QueryList extends React.Component{
    _viewDetail(){//校验是否有下一个步骤。
        let archivesId = this.props.data.ARCHIVESID;
        let runID = this.props.data.RUNID;
        let processType = this.props.data.ARCHTYPE;
        let skipUrl='/detail1/'+this.props.userName+'/'+runID+'/'+1+'/'+2+'/'+processType;
        hashHistory.push({pathname:skipUrl,state:archivesId});
    }
	render(){
        let message;
        message = (
            <div className='QueryList'>
                <WingBlank size = 'lg'>
                <WhiteSpace size = 'lg' />
                    <div className = 'head'>
                        <ul>
                            <li><img src={head_img}/></li>
                            <li><span>{this.props.data.ARCHIVESNO==0?'未编号':this.props.data.ARCHIVESNO}</span></li>
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
                                <div className="marktext">{this.props.data.ISSUER}</div>
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
export default QueryList;

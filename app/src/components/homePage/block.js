import React from 'react';
import {hashHistory} from 'react-router';
import * as PATH from '../../config/path.js';
import {Toast} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMailSid} from '../../action/loginAction.js';
//引入样式
import './block.less';
function mapStateToProps(state){
    return {
        mailMsg:state.login.mailMsg
    }
}

function mapDispatchToProps(dispatch){
    return {
        getMailSid:()=>dispatch(getMailSid())
    }
}

class Block extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    changePage(title){
        if(title==='发文管理'){
            hashHistory.push('/sendManage/'+this.props.userName);
        }
        else if(title==='收文管理')
            hashHistory.push('/receiveManage/'+this.props.userName);
        else if(title==='我的邮箱'){
            if(this.props.mailMsg!=undefined&&this.props.mailMsg!=''){
                window.location.href =PATH.EMAILPATH+'?sid='+(this.props.mailMsg.sid)+'#module=folder';
            }else{
                this.props.getMailSid();
                Toast.info('邮箱数据加载中。。。',2);
                
            }
        }
        else if(title==='待办事项')
            hashHistory.push('/backlog/'+this.props.userName);
        else if(title==='领导活动')
        {
            hashHistory.push('/leaderActivity/'+this.props.userName);
        }
        else if(title==='会议查询')
            hashHistory.push('/meeting/'+this.props.userName);
        else if(title==='收发文库')
            hashHistory.push('/library/'+this.props.userName);
        else if(title==='公文查询')
            hashHistory.push('/query/'+this.props.userName);
    } 
    
    insertContent(){
        let insert;
        let count = 0;
        if(this.props.totalcount!=undefined){
            if(this.props.title==='发文管理')
                count = this.props.totalcount[0].count;
            if(this.props.title==='收文管理')
                count = this.props.totalcount[2].count;
            if(this.props.title==='待办事项')
                count = parseInt(this.props.totalcount[0].count)+parseInt(this.props.totalcount[2].count);
        }
        if(this.props.title==='我的邮箱')
        if(this.props.mailMsg!=null){
            count = this.props.mailMsg.count;
        }
        if(count != 0&&count!=undefined)
            insert = (
                <div className='promptContent'> 
                    <span>{count}</span>
                </div>
            );
        else    
            insert = (
                <div className='propmpt'></div>
            );
        return insert;
    }

    render(){
        return (
            <div className='block' onClick={this.changePage.bind(this,this.props.title)}>
                <div className='imgContent'>
                    <img src={this.props.imgPath} alt='图片'/>
                </div>
                <div className='titleContent'>
                        <span>{this.props.title}</span>
                </div>
                
                {this.insertContent()}
                
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Block);
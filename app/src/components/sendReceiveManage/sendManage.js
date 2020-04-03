import React from 'react';
import {connect} from 'react-redux';
import {NavBar,Icon} from 'antd-mobile';
import {hashHistory} from 'react-router';
import {getAmount} from '../../action/sendReceiveManageAction.js';
//引入组件
import SendReceiveBlock from './sendReceiveBlock.js';
//引入样式
import './sendReceiveManage.less';
//引入图片
import todo from './todo.png';
import doing from './doing.png';
function mapStateToProps(state){
    return {
        totalcount:state.sendReceiveManage.totalcount
    }
}

function mapDispatchToProps(dispatch){
    return {
        getAmount:()=>dispatch(getAmount()), //获取在办待办数量
    }
}

const images = [todo,doing];

class SendManage extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        this.props.getAmount();//获取在办待办件数量
    }

    insert(){
        let data = [];
        if(this.props.totalcount!=undefined){
            data.push(this.props.totalcount[0]);
            data.push(this.props.totalcount[1]);
        }

        let insert ;
        insert = (
            data.map((item,index)=>{
                return <SendReceiveBlock key={index} imgURL={images[index]} data={item} userName={this.props.params.userName}/>
            })
        );
        return insert;
    }
    render(){
        return (
            <div className='sendReceiveManage'>
                <NavBar
                    leftContent="返回"
                    icon={<Icon type="left" />}
                    mode="light"
                    onLeftClick={()=>{
                    /*  hashHistory.push('/homePage/'+this.props.params.userName);*/
                        hashHistory.goBack()
                    }}
                >
                   <span >发文管理</span>
                </NavBar>
                <div>
                    {this.insert()}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SendManage);

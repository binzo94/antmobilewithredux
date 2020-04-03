import React from 'react';
import {connect} from 'react-redux';
//引入组件
import {Icon,NavBar,Modal} from 'antd-mobile';
import Block from './block.js';
//引入图片
import com_logo from './company.png';
import bg_logo from './head.png';
import bussiness from './icon_bussiness.png';
import bussiness1 from './icon_bussiness1.png';
import leader from './icon_leader.png';
import message from './icon_message.png';
import metting from './icon_metting.png';
import myemail from './icon_myemail.png';
import recieve from './icon_recieve.png';
//引入样式
import './homePage.less';
import {hashHistory} from 'react-router';
const alert = Modal.alert;
import {cancellation,loginBySkip,getMailSid,getMailCount,checkVersion} from '../../action/loginAction.js';
import {getAmount} from '../../action/sendReceiveManageAction.js';
import judge from "../../judge";
import setupWebViewJavascriptBridge from "../../callios";
import {saveChannelID} from "../../action/loginAction";
function mapStateToProps(state){
    return {
        cancelLogin:state.login.cancelLoginValue,
        totalcount:state.sendReceiveManage.totalcount,
        mailMsg:state.login.mailMsg,
        mailCount:state.login.mailCount,
        versionurl:state.login.versionurl
    }
}

function mapDispatchToProps(dispatch){
    return {
        //gljypLogin:(userName,passWord)=>dispatch(gljypLogin(userName,passWord)),
        cancellation:()=>dispatch(cancellation()),
        getAmount:()=>dispatch(getAmount()), //获取在办待办数量
        loginBySkip:(userName,passWord)=>dispatch(loginBySkip(userName,passWord)),
        getMailSid:()=>dispatch(getMailSid()),
       //getMailCount:()=>dispatch(getMailCount()),
        checkVersion:()=>dispatch(checkVersion())
    }
}

const images = [
    myemail,
    message,
    recieve,
    //metting,
    //leader,
    //bussiness,
    //bussiness1
];
const title = [
    '我的邮箱',
    '发文管理',
    '收文管理',
    //'会议查询',
    //'领导活动',
    //'待办事项',
    //'收发文库'
    //'公文查询'
];

const CustomIcon = ({ type, className = '', size = 'md', ...restProps }) => (
    <svg className={`am-icon am-icon-${type.substr(1)} am-icon-${size} ${className}`}
         {...restProps}
    >
        <use xlinkHref={type} />
    </svg>
);
class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userName:this.props.params.userName,
            passWord:this.props.params.passWord,
            type:this.props.params.type,
            isClick:false//false:未点击菜单栏  true：点击菜单栏
        }
    }

    componentWillMount(){
        if(!sessionStorage.getItem('hascheck')){
            this.props.checkVersion();
        }
        if(this.props.params.type==1){
            this.props.loginBySkip(this.props.params.userName,this.props.params.passWord);
        }
    }
    componentWillReceiveProps(next){
        if(next.total!==0 && !this.timer) {
            this.timer = setInterval(
                () => {
                    this.props.getAmount();
                },
                1000*60*2
            );
        }
    }
    componentDidMount(){
        if(this.props.params.type!=1){
            this.props.getAmount();
            this.props.getMailSid();
            /* this.props.getMailCount();*/
        }
        else{

        }
    }
    goBack(){
        /* if(this.props.params.processType==0)
             hashHistory.push('/sendManage/'+this.props.params.userName);
         else
             hashHistory.push('/receiveManage/'+this.props.params.userName);*/

        if(judge()){
            androidConnector.logout();
        }else{
            setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('backMainWindow', function(data) {

                })
            })
        }

     }
     insertalert=()=>{
        if(this.props.versionurl!=""&&this.props.versionurl!=undefined&&sessionStorage.getItem('shownewversion')==undefined){
         const alertInstance = alert('更新提示', 'app有新版本，是否立即更新？', [
             { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
             { text: '确认', onPress: () => {this.downfile.href=this.props.versionurl;this.downfile.click()} },
         ]);
            sessionStorage.setItem('shownewversion',"0");
         }

     }
    handleClick(){
        this.setState({
          isClick:!this.state.isClick
        });
    }
    //注销账户
    cancellation(){
        this.props.cancellation();
    }

    insertContent(){
        let insert;
        insert = (
            images.map((item,index)=>{
              return  <Block key={index}
                        imgPath={images[index]}
                        title={title[index]}
                        userName={this.state.userName}
                        totalcount={this.props.totalcount}
                            mailMsg={this.props.mailMsg}
                        mailCount={this.props.mailCount}
                      />
            })
        );
        return insert;
    }
    render(){

        return (
            <div className='homePage'>
                <NavBar
                    //icon={<CustomIcon type={require('../../images/step/menu.svg')} />}
                    /* <div className={this.state.isClick?'menu':'menuBar'}>
                    <div className='menuOperator'>
                         <span onClick={this.cancellation.bind(this)}>注销账号</span>
                    </div>
                 </div>
                    mode="light"
                    onLeftClick={()=>{
                        this.handleClick()
                    }}*/
                    leftContent="返回"
                      ref={el => this.lv1 = el}
                   style={{position:"fixed",left:"0px",top:"0px",width:"100%"}}

                      icon={<Icon type="left" />}
                  onLeftClick={()=>{
                      this.goBack();
                  }}
                  mode="light"
                    >
                    <span >移动办公</span>
                </NavBar>

                <div className='head'>
                    <img src={bg_logo} alt='head_img' />
                </div>
                <div className='operatorBox'>
                   {this.insertContent()}
                </div>
                <div className='company'>
                    <div className="com_logo">
                        <img src={com_logo} alt=""/>
                    </div>
                    <div className='tech_com'>
                             <p>技术支持：重庆旺山实业有限公司</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);

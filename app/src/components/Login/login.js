import React from 'react';
import {WingBlank,WhiteSpace,InputItem,Button,Toast,Checkbox,List} from 'antd-mobile';
import {connect} from 'react-redux';
import { createForm } from 'rc-form';
import {login,cancellation,saveChannelID,QWTLogin,gljypLogin} from '../../action/loginAction.js';
import {hashHistory} from 'react-router';


//引入样式
import './login.less';

//引入背景图片
//import bg_img from './background.png';
//import bg_img from './background_1.png';
import bg_img from './backgroundglj.jpg';
const CheckboxItem = Checkbox.CheckboxItem;

function mapStateToProps(state){
    return {
        userName:state.login.userName,
        success:state.login.success,
        cancelLoginValue:state.login.cancelLoginValue,
    };
}

function mapDispatchToProps(dispatch){
    return {
        gljypLogin:(userName,passWord)=>dispatch(gljypLogin(userName,passWord)),
        login:(userName,passWord,remember,autoLogin)=>dispatch(login(userName,passWord,remember,autoLogin)),
        cancellation:()=>dispatch(cancellation()),
        saveChannelID:(id)=>dispatch(saveChannelID(id)),
        QWTLogin:(userId)=>dispatch(QWTLogin(userId)),
    };
}


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           checked:localStorage.getItem('remember')=='true',
           astrict:true
        }
    }

    componentDidMount(){

    }
    componentWillMount(){
       /* if(this.props.params.userName!=null){
            let userName = this.props.params.userName;
            let passWord = this.props.params.passWord;
            this.props.login(userName,passWord,'false','false');
        }*/

        if(localStorage.getItem('autoLogin')==='true'){
            let userName = localStorage.getItem('userName');
            let passWord = localStorage.getItem('passWord');
            this.props.login(userName,passWord,true,true);
           // hashHistory.push('/homePage/'+userName);
        }
    }

    handleClick(){
        let userName = this.props.form.getFieldsValue().userName;
        let passWord = this.props.form.getFieldsValue().passWord;
        let remember = this.state.checked;//是否记住密码
        let autoLogin = this.props.form.getFieldsValue().autoLogin;//是否自动登录
        this.props.login(userName,passWord,remember,autoLogin);
    }

    render(){

        let height = window.innerHeight || document.body.clientHeight;
        const loginStyle = {
          height:height,
          backgroundImage:`url(${bg_img})`
        }
        const { getFieldProps } = this.props.form;

        var params=this.props.params;
        if(params.userId!=null){
            this.props.QWTLogin(params.userId);
        }
        var params1=this.props.location.query;
        if(params1.passWord!=null&&this.state.astrict){
            params1.passWord = decodeURI(params1.passWord)
            console.log("参数测试")
            console.log(params1.passWord)
            this.props.gljypLogin(params1.userName,params1.passWord);
            this.setState({astrict:false});
        }


        return (
            <div className='login' style={loginStyle}>
                <div className='operator'>
                    <div className='inputBox'>
                        <div className='inputField'>
                            <div className='title'>用户名：</div>
                            <div className='inputContent'>
                                <InputItem
                                    {...getFieldProps('userName', {
                                        initialValue:localStorage.getItem('remember')==='true'?localStorage.getItem('userName'):"",
                                    })}
                                    placeholder="请输入用户名"
                                    clear
                                />
                            </div>
                        </div>

                        <WhiteSpace size='lg' />
                        <WhiteSpace size='lg' />

                        <div className='inputField'>
                            <div className='title'>密&nbsp;码：</div>
                            <div className='inputContent'>
                                <InputItem
                                    {...getFieldProps('passWord', {
                                        initialValue:localStorage.getItem('remember')==='true'?localStorage.getItem('passWord'):"",
                                    })}
                                    type="password"
                                    placeholder="请输入密码"
                                    clear
                                />
                            </div>
                        </div>
                        <WhiteSpace size='lg' />
                        <div className='chooseBox'>
                            <CheckboxItem
                                {...getFieldProps('remember', {
                                })}
                                className='checkBox'
                                key="remember"
                                checked={this.state.checked}
                                onChange={(e)=>{
                                    this.setState({
                                        checked:e.target.checked
                                    })
                                }}
                                style={{float:"left"}}
                                >
                                <span>记住密码</span>
                            </CheckboxItem>

                            <CheckboxItem
                                {...getFieldProps('autoLogin', {

                                })}
                                key="autoLogin"
                                className='checkBox'
                                style={{float:"right"}}
                                >
                                <span>自动登录</span>
                            </CheckboxItem>
                        </div>
                    </div>

                    <div className='buttonBox'>
                        <Button className="btn" onClick={this.handleClick.bind(this)}>
                            <span>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</span>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}


const loginComponent = createForm()(Login);
export default connect(mapStateToProps,mapDispatchToProps)(loginComponent);

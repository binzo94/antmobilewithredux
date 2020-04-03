import React from 'react';
import { Button, Flex, WingBlank } from 'antd-mobile';
import {Redirect,withRouter} from "react-router-dom";
import bg_img from './bg.png';
import logo_img from './logo.png';
import words_img from './words.png';
import './Welcome.less';
import {hashHistory} from 'react-router';
require('es6-object-assign').polyfill();
class Welcome extends React.Component{
	constructor(){
      super();
			this.state = {
				login:false//是否跳转
			}
  }

	componentDidMount(){
		if(localStorage.getItem('autoLogin')==='true'){
			// console.log("888");
			this.props.history.push('/transaction');
		}
	}

	
	handleClick = e =>{
		/*this.setState({
			login:true
		})*/
		hashHistory.push('/login');
	}

	render(){
		const buttonStyle = {
			marginTop:"50%",
		}
		let height = window.innerHeight || document.body.clientHeight;
		const welcommeStyle = {
			height:height,
			backgroundImage:`url(${bg_img})` 
		}
		

		return (
			<div className='welcome' style={welcommeStyle}>
				<div className='logo'>
					<img src={logo_img} alt='logo'/>
				</div>
				<div className='words'><img src={words_img} alt='文字'/></div>
				<div>
					<WingBlank>
							<Button type="primary" onClick={this.handleClick} style={buttonStyle}>登录</Button>
					</WingBlank>
				</div>
			</div>

			)
	}
}

export default withRouter(Welcome);

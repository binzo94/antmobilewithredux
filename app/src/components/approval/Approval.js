import React from 'react';
import {Modal,Button,Radio,List,Flex,InputItem,TextareaItem} from 'antd-mobile';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {getComments} from '../../action/detailAction.js';
import './Approval.less';
const RadioItem = Radio.RadioItem;

function mapStateToProps(state){
  return {
  	approvalOpinions:state.detail.approvalOpinions,
  	taskState:state.detail.taskState //当前步骤状态
  };
}

function mapDispatchToProps(dispatch){
  return {
  	getComments:()=>dispatch(getComments()),
  };
}
class Approval extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
            modal: false,
            radio: ""
        };
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		this.props.getComments();
	}

	showModal = key => (e) => {
		// 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
    	// 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
		e.preventDefault();
		this.setState({
			[key]: true,
		});
	}

	onClose(){
		this.setState({
	      modal:false,
            radio: ""
	    })
	}
 
  onOk = key => () => {
    this.setState({
			[key]: false,
      suggestion:this.state.radio
		});
      ReactDOM.findDOMNode(this.customFocusInst).querySelector("textarea").focus();
      //ReactDOM.findDOMNode(this.customFocusInst).querySelector("textarea").blur();
			this.props.setcomments(this.state.radio); //审批意见
			ReactDOM.findDOMNode(this.customFocusInst).querySelector("textarea").blur();
  }

	onChange = (value) => {
		this.setState({
			radio: value
		})
	};
	handleChange(event) {
		this.setState({
			radio: event
		});
		this.props.setcomments(event); //审批意见
  }
	spanStyle(){
		let array = [];
        let value;
        let be_style= {
            color:'#c4c4c4',
            position:'relative',
            left:'-100px'
        };
        let af_style={
            color:'RGB(51,51,51)',
            position:'relative',
            left:'-100px'
        };
        array.push(be_style);
        array.push(af_style);

        if(!this.state.radio)
            value='请填入意见';
        else{
            value =this.state.radio;
        }
        array.push(value);
        return array;
	}

  changeSuggestion = (val) =>{
		this.props.showConfirm++;
    this.setState({
      suggestion:val
    },()=>{
      this.props.setApprovalOpinion(this.state.suggestion==""?false:true);
      this.props.setcomments(Object.assign({},{label:this.state.suggestion})); //审批意见
			this.props.opinion(this.state.suggestion===""?false:true);
    })

  }

	render(){
		let sureChoose = false;	
		
		if(this.props.submenuStatus==2){
			if(this.props.nextSecondHandlePeople){
				sureChoose = true;
			}
		}
		else{
			if(this.props.nextHandlePeople){
				sureChoose = true;
			}
		}
		let message;
		if(this.props.approvalOpinions.length === 0)
			message = (
				<div>请稍等</div>
			);
		else
			message = (
				<div className='approval' >
					 <Flex direction="row" justify="start" style={{overflow:"hidden"}}>
					 <Flex.Item><span className='title'>审批意见:</span></Flex.Item>
					 <Flex.Item style={{flexShrink: 1,flex:"2"}}>
							<TextareaItem
							//	title="审批意见:"
								placeholder="请输入审批意见"
								data-seed="logId"
								style={{position:'relative',left:'-20px',fontSize:"0.33rem",fontWeight:"300"}}
								autoHeight
								value={this.state.radio}
								onChange={this.handleChange}
								ref={el => this.customFocusInst = el}
							/>
							 </Flex.Item>
				      <Flex.Item>
				      	<Button className="btn"
                type="primary"
                inline size="small"
								onClick={this.showModal('modal')}
               // disabled={sureChoose ||this.props.taskState[0].status=='0'||this.props.submenuStatus=='0'? '':'disbaled'}
                >选择意见</Button>
				      </Flex.Item>
				    </Flex>

				    <Modal
			          title="请选择审批意见"
								transparent
								className='advice'
                      closable={true}
			          maskClosable={false}
			          visible={this.state.modal}
			          onClose={this.onClose.bind(this)}
			          footer={[
                          { text: '取消', onPress: () => { this.setState({
														modal:false,
														radio: ""
													})} },
			          	{ text: '确定', onPress: () => { this.onOk('modal')(); } }
			          	]}
			          style={{width:'90%'}}
			        >
				        <List>
				        	{this.props.approvalOpinions.map((item, index) => {
  								  return (
  									    <RadioItem key={index} checked={this.state.radio === item.LABEL} onChange={() => this.onChange(item.LABEL)}>
  										     {item.LABEL}
  					        		</RadioItem>
  					        	);
				        	})}
					    </List>
			        </Modal>
				</div>
			);
		return message;
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Approval);

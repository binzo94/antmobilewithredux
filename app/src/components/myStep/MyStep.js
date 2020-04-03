import React from 'react';
import {Steps,WingBlank,WhiteSpace,Icon} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMatterInfoByID,getProcess} from '../../action/detailAction.js';
import './MyStep.less';
const Step = Steps.Step;
const CustomIcon = ({ type, className = '', size = 'md', ...restProps }) => (
    <svg className={`am-icon am-icon-${type.substr(1)} am-icon-${size} ${className}`}
         {...restProps}
    >
        <use xlinkHref={type} />
    </svg>
);

const waitSvg = <CustomIcon type={require('../../images/step/ellipsis-circle.svg')} />
const finishSvg =<CustomIcon type={require('../../images/step/finish.svg')} />

function mapStateToProps(state){
  return {
  	cardListData:state.detail.cardListData,
  	processData:state.detail.processData,//审批流程信息
  };
}

function mapDispatchToProps(dispatch){
  return {
  	getMatterInfoByID:(runID,type,dbID)=>dispatch(getMatterInfoByID(runID,type,dbID)),
  	getProcess:(runID)=>dispatch(getProcess(runID)),
  };
}

class MyStep extends React.Component{

	constructor(props) {
        super(props);
        this.state = {
            waitData: {},
            data: []
        }

    }

    componentDidMount(){
    // 	let runID = '7168990';
		// let type = 0; //type 0:待办 1:在办
		// let dbID = '7173163';
		// this.props.getMatterInfoByID(runID,type,dbID);

		let waitData = {
            creator: this.props.cardListData.USERNAME,
            tackName: this.props.cardListData.ACTIVITYNAME,
            reviewUserName: this.props.cardListData.REVIEW_USER_NAME
        };
        this.props.getProcess(this.props.runID);
        this.setState({
        	waitData:waitData,
        });

    }


    rendItem() {

        let count = 0;
        let insertWait;
        if (this.state.waitData) {
            insertWait = [<Step key={count++} status="error" title="当前办理人" icon={waitSvg}
            description={"未确认 " + this.props.cardListData.PROCESSUSERNAME}/>];
            if(this.props.cardListData.PROCESSUSERNAME==null){
                insertWait = [];
            }
           
        } else {
            insertWait = [<Step className='sm-title' key={count++} status="error" icon={waitSvg}/>];
        }

        let insertFinish = this.props.processData.map((item) => {
          if(item.COMMENTS != null){
              return (
                <Step key={count++} status="finish" title={item.ACTIVITYNAME} icon={finishSvg}
                    description={item.CREATETIME + " " + item.CREATORNAME+ " " +item.COMMENTS}/>
              );
          }
          else {
              return (
                <Step key={count++} status="finish" title={item.ACTIVITYNAME} icon={finishSvg}
                    description={item.CREATETIME + " " + item.CREATORNAME}
                />
              );
          }
        });

        let insert = insertWait.concat(insertFinish);
        return insert;

    }

	render(){
		let message;
		message = (
			<div className = 'myStep'>
				<WingBlank size='lg' className='steps'>
					<div className="sub-title">流程审批信息：</div>
	                <WhiteSpace />
	                <WingBlank size="lg" className="mySteps">
	                    <Steps size="small">
	                        {this.rendItem()}
	                    </Steps>
	                </WingBlank>
				</WingBlank>
			</div>
		);
		return message;
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(MyStep);

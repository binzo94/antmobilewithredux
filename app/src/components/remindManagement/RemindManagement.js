import React from 'react';
import {Flex,List,WhiteSpace,Checkbox,Button,Radio,Toast,Icon} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMatterInfoByID,getNextTask,nextStepSubmit,updateIsPublicInfo} from '../../action/detailAction.js';
import * as PATH from '../../config/path.js';
import './RemindManagement.less';
import {hashHistory} from 'react-router';
require('es6-object-assign').polyfill();

const CheckboxItem = Checkbox.CheckboxItem
const RadioItem = Radio.RadioItem;

function mapStateToProps(state){
  return {
    cardListData:state.detail.cardListData,
    nextTaskData:state.detail.nextTaskData,//下一步可选的审核步骤
    nextStepData:state.detail.nextStepData,//下一步流程返回结果
    nextStepErrorMessage:state.detail.nextStepErrorMessage,
    secondTask:state.detail.secondTask,
    taskState:state.detail.taskState, //当前步骤状态
    nextPerson:state.detail.nextPerson,//下一步处理人
  };
}

function mapDispatchToProps(dispatch){
  return {
    getMatterInfoByID:(runID,type,dbID)=>dispatch(getMatterInfoByID(runID,type,dbID)),
    getNextTask:(processID,taskName)=>dispatch(getNextTask(processID,taskName)),
    nextStepSubmit:(infomation)=>dispatch(nextStepSubmit(infomation)),
    updateIsPublicInfo:(archivesId,isPublic)=>dispatch(updateIsPublicInfo(archivesId,isPublic)),
  };
}

class RemindManagement extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            checkbox: [false, false],
            value:0,
            judge:false,
            flag:this.props.flag,
            sendMail:false,
            sendMsg:false,
            hits:true
        };
    }

	oncheckboxChange = (val) => {
       this.state.checkbox[val] = this.state.checkbox[val] ? false : true;
        this.setState({
            judge:false
        });
       let j = 0;
       for (j = 0; j < 2; j++) {
            if ( j != val && this.state.checkbox[val] == true ) {
                if(val=='sendMail'){
                    this.state.sendMail=true;
                }else if(val=='sendMsg'){
                    this.state.sendMsg=true;
                }
                this.state.checkbox[j] = false;
            }else{
                if(val=='sendMail'){
                    this.state.sendMail=false;
                }else if(val=='sendMsg'){
                    this.state.sendMsg=false;
                }
                this.state.checkbox[j] ? false : true;
            }
        }
    }

    goback(){
        /*let matterType = this.props.matterType;
        let processType = this.props.processType;
        hashHistory.push('/matterChoose/'+this.props.userName+'/'+processType+'/'+matterType);*/
        hashHistory.goBack();
    }

    obj2params(obj) {
        var result = '';
        for (let item of obj) {
            for(let o in item){
                var value="";
                if(item[o]){
                    value=item[o];
                }
                result += '&' + o + '=' + encodeURIComponent(value);
            }
        }
        if (result) {
            result = result.slice(1);
        }
        return result;
    }

    ensure(){
        if(this.state.hits){
            let returnValue = this.props.returnValue;
            let chooseID="";
            for(var i = 0;i<returnValue.length;i++){
                if(returnValue[i].signUserIds){
                    chooseID=returnValue[i].signUserIds;
                }
            }
            returnValue.push({"runId":this.props.cardListData.RUNID+""});
            returnValue.push({"taskId":this.props.cardListData.TASKID+""});
            returnValue.push({"schemaKey": this.props.cardListData.schemaKey+""});
            console.log(this.props.showUser[0])
            if(this.props.showUser[0]){
                if(this.props.showUser[0].isUserSingle){
                    returnValue.push({"userIds":chooseID+""}); //当前执行人Id
                }
            }
            returnValue.push({"userId": this.props.cardListData.USERID+""}); //当前执行人Id
            returnValue.push({"comments": this.props.comments+""}); //审批信息
            returnValue.push({"sendMail": this.state.sendMail+""}); //是否邮箱提醒
            returnValue.push({"sendMsg": this.state.sendMsg+""}); //是否短信提醒
            let bodyimformation = this.obj2params(returnValue);
        
            // return
            this.props.nextStepSubmit(bodyimformation);
            // nextStepSubmit(bodyimformation).then(res=>{
            //     console.log(res)
            // })
            setTimeout(this.wait.bind(this),3000);
            this.setState({
                hits:false
            })
            this.props.updateIsPublicInfo(this.props.cardListData.ARCHIVESID,this.props.gljIsPublic);
        }
    }

    wait(){
      this.setState({
          flag:true
      })
    }

    loadingToast() {
        Toast.loading('请稍候', 100000, ()=>{
        },true);
    }

	render(){
        let sureChoose = false;
        let returnValue = this.props.returnValue;
        if((this.props.comments!=""&&returnValue.length!=0)//审批意见不能为空且要返回的参数有值
            &&(this.props.showUser==null||this.props.showUser.length==0//无需选择的步骤
            ||(this.props.showConfirm>=this.props.showConfirmSum))//或者以输入参数的
        ){
            sureChoose = true;
        }
        let sign = this.props.cardListData.ACTIVITYNAME;
		const checkboxdata = [{
            value: "sendMail",
            label: '邮件'
        }/*,{
            value: "sendMsg",
            label: '短信'
        }*/];

        let message;
        message = (
        	<div className='remindManagement'>
        		{/*<Flex>
        			<div className="title">提醒办理：</div>
	                    {checkboxdata.map((item, index) => {
                            return (
                                <CheckboxItem key={index} checked={this.state.checkbox[item.value]? true:false} onChange={() => this.oncheckboxChange(item.value)}>
                                    <span>{item.label}</span>
                                </CheckboxItem>
                            )
	                    })}
        		</Flex>*/}
        		<WhiteSpace size='lg' />

        		<Flex justify="start">
	                <Flex.Item style={{
	                    flex: 1
	                }}>
	                </Flex.Item>
	                <Flex.Item style={{
	                    flex : 4
	                }}>
	                    <Button type="primary"
                            onClick={this.ensure.bind(this)}
                            disabled={sureChoose?'':'disbaled'}
                            style={sureChoose?{color:'rgb(254,254,254)'}
                            :{backgroundColor:'#DDD'}}
                        >
	                        确认
	                    </Button>
	                </Flex.Item>
	                <Flex.Item style={{
	                    flex: 1
	                }}>
	                </Flex.Item>
	                <Flex.Item style={{
	                    flex : 4
	                }}>
	                    <Button type="ghost" onClick={this.goback.bind(this)}>返回</Button>
	                </Flex.Item>
	                <Flex.Item style={{
	                    flex: 1
	                }}></Flex.Item>
	            </Flex>
        	</div>
        );
        return message;
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(RemindManagement)

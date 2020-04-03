import React from 'react';
import {WhiteSpace,Flex,List,NavBar,Toast,Icon} from 'antd-mobile';
import Approval from '../approval/Approval.js';
import StaffModal from '../staffModal/StaffModal.js';
import MyStep from '../mystep/MyStep.js';
import RemindManagement from '../remindManagement/RemindManagement.js';
import SendWaitingDetail from '../sendDetail/SendWaitingDetail.js';
import SendDoingDetail from '../sendDetail/SendDoingDetail.js';
import ReceiveWaitingDetail from '../receiveDetail/ReceiveWaitingDetail.js';
import ReceiveDoingDetail from '../receiveDetail/ReceiveDoingDetail.js';
import {connect} from 'react-redux';
import {getMatterInfoByID,getNextTask,getDepID,getFixAssignTask,getSecondTask,getNextThings} from '../../action/detailAction.js';
import {departmentTree} from '../../action/detailAction.js';
import MyNavbar from '../myNavbar/MyNavbar.js';
import AuditOpinion from '../auditOpinion/AuditOpinion.js';
import AuditOpen from '../auditOpinion/AuditOpen.js';
import {hashHistory} from 'react-router';
import './detail.less';
import { compose } from '../../../../node_modules/redux';
function mapStateToProps(state){
  return {
  	cardListData:state.detail.cardListData,
    depID:state.detail.depID,//部门ID
    taskState:state.detail.taskState, //当前步骤状态
  	nextTaskData:state.detail.nextTaskData,//下一步可选的审核步骤
    secondTask:state.detail.secondTask,
    nextPerson:state.detail.nextPerson,//下一步处理人
    //thingsMap:state.detail.thingsMap,
  };
}
function mapDispatchToProps(dispatch){
  return {
  	getMatterInfoByID:(runID,type,dbID)=>dispatch(getMatterInfoByID(runID,type,dbID)),
    getDepID:()=>dispatch(getDepID()),
   // getNextThings:(processName,activityName)=>dispatch(getNextThings(processName,activityName)),
  };
}
class Detail extends React.Component{

	constructor(props) {
      super(props);
      var matterType =this.props.params.matterType;
      var state=this.props.location.state;
      var archivesId='';
      var thingsMap='';
      if(matterType==2){
        archivesId=state;
      }else{
        thingsMap=state;
      }
	    this.state = {
        userName:this.props.params.userName,
        data: {},
	      cardListData:{},
	      isback: false,  //判断审核步骤是否已经选择  false：未选择审核步骤  true：已经选择审核步骤
	      stepscount: -1,  //审批流程信息状态条数
	      comments: "",    //审批意见
	      countersign: false,  //判断下一步审核人员  true；多人  false:单人  下一步审核包含会签是，下一步审核人可多选
        approvalOpinion:false,//是否选择审批意见  false：否  true：是

        opinion:false,
        runID: this.props.params.runID,
        archivesId: archivesId,
	      dbID: this.props.params.dbID,
        matterType: matterType,
        processType:this.props.params.processType,
        //用于保存选择步骤带来的参数（陈）
        thingsMap : thingsMap,
        showUser:null,//选择框显示属性
        tasks:null,//选项框选择属性
        returnValue:[],//返回参数结果集
        showConfirm:0,//显示确定按钮 点一次确定+1
        showConfirmSum:0,//显示确定按钮 加载一次输入框+1 两次结果相等显示确定按钮(这里的1默认为审批意见)
        showKey:0,//人员选择框key保证每次加载都是重新渲染的
        gljSendFlow:['公路局行政发文流程处理笺','重庆市公路局团委发文流程处理笺','中共重庆市公路局委员会发文流程处理笺'],//是否公开选项 流程
        gljSendStep:['发文拟稿','副处长核稿','部门负责人核稿','办公室审核','领导签发','主要领导查阅'],//是否公开选项 步骤
        gljSendOpen:[{name:'不公开',value:1},{name:'拟稿处室公开',value:2},{name:'局内公开',value:3}],
        gljIsPublic:-1,
   		}
    }

    componentWillMount(){
      let name = localStorage.getItem('userName');
      if(name!=this.props.params.userName)
        hashHistory.push('/homePage/'+name);
    }

    componentDidMount(){
          this.props.getDepID();
          let runID = this.state.runID;
          let matterType = this.state.matterType; //type 0:待办 1:在办
          let dbID = this.state.dbID;
          let archivesId = this.state.archivesId;
          if(matterType==2){
            this.props.getMatterInfoByID(archivesId,matterType,dbID);
          }else{
            this.props.getMatterInfoByID(runID,matterType,dbID);
          }
         // this.props.getNextThings("processName","activityName");
         //封装返回参数
         if(this.state.thingsMap!=null&&this.state.thingsMap.length==1){//获取上一步定义的参数。()
            var returnValue=[];
            let value = this.state.thingsMap[0].tasks;
            for(var index in value[0]) {
                returnValue.push({[index] : value[0][index]});
            }
            this.state.returnValue=returnValue;
          }

  	}
    setApprovalOpinion(value){
      this.setState({
        approvalOpinion:value
      });
    }

    handle(obj) {
        this.setState({
            data: Object.assign(this.state.data, obj)
        });
    }
    isback(isback) {
        this.setState({
            isback: isback
        });
    }
    opinion(opinion){
        this.setState({
            opinion:opinion
        });
    }
    auditSteps(auditSteps){
        this.setState({
            auditSteps:auditSteps
        });
    }
    setcomments(obj) {
        this.setState({
            comments: obj
        });
    }

    setstepscount(count) {
        this.setState({
            stepscount: count
        });
    }

    setcountersign(sign) {
        this.setState({
            countersign: sign
        });
    }
    setShowUser(showUser) {
      this.setState({
        showUser: showUser
      });
    }
    setTasks(tasks) {
      this.setState({
        tasks: tasks
      });
    }
    setReturnValue(value) {
      this.setState({
        returnValue: value
      });
    }
    setShowConfirm(value) {
      this.setState({
        showConfirm: value
      });
    }
    setShowkey(value){
      this.setState({
          showKey:value
      });
  }
  setGljIsPublic(value){
    this.setState({
      gljIsPublic:value
  });
  }
    insertAuditOpinion(){
      let auditOpinion;
      let thingsMapSize=0;

      auditOpinion = (
        <div>
          <AuditOpinion auditOpinionTitle='审核步骤' {...this.state}
                          stepNames={this.state.thingsMap}
                          setShowUser={this.setShowUser.bind(this)}
                          isback={this.isback.bind(this)}
                          setReturnValue={this.setReturnValue.bind(this)}
                          setShowConfirm={this.setShowConfirm.bind(this)}
                          setShowkey={this.setShowkey.bind(this)}
                        />
        </div>
      );
      for (let s in this.state.thingsMap){
        if(this.state.thingsMap[s].users.length>0||this.state.thingsMap[s].tasks.length>0){
          thingsMapSize++;
        }
      }
      if(thingsMapSize >0){
          return auditOpinion;
      }else{
        return null;
      }
    }
    insertAuditOpen(){
      let auditOpen;
      let isShow=false;
      for(let s in this.state.gljSendFlow){
        if(this.state.gljSendFlow[s]==this.props.cardListData.NAME){
          for(let i in this.state.gljSendStep){
            if(this.state.gljSendStep[i]==this.props.cardListData.TASKNAME){
              isShow=true;
              break;
            }
          }
        }
      }
      if(this.props.cardListData.length!=0&&isShow){
         auditOpen = (
          <div>
            <AuditOpen auditOpinionTitle='公开范围' {...this.state}
                           stepNames={this.state.gljSendOpen}
                           cardListData={this.props.cardListData}
                           setGljIsPublic={this.setGljIsPublic.bind(this)}
                          />
          </div>
        );
      }
      return auditOpen
    }
    insertNextDealPeople(){
      let nextDealPeople = [];
      if(this.state.showUser!=null){
        this.state.showConfirmSum=this.state.showUser.length;
        this.state.showUser.map((item,index)=>{
          nextDealPeople.push( <div key={index}>
            <List.Item>
              <StaffModal key={item.showName+this.state.showKey}
                staffModalTitle={item.showName} {...this.state}
                showUser={item}
                setReturnValue={this.setReturnValue.bind(this)}
                setShowConfirm={this.setShowConfirm.bind(this)}
                />
              </List.Item>
          </div>)
        });
      }
      return nextDealPeople;
    }
    insertDetail(){
        let insert;
        if(this.state.processType==0){
            if(this.state.matterType==0){
                insert = (
                  <div>
                    <Flex>
                      <Flex.Item>
                        <SendWaitingDetail {...this.state}
                          handleFn={this.handle.bind(this)}
                          isback={this.isback.bind(this)}
                          setstepscount={this.setstepscount.bind(this)}
                          setcountersign={this.setcountersign.bind(this)}
                          auditSteps={this.auditSteps.bind(this)}
                          runID={this.state.runID}
                          dbID={this.state.dbID}
                        />
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <List>
                          {this.insertAuditOpen()}
                          {this.insertAuditOpinion()}
                          {this.insertNextDealPeople()}
                          <List.Item>
                            <Approval {...this.state}
                                setcomments={this.setcomments.bind(this)}
                                isback={this.isback.bind(this)}
                                opinion={this.opinion.bind(this)}
                                setApprovalOpinion={this.setApprovalOpinion.bind(this)}
                                setShowConfirm={this.setShowConfirm.bind(this)}
                                setReturnValue={this.setReturnValue.bind(this)}
                                />
                          </List.Item>
                          <List.Item>
                            <RemindManagement {...this.state}
                              flag={this.state.flag}
                              title={this.state.title}
                              setcountersign={this.setcountersign.bind(this)}
                            />
                          </List.Item>
                        </List>
                      </Flex.Item>
                    </Flex>
                    <WhiteSpace size='lg'/>
                  </div>
                );
            }
            else{
                insert = (
                  <div>
                    <Flex>
                      <Flex.Item>
                        <SendDoingDetail {...this.state}
                        runID={this.state.runID}
                        dbID={this.state.dbID}
                        />
                      </Flex.Item>
                    </Flex>
                    <WhiteSpace size='lg'/>
                  </div>
                );
            }
        }
        else{
            if(this.state.matterType == 0){
                insert = (
                  <div>
                    <Flex>
                      <Flex.Item>
                        <ReceiveWaitingDetail {...this.state}
                            handleFn={this.handle.bind(this)}
                            isback={this.isback.bind(this)}
                            setstepscount={this.setstepscount.bind(this)}
                            setcountersign={this.setcountersign.bind(this)}
                            auditSteps={this.auditSteps.bind(this)}
                            runID={this.state.runID}
                            dbID={this.state.dbID}
                        />
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <List>
                          {this.insertAuditOpen()}
                          {this.insertAuditOpinion()}
                          {this.insertNextDealPeople()}
                          <List.Item>
                            <Approval {...this.state}
                                setcomments={this.setcomments.bind(this)}
                                isback={this.isback.bind(this)}
                                opinion={this.opinion.bind(this)}
                                setApprovalOpinion={this.setApprovalOpinion.bind(this)}
                                setShowConfirm={this.setShowConfirm.bind(this)}
                                setReturnValue={this.setReturnValue.bind(this)}
                                />
                          </List.Item>
                          <List.Item>
                            <RemindManagement {...this.state}
                              flag={this.state.flag}
                              title={this.state.title}
                              setcountersign={this.setcountersign.bind(this)}
                            />
                          </List.Item>
                        </List>
                      </Flex.Item>
                    </Flex>
                    <WhiteSpace size='lg'/>
                  </div>
                );
            }
            else{
                insert = (
                  <div>
                    <Flex>
                      <Flex.Item>
                        <ReceiveDoingDetail {...this.state}
                        runID={this.state.runID}
                        dbID={this.state.dbID}
                        />
                      </Flex.Item>
                    </Flex>
                  </div>
                );
            }
        }

        return insert;
    }
    //请求是失败提示
    requestFailed(){
      Toast.fail('该事项已处理', 5);
      hashHistory.push('/homePage/'+this.props.params.userName);
    }
	render(){
    var title="";
    if(this.state.matterType==2){
      title=this.state.processType != 0? '收文详情' : '发文详情';
    }else{
      title=this.state.matterType != 0? '在办详情' : '待办详情';
    }
		let message;
        if(this.state.role == 0){
            message = (
              <div className='flex-container clearalign'>
                          {this.insertDetail()}
                <Flex direction="row" justify="start">
                  <Flex.Item>
                    <List>
                      <List.Item><MyStep {...this.state}/></List.Item>
                    </List>
                  </Flex.Item>
                </Flex>
              </div>
            );
        }
        else{
            message = (
				<div className='flex-container-todoing clearalign'>
					<Flex>
						<Flex.Item>
              <NavBar leftContent="返回"
                  mode="light"
                      icon={<Icon type="left" />}
                  onLeftClick={()=>{
                      /*if(this.props.params.backlog==undefined){
                      hashHistory.push('/matterChoose/'+this.state.userName+'/'+this.state.processType+'/'+this.state.matterType);
                  }else{
                          hashHistory.push('/backlog/'+this.state.userName);
                      }*/
                      hashHistory.goBack()
                  }
                  }
                  >
                  {
                   title
                  }
              </NavBar>
						</Flex.Item>
					</Flex>
					<WhiteSpace size="lg" />
                    {this.insertDetail()}
					<Flex direction="row" justify="start">
						<Flex.Item>
							<List>
								<List.Item><MyStep {...this.state}/></List.Item>
							</List>
						</Flex.Item>
					</Flex>
				</div>
            );
        }
        return message;
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Detail);

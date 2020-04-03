import React from 'react';
import {WhiteSpace, Accordion, List, Flex, Button, Modal, Icon, Toast, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMatterInfoByID,getProcess,getNextTask,getSecondTask,getFixAssignTask} from '../../action/detailAction.js';
import './AuditOpinion.less';
import * as PATH from '../../config/path.js';
const RadioItem = Radio.RadioItem

function mapStateToProps(state){
    return {
        cardListData:state.detail.cardListData,
        nextTaskData:state.detail.nextTaskData,//下一步可选的审核步骤
        secondTask:state.detail.secondTask, //下下步审核步骤
        taskState:state.detail.taskState, //当前步骤状态
        nextPerson:state.detail.nextPerson,//下一步处理人
    };
}

function mapDispatchToProps(dispatch){
    return {
      /*   getMatterInfoByID:(runID,type,dbID)=>dispatch(getMatterInfoByID(runID,type,dbID)),
       getNextTask:(processID,taskName)=>dispatch(getNextTask(processID,taskName)),
        getSecondTask:(processID,taskName)=>dispatch(getSecondTask(processID,taskName)),
        getFixAssignTask:(processID,taskID,taskName)=>dispatch(getFixAssignTask(processID,taskID,taskName)),*/
    };
}


class AuditOpinion extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            reviewsteps: [],   //审核步骤
            modal: false,
            radio: {
                users:null,
                name: "",
                tasks: null
            }
        };
    }

    componentDidMount(){
        let runID = this.props.runID;
        let type = 0; //type 0:待办 1:在办
        let dbID = this.props.dbID;
    }


    showModal = key => (e) => {
        e.preventDefault();
        this.setState({
            modal: true,
        });
    }
    onChange  = (tasks, name, users) => {
        this.setState({
            radio: {
                tasks: tasks,
                name: name,
                users: users
            }
        }, () => {
            this.props.setShowUser(users);
            //解析必须传入的值
            var returnValue=[];
            for(var index in tasks[0]) {
                returnValue.push({[index] : tasks[0][index]});
            }
            this.props.setShowConfirm(0);//点击计数清空
            this.props.setShowkey(this.props.showKey+1);//显示key+1
            this.props.setReturnValue(returnValue);
            this.props.isback(true);
        });
        this.setState({
            modal: false
        });
        //this.props.setApprovalStep(this.state.radio.name==''?false:true);
    };
    spanStyle(){//页面显示
        let array = [];
        let be_style= {
            color:'#c4c4c4',
            position:'relative',
            left:'-20px'
        };
        let af_style={
            color:'RGB(51,51,51)',
            position:'relative',
            left:'-20px'
        };

        array.push(be_style);
        array.push(af_style);
        if(!this.state.radio.name){
            this.props.stepNames.map((item, index) => {
                if(index==0){
                    this.setState({
                        radio: {
                            tasks: item.tasks,
                            name: item.name,
                            users: item.users
                        }
                    }, () => {
                        this.props.setShowUser(item.users);
                        //解析必须传入的值
                        var returnValue=[];
                        for(var index in item.tasks[0]) {
                            returnValue.push({[index] : item.tasks[0][index]});
                        }
                        this.props.setShowkey(this.props.showKey+1);//显示key+1
                        this.props.setShowConfirm(0);//点击计数清空
                        this.props.setReturnValue(returnValue);
                        this.props.isback(true);
                    });
                }
            });
        }
        array.push(this.state.radio.name);
        return array;
    }

    render(){
        let message;
        return(
                <div className='auditOpinion'>
                    <List.Item>
                        <Flex direction="row" justify="start" style={{overflow:"hidden"}}>
                            <Flex.Item><span className="title">{this.props.auditOpinionTitle}:</span></Flex.Item>
                            <Flex.Item style={{flex:"2"}}>
                                <div className='auditstep'>
								<span className="content" style={this.state.radio.name==""?this.spanStyle()[0]:this.spanStyle()[1]}>
									{this.spanStyle()[2]}
								</span>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <Button className="sm-btn" 
                                 type="primary"
                                 inline size="small" onClick={this.showModal('modal')}>
                                 选择步骤</Button>
                            </Flex.Item>
                        </Flex>
                    </List.Item>

                    <Modal
                        title="请选择审核步骤"
                        transparent
                        maskClosable={false}
                        visible={this.state.modal}//设置是否显示 modal为id
                        //onClose={this.onClose('modal')}
                       // footer={[{ text: '确定', onPress: () => { this.onClose('modal')(); } }]}
                        style={{width:'90%'}}
                    >
                        <List>
                            {this.props.stepNames.length !== 0?this.props.stepNames.map((item, index) => {

                                return (
                                    <RadioItem key={index} checked={this.state.radio.name === item.value } onChange={() => this.onChange(item.tasks,item.name, item.users)}>
                                          {item.name}
                                    </RadioItem>
                                );
                            }):"结束"}
                        </List>
                    </Modal>
                </div>
            );
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(AuditOpinion);

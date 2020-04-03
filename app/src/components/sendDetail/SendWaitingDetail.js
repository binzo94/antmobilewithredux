import React from 'react';
import {WhiteSpace, Accordion, List, Flex, Button, Modal, Icon, Toast, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMatterInfoByID,getProcess,getNextTask} from '../../action/detailAction.js';
import './SendDetail.less';
import * as PATH from '../../config/path.js';
import AuditOpinion from '../auditOpinion/AuditOpinion.js';
import setupWebViewJavascriptBridge from '../../callios.js';
import judge from '../../judge.js';
import ReactDOM from 'react-dom';
const RadioItem = Radio.RadioItem


function mapStateToProps(state){
    return {
        cardListData:state.detail.cardListData,
        nextTaskData:state.detail.nextTaskData,//下一步可选的审核步骤
    };
}

function mapDispatchToProps(dispatch){
    return {
        getMatterInfoByID:(runID,type,dbID)=>dispatch(getMatterInfoByID(runID,type,dbID)),
        getNextTask:(processID,taskName)=>dispatch(getNextTask(processID,taskName)),
    };
}


class SendWaitingDetail extends React.Component{
    constructor(props) {
        super(props);
        this.timer=null;
        this.state = {
            width:(window.innerHeight || document.body.clientHeight)*3/4,
            reviewsteps: [],   //审核步骤
            modal: false,
            radio: {
                value: -1,
                name: "",
                code: ""
            }
        };
    }

    componentDidMount=()=>{
        let that=this;
        this.timer=setInterval(function () {
            if(that.lv1!=undefined&&that.lv2!=undefined){
                let w=ReactDOM.findDOMNode(that.lv1).offsetWidth-ReactDOM.findDOMNode(that.lv2).offsetWidth;;
                that.setState({
                width:w
                }
            );
                clearInterval(that.timer);
            }
        },100);}


    componentWillReceiveProps=()=>{
    }
    failToast() {
        Toast.fail('无法获取文件', 3);
    }

    callPhoneBox(name,docId,url){
        if(judge()){
            androidConnector.downLoadFileFromUrl(url,docId,name);
        }
        else{
            setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('downLoadFileFromUrl',{'url':url,'docId':docId,'name':name}, function(response) {
                })    
            })
        }
      
    }

    render(){
        let message;
        if (!this.props.cardListData.ARCHIVESNO) {
            // message = (
            return(
                <div className="sendDetail">
                    <span>正在加载...</span>
                </div>
              )
            // );
        }
        else{

        return(
                <div className='sendDetail'>
                    <List.Item>
                        <Flex>
                            <div className='title'>公文标题:</div>
                            <div className='content'>{this.props.cardListData.SUBJECT}</div>
                        </Flex>
                    </List.Item>
                    <WhiteSpace size='lg'/>

                    <List.Item>
                        <Flex>
                            <div className='title'>发文字号:</div>
                            <div className='content'>{this.props.cardListData.ARCHIVESNO}</div>
                        </Flex>
                    </List.Item>

                    <List.Item>
                        <Flex>
                            <div className='title'>发文单位:</div>
                            <div className='content'>{this.props.cardListData.ISSUEDEP}</div>
                        </Flex>
                    </List.Item>

                    <List.Item>
                        <Flex>
                            <div className='title'>拟稿部门:</div>
                            <div className='content'>{this.props.cardListData.DEPNAME}</div>
                        </Flex>
                    </List.Item>

                    <List.Item>
                        <Flex>
                            <Flex.Item>
                                <Flex>
                                    <div className='title'>拟稿人:</div>
                                    <div className='content'>{this.props.cardListData.ISSUER}</div>
                                </Flex>
                            </Flex.Item>
                            <Flex.Item>
                                <Flex>
                                    <div className='title'>核稿人:</div>
                                    <div className='content'>{this.props.cardListData.REVIEW_USER_NAME}</div>
                                </Flex>
                            </Flex.Item>
                        </Flex>
                    </List.Item>

                    <List.Item>
                        <Flex>
                            <Flex.Item>
                                <Flex>
                                    <div className='title'>紧急程度:</div>
                                    <div className='content'>{this.props.cardListData.URGENTLEVEL}</div>
                                </Flex>
                            </Flex.Item>
                            <Flex.Item>
                                <Flex>
                                    <div className='title'>密级等级:</div>
                                    <div className='content'>{this.props.cardListData.PRIVACYLEVEL}</div>
                                </Flex>
                            </Flex.Item>
                        </Flex>
                    </List.Item>
                    <WhiteSpace size='lg' />


                    <List.Item>
                        <Flex>
                            <div className='title'>行文方向:</div>
                            <div className='content'>{this.props.cardListData.CONTENT_FORMAT}</div>
                        </Flex>
                    </List.Item>

                    <List.Item>
                        <Flex>
                            <Flex.Item>
                                <Flex>
                                <div className='title'>文种:</div>
                                
                                <div className='content'>{this.props.cardListData.TYPENAME}</div>
                                </Flex>
                            </Flex.Item>
                           {/* <Flex.Item>
                                <Flex>
                                    <div className='title'>是否公开:</div>
                                    <div className='content'>{this.props.cardListData.IS_PUBLIC}</div>
                                </Flex>
                            </Flex.Item>*/}
                        </Flex>
                    </List.Item>
                    <List.Item>
                        <Flex>
                            <div className='title'>公开范围:</div>
                            <div className='content'>{this.props.cardListData.IS_PUBLIC}</div>
                        </Flex>
                    </List.Item>
                    <List.Item>
                        <Flex>
                            <div className='title'>主送:</div>
                            <div className='content'>{this.props.cardListData.SEND_TO}</div>
                        </Flex>

                    </List.Item>
                    <List.Item>
                        <Flex>
                            <div className='title'>抄送:</div>
                            <div className='content'>{this.props.cardListData.CC_TO}</div>
                        </Flex>
                    </List.Item>

                    <Accordion accordion defaultActiveKey='0' openAnimation={{}} className="my-accordion">
                        <Accordion.Panel header={
                            <Flex>
                                <div className="title">公文正文:</div>
                                <div className="content">{this.props.cardListData.archivesDoc.length === 0 ?"无":"查看正文"}</div>
                            </Flex>
                        }>
                            <List className="my-list">
                                {
                                    this.props.cardListData.archivesDoc.length !== 0? this.props.cardListData.archivesDoc.map((item, index) => {
                                        if(item.exist=="true")
                                            return (<List.Item key={index} onClick={this.callPhoneBox.bind(this,item.DOCNAME,item.DOCID,PATH.FILEURL+"schema="+localStorage.getItem('schema')+"&type=1&ID="+item.DOCID)}>
                                                {item.DOCNAME}
                                            </List.Item>)
                                        else
                                            return (
                                                <List.Item key={index}>
                                                    <span className='doc' onClick={this.failToast.bind(this)}>{item.DOCNAME}</span>
                                                </List.Item>
                                            )
                                    }) : ""
                                }
                            </List>
                        </Accordion.Panel>
                    </Accordion>

                    <Accordion accordion defaultActiveKey='0' openAnimation={{}} className="my-accordion">
                        <Accordion.Panel header={
                            <Flex>
                                <div className="title">公文附件:</div>
                                <div className="content">{this.props.cardListData.archivesFile.length === 0 ?"无":"查看附件"}</div>
                            </Flex>
                        }>
                            <List className="my-list">
                                {
                                    this.props.cardListData.archivesFile.length !== 0? this.props.cardListData.archivesFile.map((item, index) => {
                                        if(item.exist=="true")
                                            return (<List.Item key={index} onClick={this.callPhoneBox.bind(this,item.FILENAME,0,PATH.FILEURL+"schema="+localStorage.getItem('schema')+"&type=2&ID="+item.FILEID)}>
                                                {item.FILENAME}
                                            </List.Item>)
                                        else
                                            return (
                                                <List.Item key={index}>
                                                    <span className='doc' onClick={this.failToast.bind(this)}>{item.FILENAME}</span>
                                                </List.Item>
                                            )
                                    }) : ""
                                }
                            </List>
                        </Accordion.Panel>
                    </Accordion>

                    <WhiteSpace size='lg' />
                  {/*  <List.Item>
                        <Flex>
                            <div className='title'>规范性文件:</div>
                            <div className='content'>{this.props.cardListData.IS_STANDARD}</div>
                        </Flex>
                    </List.Item>*/}

                    <List.Item>
                        <Flex>
                            <div className='title'>份数:</div>
                            <div className='content'>{this.props.cardListData.FILECOUNTS}</div>
                        </Flex>
                    </List.Item>
                    <WhiteSpace size='lg' />
                    <List.Item>
                        <Flex ref={el=>this.lv1=el} >
                            <div className='title' ref={el=>this.lv2=el}>备注:</div>

                            <p className='beizhu' style={{width:this.state.width+"px"}}>{this.props.cardListData.SHORTCONTENT}</p>
                        </Flex>
                    </List.Item>
                    <List.Item>
                        <Flex>
                            <div className='title'>{ localStorage.getItem('userName').indexOf("snjt")==-1?"附件(无文档):":"摘要:"}</div>
                            <div className='content'>{this.props.cardListData.ENCLOSURE}</div>
                        </Flex>
                    </List.Item>
                    <WhiteSpace size='lg' />
                </div>
            );
        }

        // return message;
    }
}

// export default SendDetail
export default connect(mapStateToProps,mapDispatchToProps)(SendWaitingDetail);

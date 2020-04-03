import React from 'react';
import ReactDOM from 'react-dom';
import {WhiteSpace, Accordion, List, Flex, Button, Modal, Icon, Toast, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMatterInfoByID,getProcess} from '../../action/detailAction.js';
import './ReceiveDetail.less';
import * as PATH from '../../config/path.js';
import setupWebViewJavascriptBridge from '../../callios.js';
import judge from '../../judge.js';
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

class ReceiveWaitingDetail extends React.Component {
    constructor(props) {
        super(props);
        this.timer=null;
        this.state = {
            width:(window.innerHeight || document.body.clientHeight)*3/4,
            data: {},
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

    failToast() {
        Toast.fail('无法获取文件', 3);
    }

    callPhoneBox(name,docId,url){
        if(judge()){
            //总队的app,不要docId
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
        if(this.props.cardListData.ARCHIVESNO==null) {
            message = (
                <div className="receiveDetail">
                    <span>正在加载...</span>
                </div>
            );
        }
        else{
            message = (
                <div className="receiveDetail">
                    <List.Item>
                        <Flex>
                            <div className="title">公文标题:</div>
                            <div className="content">{this.props.cardListData.SUBJECT}</div>
                        </Flex>
                    </List.Item>

                    <WhiteSpace size="lg" />

                    <List.Item>
                        <Flex>
                            <div className="title">来文编号:</div>
                            <div className="content">{this.props.cardListData.DEPSIGNNO}</div>
                        </Flex>
                    </List.Item>
                    <List.Item>
                        <Flex>
                            <div className="title">收文编号:</div>
                            <div className="content">{this.props.cardListData.ARCHIVESNO}</div>
                        </Flex>
                    </List.Item>

                    <List.Item>
                        <Flex>
                            <div className="title">限办日期:</div>
                            <div className="content">{this.props.cardListData.LIMITED_DATE}</div>
                        </Flex>
                    </List.Item>

                    <List.Item>
                        <Flex>
                            <Flex.Item>
                                <Flex>
                                    <div className='title'>成文日期:</div>
                                    <div className='content'>{this.props.cardListData.WRITTEN_DATE}</div>
                                </Flex>
                            </Flex.Item>
                            <Flex.Item>
                                <Flex>
                                    <div className='title'>收文日期:</div>
                                    <div className='content'>{this.props.cardListData.RECEIVE_DATE}</div>
                                </Flex>
                            </Flex.Item>
                        </Flex>
                    </List.Item>


                    <List.Item>
                        <Flex>
                            <Flex.Item>
                                <Flex>
                                    <div className="title">紧急程度:</div>
                                    <div className="content">{this.props.cardListData.URGENTLEVEL}</div>
                                </Flex>
                            </Flex.Item>
                            <Flex.Item>
                                <Flex>
                                    <div className="title">秘密等级:</div>
                                    <div className="content">{this.props.cardListData.PRIVACYLEVEL}</div>
                                </Flex>
                            </Flex.Item>
                        </Flex>
                    </List.Item>

                    <List.Item>
                        <Flex>
                            <div className='title'>来文单位:</div>
                            <div className='content'>{this.props.cardListData.ISSUEDEP}</div>
                        </Flex>
                    </List.Item>

                    <List.Item>
                        <Flex>
                            <div className='title'>来文类型:</div>
                            <div className='content'>{this.props.cardListData.TYPENAME}</div>
                        </Flex>
                    </List.Item>

                    <WhiteSpace size="lg" />


                    <List.Item>
                        <Flex>
                            <div className="title">主办部门:</div>
                            <div className="content">{this.props.cardListData.ORGDEP_NAME}</div>
                        </Flex>
                    </List.Item>

                    <List.Item>
                        <Flex>
                            <Flex.Item>
                                <Flex>
                                    <div className="title">份数:</div>
                                    <div className="content">{this.props.cardListData.FILECOUNTS}</div>
                                </Flex>
                            </Flex.Item>
                          {/*  <Flex.Item>
                                <Flex>
                                    <div className="title">页数:</div>
                                    <div className="content">{this.props.cardListData.FILEPAGE}</div>
                                </Flex>
                            </Flex.Item>*/}
                        </Flex>
                    </List.Item>
                    <WhiteSpace size='lg' />
                    <List.Item>
                        <Flex ref={el=>this.lv1=el} >
                            <div className='title' ref={el=>this.lv2=el}>备注:</div>

                            <p className='beizhu' style={{width:this.state.width+"px"}}>{this.props.cardListData.SHORTCONTENT}</p>
                        </Flex>
                    </List.Item>
                    <Accordion accordion openAnimation={{}} defaultActiveKey='0' className="my-accordion">
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
                                            return (<List.Item key={index}>
                                                <span className='doc' onClick={this.failToast.bind(this)}>{item.DOCNAME}</span>
                                            </List.Item>)
                                    }) : ""
                                }
                            </List>
                        </Accordion.Panel>
                    </Accordion>

                    <Accordion accordion openAnimation={{}} defaultActiveKey='0' className="my-accordion">
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
                                            return (
                                            <List.Item key={index} onClick={this.callPhoneBox.bind(this,item.FILENAME,0,PATH.FILEURL+"schema="+localStorage.getItem('schema')+"&type=2&ID="+item.FILEID)}>
                                                {item.FILENAME}
                                            </List.Item>)
                                        else
                                            return (<List.Item key={index}>
                                                <span className='doc' onClick={this.failToast.bind(this)}>{item.FILENAME}</span>
                                            </List.Item>)
                                    }) : ""
                                }
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                    {<List.Item>
                        <Flex>
                            <div className='title'>{ localStorage.getItem('userName').indexOf("snjt")==-1?"附件(无文档):":"摘要:"}</div>
                            <div className='content'>{this.props.cardListData.ENCLOSURE}</div>
                        </Flex>
                    </List.Item>}
                    <WhiteSpace size='lg' />
                </div>
            );
        }
        return message;
    }
}


// export default ReceiveWaitingDetail
export default connect(mapStateToProps,mapDispatchToProps)(ReceiveWaitingDetail);

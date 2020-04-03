import React from 'react';
import ReactDOM from 'react-dom';
import {Card,NavBar,List,InputItem,DatePicker,Icon, Toast,ActivityIndicator} from 'antd-mobile';
import {hashHistory} from 'react-router';
import moment from 'moment';
import './queryChoose.less';
import QueryList from './QueryList';
import MeetingBlock from '../meetingManage/meetingBlock'
import {getSearchMatters,getSearchMattersCount} from "../../action/matterChooseAction";
import {connect} from "react-redux";
import nodata from './nodata.png';
function mapStateToProps(state){
    return {
        data:state.matterChoose.data,
        count:state.matterChoose.count,
    }
}
function mapDispatchToProps(dispatch){
    return {
        getSearchMatters:(subject,stime,etime,pageSize,pageIndex,isquery)=>dispatch(getSearchMatters(subject,stime,etime,pageSize,pageIndex,isquery)),
       // getSearchMattersCount:(subject,stime,etime)=>dispatch(getSearchMattersCount(subject,stime,etime,true))
    }
}
class queryChoose extends React.Component{
    constructor(props){
        super(props);
        this.timer=null;
        this.state = {
            stime:'',
            etime:'',
            display:'none',
            height:(window.innerHeight || document.body.clientHeight)*3/4,
            pageSize:10,
            pageIndex:0,
            top:'0px',
            userName:this.props.params.userName,
            isloading:false,
            isdisplay:"none",
            subject:''
        };
    }
    componentDidMount=()=>{
        this.props.getSearchMatters(this.state.subject,this.state.stime,this.state.etime,this.state.pageSize,this.state.pageIndex,true);
        let that =this;
        this.ic=0;
        localStorage.setItem("ic",this.ic+'');
        this.timer=setTimeout(function () {
            if(that.props.animating==true&&localStorage.getItem("ic")==that.ic+''){
                clearTimeout(that.timer);
                that.timer=null;
                that.props.meetingArrangeNofetech();
                Toast.offline('网络超时！请重试', 3);
            }
        },8000)
        let lv1_h=ReactDOM.findDOMNode(this.lv1).offsetHeight;
        this.setState({
            top:lv1_h+'px'
        });
        this.setState({
            height:(window.innerHeight || document.body.clientHeight)-lv1_h
        });
    }
    handleYesClick=()=>{
        let starttime='';
        let endtime="";
        if(this.state.etime!==''){
            endtime=moment(this.state.etime).format('YYYY-MM-DD')+" 23:59:59";
        }
        if(this.state.stime!==''){
            starttime=moment(this.state.stime).format('YYYY-MM-DD')+" 00:00:00";
        }
        if(starttime!==''&&endtime!=''&&starttime>endtime){
            Toast.fail('开始时间不得大于结束时间!', 3);
        }else {
            //this.props.meetingArrangeHasmore();
            let that =this;
            this.ic++;
            localStorage.setItem("ic",this.ic+'');
            this.timer=setTimeout(function () {
                if(that.props.animating==true&&localStorage.getItem("ic")==that.ic+''){
                    clearTimeout(that.timer);
                    that.timer=null;
                    that.props.meetingArrangeNofetech();
                    Toast.offline('网络超时！请重试', 3);
                }
            },8000)
            this.lv3.scrollTop=0;
            this.setState({display:'none', pageIndex:0,  isdisplay:'none'});
            //this.props.getSearchMattersCount(this.state.subject,this.state.stime,this.state.etime,true);
            this.props.getSearchMatters(this.state.subject,starttime,endtime,this.state.pageSize,0,true);
        }
    }
    myscroll=()=>{
        let pageHeight = Math.max(this.lv3.scrollHeight, this.lv3.offsetHeight);
        let viewportHeight = this.lv3.innerHeight || this.lv3.clientHeight || 0;
        let scrollHeight = this.lv3.scrollTop || this.lv3.pageYOffset || 0;
        if(this.state.isdisplay=='none'&&scrollHeight!==0){
            this.setState({
                isdisplay:'block'
            })
            console.log("设置显示")
        }
        if(pageHeight-viewportHeight-scrollHeight<20){
            if(this.props.nomore){
                return
            }
            let stime=moment(this.state.stime);
            let starttime=stime.format('YYYY-MM-DD');
            let endtime="";
            if(this.state.etime!==null){
                endtime=moment(this.state.etime).format('YYYY-MM-DD')+" 23:59:59";
            }
            let pageIndex=this.state.pageIndex+1;
            this.setState({pageIndex:pageIndex});
            this.props.getSearchMatters(this.state.subject,this.state.stime,this.state.etime,this.state.pageSize,pageIndex,false);
        }
    }
    insertBlock=()=> {
        let height = window.innerHeight || document.body.clientHeight;
        const nodataStyle = {
            width: "292px",
            height:"340px",
            BackgroundRepeat:"no-repeat",
            backgroundImage:`url(${nodata})`,
            marginLeft: "-146px",
            marginTop:"-170px",
            left:'50%',
            top:'50%', 
            position:"absolute"

        }
        if ( this.props.data !== undefined&& this.props.data.length!==0) {
            return  this.props.data.map((item, index) => {
                return <QueryList {...this.state} key={index} data={item} key={item.CONFID}/>
            })
        }else if(!this.props.animating){
            return   <div style={nodataStyle}></div>;

        }
    }
    render(){
        return  <div className="meeting_part" style={{position:'relative'}}><NavBar
            ref={el => this.lv1 = el}
            mode="light"
            leftContent="返回"
            icon={<Icon type="left" />}
            onLeftClick={()=>{
              /*  hashHistory.push('/homePage/'+this.props.params.userName);*/
              hashHistory.goBack()
            }}
            rightContent={<div  onClick={()=>{let display=this.state.display=="none"?"block":"none";this.setState({display})}}><span>查询</span><Icon type={this.state.display=='none'?"down":"up"} size="xss" color="red" /></div>}
        >
            <span >公文查询</span>
        </NavBar>
            <div style={{display:this.state.display,position:'relative',zIndex:99}} className="search_condition">
                <List>
                    <InputItem
                        placeholder="请输入"
                        clear
                        value={this.state.subject}
                        onChange={(string)=>{this.setState({
                            subject:string
                        })}}
                    >关键字</InputItem>
                    <DatePicker
                        mode="date"
                        value={this.state.stime}
                        onChange={stime =>{this.setState({stime})}
                        }
                    >
                        <List.Item arrow="horizontal">开始日期</List.Item>
                    </DatePicker>
                    <DatePicker
                        mode="date"
                        value={this.state.etime}
                        onChange={etime =>{this.setState({etime})}
                        }
                    >
                        <List.Item arrow="horizontal">结束日期</List.Item>
                    </DatePicker>
                    <List.Item>
                        <div className="choose_btn">
                            <div className="choose_yes" onClick={this.handleYesClick}>
                                确认
                            </div>
                            <div className="choose_no"  onClick={()=>{
                                    this.setState({
                                        display:"none",subject:'', stime:'',
                                        etime:''})
                                }}>
                                取消
                            </div>
                        </div>
                    </List.Item>
                </List>
            </div>
            <div className="scrollview" style={{height:this.state.height,width:'100%',position:'absolute',top:this.state.top}} onScroll={this.myscroll}  ref={el => this.lv3= el}>
                {this.insertBlock()}
                <p style={{textAlign:"center",height:'200px',display:this.state.isdisplay}}>{this.props.nomore==true?"没有更多数据了":(this.state.isloading?'加载中...':'上拉加载更多')}</p>
                <p ref={el => this.lv2 = el} ></p>
            </div>
     
        </div>
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(queryChoose);
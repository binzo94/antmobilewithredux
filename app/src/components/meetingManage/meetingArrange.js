import React from 'react';
import ReactDOM from 'react-dom';
import {Card,NavBar,List,InputItem,DatePicker,Icon, Toast,ActivityIndicator} from 'antd-mobile';
import {hashHistory} from 'react-router';
import moment from 'moment';
import './meetingArrange.less';
import MeetingBlock from './meetingBlock'
import {meetingArrange,meetingArrangeHasmore,meetingArrangeNofetech} from "../../action/meetingManageAction";
import {connect} from "react-redux";
import nodata from './nodata.png';
function mapStateToProps(state){
    return {
        data:state.meetingManage.data,
        isloading:state.meetingManage.isloading,
        animating:state.meetingManage.isFetching,
        nomore:state.meetingManage.nomore,
    }
}
function mapDispatchToProps(dispatch){
    return {
        getMeetingArrange:(name,st,et,page,num,isquery)=>dispatch(meetingArrange(name,st,et,page,num,isquery)),
        meetingArrangeHasmore:()=>dispatch(meetingArrangeHasmore()),
        meetingArrangeNofetech:()=>dispatch(meetingArrangeNofetech())
    }
}
class MeetingArrange extends React.Component{
    constructor(props){
        super();
        const nowTimeStamp = Date.now();
        const now =new Date(nowTimeStamp);
        this.totaldata=[];
        this.timer=null;
        this.state = {
            stime:now,
            etime:null,
            name:'',
            display:'none',
            height:(window.innerHeight || document.body.clientHeight)*3/4,
            per_num:10,
            page:1,
            top:'0px',
            isloading:false,
            isdisplay:"none"
        };
    }
    componentDidMount=()=>{
        this.props.meetingArrangeHasmore();
        this.props.getMeetingArrange(this.state.name,moment(this.state.stime).format('YYYY-MM-DD HH:mm:ss'),'',this.state.page,this.state.per_num,true);
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
        let stime=moment(this.state.stime);
        let starttime=stime.format('YYYY-MM-DD');
        let endtime="";
        if(this.state.etime!==null){
            endtime=moment(this.state.etime).format('YYYY-MM-DD')+" 23:59:59";
        }

        if(stime!==null&&this.state.etime!=null&&starttime>endtime){
            Toast.fail('开始时间不得大于结束时间!', 3);
        }
        else {
            this.props.meetingArrangeHasmore();
            this.props.getMeetingArrange(this.state.name,starttime+" 00:00:00",endtime,1,this.state.per_num,true);
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
            this.setState({display:'none', page:1, isdisplay:'none'});
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

        if(pageHeight-viewportHeight-scrollHeight<20&&this.props.isloading==false){
            this.setState({
                isloading:true,
                }
            );
            if(this.props.nomore){
                return
            }
            let stime=moment(this.state.stime);
            let starttime=stime.format('YYYY-MM-DD');
            let endtime="";
            if(this.state.etime!==null){
                endtime=moment(this.state.etime).format('YYYY-MM-DD')+" 23:59:59";
            }
            let pagenum=this.state.page+1;
            this.setState({page:pagenum});
            this.props.getMeetingArrange(this.state.name,starttime+" 00:00:00",endtime,pagenum,this.state.per_num,false);
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
            return <MeetingBlock data={item} key={item.CONFID}/>
        })
    }
    else if(!this.props.animating){
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
            <span >会议查询</span>
        </NavBar>
            <div style={{display:this.state.display,position:'relative',zIndex:99}} className="search_condition">
                <List>
                    <InputItem
                        placeholder="请输入"
                        clear
                        value={this.state.name}
                        onChange={(string)=>{this.setState({
                            name:string
                        })}}
                    >会议名称</InputItem>
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
                            <div className="choose_no"  onClick={()=>{this.setState({display:"none"})}}>
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

            <ActivityIndicator
                toast
                text="查询中..."
                animating={this.props.animating}
            />
        </div>
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MeetingArrange);
import { ActivityIndicator,Icon,NavBar,Button,WingBlank,WhiteSpace,SegmentedControl } from 'antd-mobile';
import React from 'react';
import moment from 'moment';
import {hashHistory} from "react-router";
import './leaderActivity.less';
import {getActivities,activitiesNofetch} from '../../action/leaderActivitiesAction.js';
import WeekActivity from './WeekActivity.js'
import {connect} from "react-redux";
function mapStateToProps(state){
    return {
        data:state.leaderActivities.data,
        isFetching:state.leaderActivities.isFetching
    }
}

function mapDispatchToProps(dispatch){
    return {
        getActivities:(st,days)=>dispatch(getActivities(st,days)),
        setNofetch:()=>dispatch(activitiesNofetch())
    }
}
class LeaderActivity extends React.Component {
    constructor(props) {
        super(props);
        let nowdate=moment().format('YYYY-MM-DD');
        let sdatetime=nowdate;
        this.timer=null;
        this.state={
            starttime:sdatetime,
            weeks:0,
            isdisplay:"none",
            selectindex:0,
        }
    }
    componentDidMount(){
        this.timer=setTimeout(()=>{
            this.props.setNofetch();
        },2000)
        this.props.getActivities(this.state.starttime,1);

    }
    componentWillUnmount(){
        clearTimeout(this.timer);
    }
    segChange=(e)=>{
        let index=e.nativeEvent.selectedSegmentIndex;
        if(index!==0){
            this.setState({
                isdisplay:"block",
                selectindex:index
            });
        }
        else{
            this.setState({
                isdisplay:"none",
                selectindex:index
            });
        }
        if(index==2){
            this.setState({
              weeks:2
            },()=>{
              this.updateData();
            });
        }
        else if(index==1){
            this.setState({
                weeks:1
            },()=>{
                this.updateData();
            });
        }
        else{
            let stime=moment().format('YYYY-MM-DD');
            this.setState({
                weeks:0,
                starttime:stime
            },()=>{
                this.updateData();
            });
        }

    }
    updateData(){
        this.timer=setTimeout(()=>{
            this.props.setNofetch();
        },2000)
        if(this.state.weeks==0){
            this.props.getActivities(this.state.starttime,1);
        }
        else{
            this.props.getActivities(this.state.starttime,this.state.weeks*7);
        }

    }
    prePage=()=>{
        //根据当前开始时间计算翻页开始时间
        let stime=moment(this.state.starttime,'YYYY-MM-DD').subtract(7*this.state.weeks,'days')
            .format('YYYY-MM-DD');
        this.setState({
            starttime:stime
        },()=>{
            this.updateData();
        });

    }
    nextPage=()=>{
        //根据当前开始时间计算翻页开始时间
        let stime=moment(this.state.starttime,'YYYY-MM-DD').add(7*this.state.weeks,'days')
            .format('YYYY-MM-DD');
        this.setState({
            starttime:stime
        },()=>{
            this.updateData();
        });
    }
    render() {
        return (<div className='leaderact'>
            <NavBar
                mode="light"
                leftContent="返回"
                icon={<Icon type="left" />}
                onLeftClick={()=>{
                   /* hashHistory.push('/homePage/'+this.props.params.userName);*/
                   hashHistory.goBack()
                }}
            >
                <span >领导活动</span>
            </NavBar>
            <SegmentedControl selectedIndex={this.state.selectindex} values={['今天','显示一周', '显示两周']} onChange={this.segChange}/>
                <WeekActivity data={this.props.data?this.props.data:[]} defalutkey={this.state.starttime}
                    />
            <WingBlank >
                <div className="leader_btn_control" style={{display:this.state.isdisplay}}>
                    <Button onClick={this.prePage} type="ghost" inline size="small" style={{ marginRight: '4px',float:'left' }}>上一页</Button>
                    <Button onClick={this.nextPage} type="ghost" inline size="small" style={{ marginRight: '4px',float:'right' }}>下一页</Button>
                </div>
            </WingBlank>
                <ActivityIndicator
                    toast
                    text="加载中..."
                    animating={this.props.isFetching}
                />
        </div>

        );

    };
}
export default connect(mapStateToProps,mapDispatchToProps)(LeaderActivity);
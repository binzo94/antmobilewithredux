import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Icon,NavBar,ActivityIndicator, WhiteSpace, WingBlank} from 'antd-mobile';
import MatterList from '../matterList/MatterList';
import {getMatters, matterChooseHasmore, matterChooseNofetech} from '../../action/matterChooseAction.js';
import './MatterChoose.less';
import {hashHistory} from 'react-router';
import nodata from './nodata.png';
function mapStateToProps(state){
  return {
  	data:state.matterChoose.data,
      animating:state.matterChoose.isFetching,
      isloading:state.matterChoose.isloading,
      nomore:state.matterChoose.nomore,
  };
}

function mapDispatchToProps(dispatch){
  return {
      matterChooseHasmore:()=>dispatch( matterChooseHasmore()),
      matterChooseNofetech:()=>dispatch(matterChooseNofetech()),
  	getMatters:(processType,matterType,pageSize,pageIndex,isquery)=>dispatch(getMatters(processType,matterType,pageSize,pageIndex,isquery))
  };
}

class MatterChoose extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          display:'none', top:'0px',
          height:(window.innerHeight || document.body.clientHeight)*3/4,
          isloading:false,
          isdisplay:"none",
        pageSize:10,
        pageIndex:0,
        processType:this.props.params.processType,
        matterType:this.props.params.matterType,
        userName:this.props.params.userName,
        div_style:{
            backgroundColor:"gray",
            display:'block',
        }
      };
  }
  componentDidMount(){
      this.props.matterChooseHasmore();
      this.loadData();
      let that =this;
      this.mic=0;
      localStorage.setItem("mic",this.mic+'');
      this.timer=setTimeout(function () {
          if(that.props.animating==true&&localStorage.getItem("mic")==that.mic+''){
              clearTimeout(that.timer);
              that.timer=null;
              that.props.matterChooseNofetech();
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
  loadData(){
    this.props.getMatters(this.state.processType,this.state.matterType,this.state.pageSize,this.state.pageIndex,true);
  }
    goBack(){
       /* if(this.props.params.processType==0)
            hashHistory.push('/sendManage/'+this.props.params.userName);
        else
            hashHistory.push('/receiveManage/'+this.props.params.userName);*/

        hashHistory.goBack()
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
            let pagenum=this.state.pageIndex+1;
            this.setState({pageIndex:pagenum});
            this.props.getMatters(this.state.processType,this.state.matterType,this.state.pageSize,pagenum,false);
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
            return this.props.data.map((item,index)=>{
                return <MatterList {...this.state} key={index} data={item} title={this.state.title}/>
            })
        }
        else if(!this.props.animating){
            return   <div style={nodataStyle}></div>;

        }
    }
	render(){
        let message = (
            <div className='matterChoose'>
              <NavBar leftContent="返回"
                      ref={el => this.lv1 = el}
                   style={{position:"fixed",left:"0px",top:"0px",width:"100%"}}
                  mode="light"
                      icon={<Icon type="left" />}
                  onLeftClick={()=>{
                      this.goBack();
                  }}
                  >
                  {this.state.matterType=='0'?'待办事项':'在办事项'}
              </NavBar>
                <div className="scrollview" style={{height:this.state.height,width:'100%',position:'absolute',top:this.state.top,zIndex:-1}} onScroll={this.myscroll}  ref={el => this.lv3= el}>
                    {this.insertBlock()}
                    <p style={{textAlign:"center",height:'200px',display:this.state.isdisplay}}>{this.props.nomore==true?"没有更多数据了":(this.state.isloading?'加载中...':'上拉加载更多')}</p>
                    <p ref={el => this.lv2 = el} ></p>
                </div>
                <ActivityIndicator
                    toast
                    text="加载中..."
                    animating={this.props.animating}
                />
            </div>
          );

	return message;
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(MatterChoose);

import { NavBar,Icon} from 'antd-mobile';
import React from 'react';
import {getBacklog,backlogNofetch} from '../../action/backlogAction.js';
import BacklogBlock from './BacklogBlock.js'
import {hashHistory} from "react-router";
import {connect} from "react-redux";
import nodata from './nodata.png';
function mapStateToProps(state){
    return {
        data:state.backlog.data,
        isFetching:state.backlog.isFetching
    }
}
function mapDispatchToProps(dispatch){
    return {
        getBacklog:()=>dispatch(getBacklog()),
        setNofetch:()=>dispatch(backlogNofetch())
    }
}
class Backlog extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.getBacklog();
    }
    insertBlock=()=>{
        if (this.props.data!==undefined){
            return this.props.data.map((item,index)=>{
                return <BacklogBlock data={item}
                                     key={index}
                                     userName={this.props.params.userName}
                >

                </BacklogBlock>
            })
        }

    }
    render() {
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
        let countNumber =this.props.data?this.props.data.length:0;
        let message;
        if(countNumber==0){
            message = ( <div style={{height:height,width:'100%'}}><div style={nodataStyle}></div></div>);
        }
        else {
            message=(this.insertBlock());
        }
        return (<div>
                <NavBar
                    mode="light"
                    leftContent="返回"
                    icon={<Icon type="left" />}
                    style={{position:"fixed",left:"0px",top:"0px",width:"100%"}}
                    onLeftClick={()=>{
                            /*hashHistory.push('/homePage/'+this.props.params.userName);*/
                            hashHistory.goBack()
                    }}
                >
                    <span >待办事项</span>
                </NavBar>
                <div style={{paddingTop:"0.9rem"}}>
                    {
                        message
                    }
                </div>

           </div>);

    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Backlog);
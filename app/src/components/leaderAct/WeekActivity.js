import { NavBar,Accordion,WingBlank,WhiteSpace } from 'antd-mobile';
import React from 'react';
import './WeekActivity.less';
import ts_img from './tishi.png'
import TOOLS from '../../utils/tools'
import person_img from '../matterList/person.png';
class WeekActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }
    componentDidMount(){

    }
    render() {
        let datas=this.props.data;
        let plans=datas.map((item,index)=>{
            let myweek=new TOOLS().date2week(item['date']);
            if(item['data']==''||item['data']==null||item['data']==undefined){
                return <Accordion.Panel header={<span>{item['date']}&nbsp;&nbsp;&nbsp;{myweek }</span>}  className="pad" key={item['date']}>
                    <WingBlank size = 'sm'>
                        <div className="leader_nocontent" style={{textAlign:'center'}}>暂无领导活动
                        </div>
                    </WingBlank>
                </Accordion.Panel>
            }
            else {

                return <Accordion.Panel key={item['date']} header={<span>{item['date']}&nbsp;&nbsp;&nbsp;{myweek} <img src={ts_img}></img></span>} className="pad">
                    <WingBlank size = 'sm'>
                        {item.data.map((item1,index1)=>{
                            return <div className="leader_content" key={index1}>
                                <div className="leader_left">
                                    <div className="person_ic">
                                        <img src={person_img} alt="领导:"/><span></span>
                                    </div>
                                    <div className="person_myname"><span>{item1['name']}</span></div>
                                </div>
                                <div className="leader_right">
                                    <WingBlank size = 'lg'>
                                        <p>{item1['content']}</p>
                                    </WingBlank>
                                </div>

                            </div>
                        })}
                    </WingBlank>
                </Accordion.Panel>
            }

        })
        return (
            <WingBlank size = 'sm'>
            <Accordion defaultActiveKey={this.props.defalutkey} className="my-accordion">
                {plans}
            </Accordion>
            </WingBlank>);
    };
}
export default WeekActivity;
import React from 'react';
import moment from 'moment';
import { Card, WhiteSpace,WingBlank } from 'antd-mobile';
//引入样式
import './meetingBlock.less';
import meet_png from './meeting.png'
import dire_png from './icon_dire.png'
import place_png from './place.png'
class MeetingBlock extends React.Component{
    constructor(props){
        super();
        this.state={

        }
    }
    computestr(stime,etime){
        let sdate=moment(stime).format('YYYY年M月D日');
        let edate=moment(etime).format('YYYY年M月D日');
        let sm=moment(stime).format('M');
        let em=moment(etime).format('M');
        let sd=moment(stime).format('D');
        let ed=moment(etime).format('D');
        let sy=moment(stime).format('YYYY');
        let ey=moment(etime).format('YYYY');
        let edatestr='';
        if(sy!==ey){
                edatestr='('+edate+')';
        }
        else if(sm!==em){
            edatestr='('+moment(etime).format('M月D日')+')';
        }
        else if(sd!==ed){
            edatestr='('+moment(etime).format('D日')+')';
        }
        else {
            edatestr=''
        }
        return edatestr;
    }
    render(){
        let weekarr=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        let sdate=moment(this.props.data.STARTTIME).format('YYYY年M月D日')+"("+weekarr[moment(this.props.data.STARTTIME).format("d")]+")";
        let stime=moment(this.props.data.STARTTIME).format('HH:mm');
        let etime=moment(this.props.data.ENDTIME).format('HH:mm');
        let edatestr= this.computestr(this.props.data.STARTTIME,this.props.data.ENDTIME);
        return (
            <div className='meetingBlock'>
                <WingBlank size = 'lg'>
                <Card >
                    <Card.Header
                        title={<span>&nbsp;{this.props.data.ATTENDDEPTNAME}</span>}
                        thumb={meet_png}
                        extra={<div><img src={place_png} alt=""/><span> {this.props.data.ROOMNAME}</span></div>}
                    />
                    <Card.Body>
                        <div className='sdate'>
                            <p>{sdate}</p>
                            <div>{stime}<span><img src={dire_png} alt=""/><span></span><b>{edatestr}</b></span>{etime}</div>
                        </div>
                        <div className='organizers'>
                            <div className='organizer_name'>会议议题:</div>
                            <div className='organizer'>{this.props.data.CONFTOPIC}</div>
                        </div>
                        <div className="attendee">
                            <div className='department_name'>参会方:</div>
                            <div className='department'>{this.props.data.CONFCONTENT}</div>
                        </div>

                    </Card.Body>
                </Card>
                </WingBlank>
            </div>
        );
    }
}

export default MeetingBlock;
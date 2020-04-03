import React from 'react';
import {Button,Flex,WingBlank,WhiteSpace} from 'antd-mobile';
import {hashHistory} from 'react-router';
import './libraryBlock.less';
class libraryBlock extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    pageChange(){

        let processType,matterType; // matterType(0-待办，1-在办) processType(0-发文，1-收文)        
        
        let title = this.props.data.name;

        if(title==='发文库'){
            processType = 0;
        }
        else if(title==='收文库'){
            processType = 1;
        }
        hashHistory.push('/libraryChoose/'+this.props.userName+'/'+processType);

    }

    render(){
        if(this.props.data!=undefined)
            return (
                <WingBlank size = 'lg'>
                <WhiteSpace size = 'lg' />
                <div className='libraryBlock'>
                    <div className = 'total'>
                        <WingBlank size = 'lg'>
                            <WhiteSpace size = 'lg' />
                            <div className = 'left'>
                                <img src = {this.props.imgURL} className = 'img_style'/>
                            </div>

                            <div className = 'right'>
                                <WingBlank>
                                    <WhiteSpace size = 'lg' />
                                    <span>{this.props.data.name}</span>
                                    <br/><br/>
                                    <span>{this.props.data.name}共{this.props.data.count}项</span>
                                    <WhiteSpace size = 'lg' />
                                    <div>
                                        <Button className="btn" type="primary" onClick={this.pageChange.bind(this)}>点击查看</Button>
                                    </div>
                                    <WhiteSpace size="lg" />
                                </WingBlank>
                            </div>

                            <WhiteSpace size = 'lg' />
                        </WingBlank>
                    </div>
                </div>
                <WhiteSpace size = 'lg' />
                </WingBlank>
            );
        else
        return null;
    }
}

export default libraryBlock;
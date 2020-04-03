import React from 'react';
import {Modal, Button, WhiteSpace, WingBlank, Toast, SearchBar, Accordion, List, Checkbox, Flex, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {departmentTree,getSecondTask,getDeptAndUser} from '../../action/detailAction.js';
import './StaffModal.less';
import { compose } from '../../../../node_modules/redux';
require('es6-object-assign').polyfill();
const alert = Modal.alert
const CheckboxItem = Checkbox.CheckboxItem
const RadioItem = Radio.RadioItem;



function mapStateToProps(state){
  return {
    depAndUser:state.detail.depAndUser,
  };
}

function mapDispatchToProps(dispatch){
  return {
    getDeptAndUser:(parameter)=>dispatch(getDeptAndUser(parameter)),
  };
}

const hasSelected = (key, arr) => {
    return arr.some(item => {
        return item === key;
    });
}

class StaffModal extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            modal: false,
            data: [],
            selected: [],
            selectedName: [],
            single: -1,
            search:'',
            newKey:0,//每次打开新的modal
            //isRadio: this.props.showUser.isRadio,//单选多选
            tasks:this.props.tasks,//返回结果集
        };
    }

    componentDidMount(){

    }

    showModal = key => (e) => {
        /*var parameter ='a=a';
        var dep=0;
        for(let i in this.props.showUser){
           if(i!='showName'&&i!='returnName'&&i!='isRadio'){
               if('deptIds'==i){
                dep++;
               }
               parameter +='&'+i+'='+this.props.showUser[i];
           }
        }*/
        var parameter ='1=1';
        for(let i in this.props.showUser){
           if(i!='showName'&&i!='returnName'&&i!='isRadio'){
                parameter +='&'+i+'='+this.props.showUser[i];
           }
        }
        /*if(dep==0){
            parameter +='&deptIds=100130';
        }*/
        this.props.getDeptAndUser(parameter);
        // 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
        // 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
        e.preventDefault(); // 修复 Android 上点击穿透
        // this.props.departmentTree(Object.assign({},{depID:this.props.depID},{fullName:""}));
        // this.setState({
        //     [key]: true,
        //     newKey:this.state.newKey+1
        // });
        this.setState({
            [key]: true,
        });
    }

    onClose = key => () => {
        var returnValue=this.props.returnValue;
        var start1=0;
        for(let i in returnValue){//如果判定是否有包含返回对象的参数。有则替换 无则添加。
            for(let j in returnValue[i]){
                if(j==this.props.showUser.returnName){
                    start1=i;
                    break;
                }
            }
        }
        if(start1==0){
            returnValue.push({[this.props.showUser.returnName]:[this.state.selected]+""});
        }else{
            returnValue[start1]={[this.props.showUser.returnName]:[this.state.selected]+""};
        }
        this.setState({
            [key]: false,
            },() => {
                if(this.state.selected.length>0){
                    if(this.props.showUser.less>0){
                        this.props.setShowConfirm(this.props.showConfirm +1+parseInt(this.props.showUser.less));
                    }else{
                        this.props.setShowConfirm(this.props.showConfirm +1);
                    }
                    this.props.setReturnValue(returnValue);
                }else if(this.props.showConfirm>0){
                    if(this.props.showUser.less>0){
                        this.props.setShowConfirm(this.props.showConfirm -1-parseInt(this.props.showUser.less));
                    }else{
                        this.props.setShowConfirm(this.props.showConfirm -1);
                    }
                }
        });
    }

    onSelectChange = (key, name) => {
        //通过员工id进行员工选择状态的转换
        let selected = this.state.selected.concat();
        let selectedName = this.state.selectedName.concat();
        let count = 0;
        let deleteIndex = 0;
        if (hasSelected(key, selected)) {
            selected = selected.filter((item) => {
                count++;
                if (item !== key) {
                    return true;
                } else {
                    deleteIndex = count;
                    return false;
                }
            })
            count = 0;
            selectedName = selectedName.filter(() => {
                count++;
                return count !== deleteIndex;
            });
        } else {
            selected.push(key);
            selectedName.push(name);
        }
        this.setState({
            selected: selected,
            selectedName: selectedName,
        });
    }

    onSearchChange = (key) => {
       // this.renderItem(key);
        this.setState({
            search:key,
        });
       // this.props.departmentTree(this.props.depID,key);
    }

    judgeValue= (key) =>{
        if(key=='')
            this.props.departmentTree(this.props.depID,key);
    }

    renderName() {
        let selectedName = this.state.selectedName.concat();
        let nameStr = selectedName.join(',');
        let array = [] ;
        let be_style={
            color:'#c4c4c4',
            position:'relative',
            left:'-20px'
        };//未选择人员前字体颜色设置
        let af_style={
            color:'RGB(51,51,51)',
            position:'relative',
            left:'-20px'
        };//选择人员后字体颜色设置加深
        array.push(be_style);
        array.push(af_style);
        array.push(nameStr);
        return array;
    }
    contentjoint(item,value) {
        let content=(
            <Accordion.Panel key={item.DEPID} header={item.DEPNAME} className='pad'>
                <List className='sm-list'>
                {item.children.map((staff,index)=>{
                    if(staff.DEPID!=null){
                        var compare=this.compare(staff,value);
                        if(compare>0){
                            return (
                                <Accordion Key={staff.DEPID+"1"}  onChange={this.onChange}>
                                    {this.contentjoint(staff,value)}
                                </Accordion>
                                );
                        }
                    }else{
                        if(value==null||staff.USERNAME.indexOf(value)!=-1){
                            if(this.props.showUser.isRadio=='0')
                                return (
                                        <CheckboxItem key={staff.USERID} checked={hasSelected(staff.USERID,  this.state.selected)}
                                                    onChange={() => this.onSelectChange(staff.USERID, staff.USERNAME)}>
                                                    &nbsp;{staff.USERNAME}
                                        </CheckboxItem>
                                    );
                            else
                                return (
                                    <RadioItem key={index} checked={this.state.single === staff.USERID}
                                        onChange={() => {
                                            this.setState({
                                                single:staff.USERID,
                                                selected: new Array(`${staff.USERID}`),
                                                selectedName:new Array(`${staff.USERNAME}`)
                                            })}
                                        }>
                                        &nbsp;{staff.USERNAME}
                                    </RadioItem>
                                );
                            }
                        }
                    })}
                </List>
            </Accordion.Panel>
        )
        return content;
    }
    compare(item,value,hasi) {
        if(!hasi){
            window.comi = 0
        }
        let insert =  item.children.map((staff,index)=>{
            if(staff.DEPID!=null){
                return  this.compare(staff,value,true)
            }else{
                if(value==null||staff.USERNAME.indexOf(value)!=-1){
                    window.comi++;
                }
            }
        });
        return window.comi;
    }
    renderItem(){
      if(this.props.depAndUser!=null){
        let key=this.state.search;
        let insert = this.props.depAndUser.map((item,index) => {
    		return (
    			this.contentjoint(item,key)
            );

        });
    	return insert;
      }
    }

	render(){
    let message;
		message = (
			<div className='StaffModal'>
				<Flex direction="row" justify="start" style={{overflow:"hidden"}}>
			      <Flex.Item className="choose_people"><span className="title">{this.props.staffModalTitle}:</span></Flex.Item>
			      <Flex.Item  style={{flex:"2"}}>
                      <div className='auditstep'>
    			      	<span className="content" style={this.state.selected.length > 0 ? this.renderName()[1] : this.renderName()[0]}>
                            {this.state.selected.length > 0 ? this.renderName()[2] : '请选择人员'}
                        </span>
                      </div>
			      </Flex.Item>
			      <Flex.Item>
			      	<Button
                        className="sm-btn"
                        type="primary"
                        inline size="small"
                        onClick={this.showModal('modal')}
                      //  disabled={sureChoose? '':'disbaled'}
                      >选择人员</Button>
			      </Flex.Item>
			    </Flex>

			    <Modal
	                transparent
                    key={this.state.newKey}
	                maskClosable={false}
	                visible={this.state.modal}
	                onClose={this.onClose('modal')}
	                footer={[
                        { text: '取消', onPress: () => {
                            if(this.state.selected.length>0&&this.props.showConfirm>0){
                                if(this.props.showUser.less>0){
                                    this.props.setShowConfirm(this.props.showConfirm -1-parseInt(this.props.showUser.less));
                                }else{
                                    this.props.setShowConfirm(this.props.showConfirm -1);
                                }
                            }
                            this.setState({selected: [], selectedName: [],single:[]});
                            this.onClose('modal')();
                        } },
	                    { text: '确定', onPress: () => { this.onClose('modal')(); } }
	                    ]}
	                style={{width: '90%'} }
	                >

	                <SearchBar placeholder="输入姓名查找" cancelText="确认" onCancel={this.onSearchChange} onChange={this.judgeValue}/>
	                <Accordion defaultActiveKey="0" className="sm-accordion" onChange={this.onChange}>
	                    {this.renderItem()}
	                </Accordion>
	            </Modal>
			</div>
		);
		return message;
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(StaffModal);

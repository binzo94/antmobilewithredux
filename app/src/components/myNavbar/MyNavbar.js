import React, {Component} from 'react'

import {NavBar,Icon} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
class MyNavbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <NavBar leftContent="返回"
                mode="light"
                onLeftClick={()=>{
                    this.props.history.go(-1);
                }}
                >
                {this.props.navName}
            </NavBar>
        </div>
        )
    }
}

export default withRouter(MyNavbar)

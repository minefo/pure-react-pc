/**
 * Created by chenxuhua on 2017/9/27.
 */
import React from 'react';
import { Icon } from 'antd';
export default class PageContaner extends React.Component {
    constructor(props) {
        super(props);
    }
    static contextTypes={
        router: React.PropTypes.object
    }
    handleExit = (e) => {
         this.context.router.push(`/login`);
    }
    render() {
        return (
            <div className="header-container clearfix">
                <div className="left-title">
                   某某管理平台
                </div>
                <ul className="right-content clearfix">
                    <li><Icon type="user" /> 张三</li>
                    <li className="pointer"><Icon type="edit" /> 修改密码</li>
                    <li className="pointer"  onClick={this.handleExit}><Icon type="logout" /> 退出</li>
                </ul>
            </div>
        )
    }
}

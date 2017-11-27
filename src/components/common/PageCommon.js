/**
 * Created by chenxuhua on 2017/9/27.
 */
import React from 'react';
import Header from './Header';
import Sider from './Sider';
import Bread from "./Bread";




export default class PageCommon extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        //this.props.routes.shift();
        return (
            <div>
                     <Header></Header>
                     <aside>
                         <div className="left-wrap">
                             <Sider routes={this.props.routes} ></Sider>
                         </div>
                     </aside>
                    <div className="right-wrap">
                        <div className="bread-wraper">
                        <Bread routes={this.props.routes} params={this.props.router.params}></Bread>
                        </div>
                        {this.props.children}
                    </div>
            </div>
        )
    }
}


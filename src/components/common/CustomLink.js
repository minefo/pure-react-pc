/**
 * Created by chenxuhua on 2017/9/27.
 */
import React from 'react';
import { Link ,browserHistory } from 'react-router'


export default class CustomLink extends React.Component {
    // componentWillMount() {
    //     console.log("componentWillMount");
    // }
    //
    // componentDidMount() {
    //     console.log("componentDidMount");
    // }

    componentWillReceiveProps(nextProps) {
        // this.forceUpdate();
        // console.log("componentWillReceiveProps");
    }

    // shouldComponentUpdate() {
    //     console.log("shouldComponentUpdate");
    //     return true;        // 记得要返回true
    // }
    //
    // componentWillUpdate() {
    //     console.log("componentWillUpdate");
    // }
    //
    // componentDidUpdate() {
    //     console.log("componentDidUpdate");
    // }
    //
    // componentWillUnmount() {
    //     console.log("componentWillUnmount");
    // }

    render() {
        var samePath=false;
        if(this.props.routes.length>1){
            var len=this.props.routes.length;
            len--;
            var localName =this.props.routes[len].path.substr(1);
            if(localName){
                samePath=this.props.linkHref.indexOf(localName)>-1?true:false;
            }
        }
        return (
             samePath? <a href="javascript:">{this.props.linkName}</a>:<Link to={this.props.linkHref}>{this.props.linkName}</Link>
        );
    }
}



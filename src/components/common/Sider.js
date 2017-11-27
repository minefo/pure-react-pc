/**
 * Created by chenxuhua on 2017/9/27.
 */
import React from 'react';
import { Link } from 'react-router'
import { Menu, Icon } from 'antd';
import CustomLink from "./CustomLink";
const SubMenu = Menu.SubMenu;



export default class Sider extends React.Component {
    state = {
        openKeys: ['sub1'],
        selectedKeys:[],
    };
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
    }
    componentDidMount() {
        var localName =this.props.routes[1]?this.props.routes[1].path.substr(1):"";
        this.setState({
            selectedKeys: localName ? [localName] : [],
        });
    }
    componentWillReceiveProps(){
        var localName =this.props.routes[1]?this.props.routes[1].path.substr(1):"";
        this.setState({
            selectedKeys: localName ? [localName] : [],
        });
    }

    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                selectedKeys={this.state.selectedKeys}
                onOpenChange={this.onOpenChange}
                style={{ width: 240,marginTop:80 }}>
                <SubMenu key="sub1" title={<span><Icon type="setting" /><span>基础组件</span></span>}>
                    <Menu.Item key="categories">
                        <CustomLink linkHref="/categories" routes={this.props.routes} linkName="商品分类"></CustomLink>
                    </Menu.Item>
                    <Menu.Item key="dictionaryPage">
                        <CustomLink linkHref="/dictionaryPage" routes={this.props.routes} linkName="字典管理"></CustomLink>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="setting" /><span>高级用法</span></span>}>
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}



/**
 * Created by chenxuhua on 2017/10/12.
 */
import React from 'react'
import requestApi from './requestApi';
import { Modal,message} from 'antd';

const confirm = Modal.confirm;
const PageSomeThing={
    handlePageChange:function(current, pageSize){//分页操作
        this.setState({
            current:current,//当前页码
            pageSize:pageSize,//每页记录数
        },function () {
            this.getAjaxPage();
        });
    },

    addOrUpdate:function(param){
        var that=this;
        var load = that.state.pageUrl.add;
        load.param ={...that.state.editInit,...param};
        if(this.state.formAddAndEditStatus==='edit'){
            load = that.state.pageUrl.update;
            load.param ={...that.state.editInit,...param};
        }
        load.exec(function( data ){
            console.log("到这里");
            that.setState({ showFromAddAndEdit:false });
            message.success(data.msg);
            that.getAjaxPage();
        });
    },

    handleDel:function(id,customParam){//删除操作
        var that=this;
        confirm({
            title: '提示',
            content: '确定要执行该删除？',
            onOk() {
                var load =that.state.pageUrl.delete;
                load.param = customParam||{ [that.state.pageCommonkey.primaryKey]:id };
                load.exec(function( data ){
                    message.success(data.msg);
                    that.getAjaxPage();
                });
            }
        });
    },

    handleShowFromDataDetail:function(id,eType,customParam){//详情
        var that=this;
        var load = that.state.pageUrl.detail;
        load.param =customParam||{ [that.state.pageCommonkey.primaryKey]:id };
        load.exec(function( data ){
            if(eType==="edit"){
                that.setState({ showFromAddAndEdit:true,formAddAndEditStatus:'edit',editInit:{...that.state.editInit,...data.data} });
            }
            else{
                that.setState({ showDetail:true,editInit:{...that.state.editInit,...data.data} });
            }
        });
    },

    handleSearch:function(value){
        this.setState({
            pageSize:this.state.pageSize,
            current:1,
            [this.state.pageCommonkey.searchKey]:value
        },function () {
            this.getAjaxPage();
        });
    },
    getAjaxPage:function(customParam){
        var that=this;
        var load = this.state.pageUrl.pageAjax;
        load.param =customParam||{
                pageSize:that.state.pageSize,
                current:that.state.current,
                [this.state.pageCommonkey.searchKey]: this.state[this.state.pageCommonkey.searchKey],
                ...that.state.getAjaxPageOtherParam
        }
        that.props.loadingPage(true);
        load.exec(function( data ){
            that.props.loadingPage(false);
            that.setState({
                page: data.data.page,
                pageSize:data.data.pageSize,
                current:data.data.current,
                total:data.data.total
            });
        });
    }
}

export default PageSomeThing



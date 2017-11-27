/**
 * Created by chenxuhua on 2017/10/12.
 */
//kenley add start 公共引入区
import {React,connect,action,requestApi,PageSomeThing,autobind,reactMixin} from "../../commonjs/CommonImport"
const endPageSomeThing={...PageSomeThing,...{handleDelSuper:PageSomeThing.handleDel}};
//kenley add end 公共引入区

//页面特有区start
import {dicTypeList,pageConstant} from '../../constant/pageData';
import { Table, Icon,Row, Col,Input,Pagination,Button,Modal,Form,Select,Tooltip } from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;
//页面特有区end


@connect(
    state => ({
        commonState: state.commonState,
    }),
    action.commonState,
    (stateProps, dispatchProps, ownProps) => {
        return {
            ...stateProps,
            ...dispatchProps,
            ...ownProps,
        }
    },
    {
        pure: true,
        withRef: true,
    }
)
@reactMixin.decorate(endPageSomeThing)
@reactMixin.decorate(autobind(Object.keys(endPageSomeThing)))
export default class DictionaryPage  extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            page: [],
            pageSize: 10,
            current: 1,
            total: 0,

            //kenley 基本配置start
            pageUrl: {
                add:new requestApi.dictionary.dictionary_add(),
                delete: new requestApi.dictionary.dictionary_delete(),
                update:new requestApi.dictionary.dictionary_update(),
                detail: new requestApi.dictionary.dictionary_detail(),
                pageAjax: new requestApi.dictionary.dictionary_page(),
            },
            pageCommonkey: {
                primaryKey: "id",//主键
                searchKey: "name",//搜索键
                pageTitle: "字典",
            },

            formDetailTitle: "字典详情",
            showDetail: false,

            formAddTitle: "添加字典",
            formEditTitle: "编辑字典",
            formAddAndEditStatus: "",//add ,edit
            showFromAddAndEdit: false,
            editInit: {},//编辑时初始化的值
            //kenley 基本配置end
        }
    }

    columns = [
        {
            title: '序号',
            key: 'index',
            width:80,
            render: (text, row, index) => {
                return ++index;
            }
        },{
            title: '编码',
            dataIndex: 'dicCode',
            key: 'dicCode',
            render: text => <span>{text}</span>,
        },{
            title: '名称',
            dataIndex: 'dicName',
            key: 'dicName',
            render: text => <span>{text}</span>,
        },{
            title: '值',
            dataIndex: 'dicValue',
            key: 'dicValue',
            render: text => <span>{text}</span>,
        },{
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            width:400,
            render: text =>  <Tooltip placement="top" title={text}> <span> {text.length>50?text.substr(0,50)+'...':text}</span> </Tooltip>,
        },{
            title: '操作',
            key: 'action',
            width:300,
            render: (item, record) => (
                <span>
                   <a onClick={() =>{this.handleShowFromDataDetail(item.id,'edit')}}>编程</a>
                     <span className="ant-divider" />
                   <a onClick={()=>{this.handleDel(item.id)}}>删除</a>
                      <span className="ant-divider" />
                   <a onClick={()=>{this.handleShowFromDataDetail(item.id,'detail')}}>查看</a>
               </span>
            ),
        }];
    componentDidMount() {
        this.getAjaxPage();
    }

    render() {
        return (
            <div>
            {/*搜索区start*/}
            <div className="search-wraper">
                <Row gutter={16}>
                    <Col className="gutter-row" span={16}>

                    </Col>

                    <Col className="gutter-row" span={4}>
                        <Button type="primary" onClick={()=>this.setState({ showFromAddAndEdit:true,formAddAndEditStatus:'add',editInit:{} })}>{this.state.formAddTitle}</Button>
                    </Col>

                    <Col className="gutter-row" span={4}>
                        <Search
                            placeholder="请输入名称"
                            style={{ width: 200 }}
                            onSearch={this.handleSearch}
                        />
                    </Col>
                </Row>
            </div>
            {/*搜索区end*/}

            {/*数据区-可以直接复制start*/}
            <Table columns={this.columns} pagination={false} loading={this.props.commonState.loading} rowKey="id" dataSource={this.state.page} />
            <div className="pagination-wraper">
                <Pagination showSizeChanger onShowSizeChange={this.handlePageChange} onChange={this.handlePageChange} pageSize={this.state.pageSize} current={this.state.current} total={this.state.total} />
            </div>
            {/*数据区-可以直接复制end*/}

            {/*新增和编辑弹出层可以直接复制endstart*/}
            <Modal
                footer={null}
                title={this.state.formAddAndEditStatus=='add'?this.state.formAddTitle:this.state.formEditTitle}
                visible={this.state.showFromAddAndEdit}
                maskClosable={false}
                onCancel={()=>this.setState({ showFromAddAndEdit:false })}>
                <WrappedAddAndEditForm editInit={this.state.editInit} formAddAndEditStatus={this.state.formAddAndEditStatus} getAjaxPage={this.getAjaxPage} addOrUpdate={this.addOrUpdate} hideModal={()=>this.setState({ showFromAddAndEdit:false })}></WrappedAddAndEditForm>
            </Modal>
            {/*新增和编辑弹出层可以直接复制endend*/}

            {/*详情弹出层start*/}
            <Modal
                footer={null}
                title={this.state.formDetailTitle}
                visible={this.state.showDetail}
                onCancel={()=>this.setState({ showDetail:false })}>
                <Form>
                    <FormItem
                        label="编码"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: pageConstant.inputWidth }}>
                        {this.state.editInit.dicCode}
                    </FormItem>

                    <FormItem
                        label="名称"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: pageConstant.inputWidth }}>
                        {this.state.editInit.dicName}
                    </FormItem>

                    <FormItem
                        label="值"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: pageConstant.inputWidth }}>
                        {this.state.editInit.dicValue}
                    </FormItem>

                    <FormItem
                        label="备注"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span:pageConstant.textareaWidth }}>
                        {this.state.editInit.remark}
                    </FormItem>

                    <FormItem className={'txt-center'}>
                        <Button type="dashed" onClick={()=>this.setState({ showDetail:false })}>关闭</Button>
                    </FormItem>
                </Form>
            </Modal>
            {/*详情弹出层end*/}

        </div>);
    }
}




//新增和编辑表单
class AddAndEditForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, param) => {
            if (!err) {
                 this.props.addOrUpdate(param);
            }
        });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="编码"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: pageConstant.inputWidth }}
                >
                    { this.props.form.getFieldDecorator('dicCode', {
                        rules: [{ required: true, message: '请输入编码' }],
                    })(
                        <Input autoComplete="off"/>
                    )}
                </FormItem>
                <FormItem
                    label="名称"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: pageConstant.inputWidth }}
                >
                    { this.props.form.getFieldDecorator('dicName', {
                        rules: [{ required: true, message: '请输入名称' }],
                    })(
                        <Input  autoComplete="off"/>
                    )}
                </FormItem>
                <FormItem
                    label="值"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: pageConstant.inputWidth }}
                >
                    { this.props.form.getFieldDecorator('dicValue', {
                    })(
                        <Input autoComplete="off"/>
                    )}
                </FormItem>

                <FormItem
                    label="备注"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: pageConstant.textareaWidth }}
                >
                    { this.props.form.getFieldDecorator('remark', {
                    })(
                        <Input   type="textarea" style={{"height":pageConstant.textareaHeight}} autoComplete="off"/>
                    )}
                </FormItem>

                <FormItem className={'txt-center'}>
                    <Button type="primary" htmlType="submit">确定</Button>
                    <span className={'form-btnspace'}></span>
                    <Button type="dashed" onClick={this.props.hideModal}>取消</Button>
                </FormItem>
            </Form>
        );
    }
}
const WrappedAddAndEditForm = Form.create({
    mapPropsToFields(props) {
        return {
            code: {
                value: props.editInit.dicCode,
            },
            name: {
                value: props.editInit.dicName,
            },
            value: {
                value: props.editInit.dicValue,
            },
            remark: {
                value: props.editInit.remark,
            },
        };
    },
})(AddAndEditForm);







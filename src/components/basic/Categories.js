/**
 * Created by chenxuhua on 2017/9/27.
 */
//kenley add start 公共引入区
import {React,connect,action,requestApi,PageSomeThing,autobind,reactMixin} from "../../commonjs/CommonImport"
const endPageSomeThing={...PageSomeThing,...{handleDelSuper:PageSomeThing.handleDel}};
//kenley add end 公共引入区

//页面特有区start
import { Link } from 'react-router'
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
export default class SourceProductMappingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: [],
            pageSize: 10,
            current: 1,
            total: 0,

            //kenley 基本配置start
            pageUrl: {
                add:new requestApi.commodity.categories_add(),
                delete: new requestApi.commodity.categories_delete(),
                update: new requestApi.commodity.categories_update(),
                detail: new requestApi.commodity.categories_detail(),
                pageAjax: new requestApi.commodity.categories_page(),
            },
            pageCommonkey: {
                primaryKey: "id",//主键
                searchKey: "categoriesName",//搜索键
                pageTitle: "商品分类",
            },

            formDetailTitle: "商品分类详情",
            showDetail: false,

            formAddTitle: "添加商品分类",
            formEditTitle: "编辑商品分类",
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
        title: '商品分类编码',
        dataIndex: 'categoriesCode',
        key: 'categoriesCode',
        render: text => <span>{text}</span>,
    },{
        title: '商品分类名称',
        dataIndex: 'categoriesName',
        key: 'categoriesName',
        render: text => <span>{text}</span>,
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
                   <Link to={ { pathname:`/subCategories/${item.categoriesCode}` }}>子分类</Link>
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
                            <Button type="primary"  onClick={()=>this.setState({ showFromAddAndEdit:true,formAddAndEditStatus:'add',editInit:{} })}>{this.state.formAddTitle}</Button>
                        </Col>

                        <Col className="gutter-row" span={4}>
                            <Search
                                placeholder="请输入关键字"
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
                            label="商品分类编码"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: pageConstant.inputWidth }}>
                            {this.state.editInit.categoriesCode}
                        </FormItem>

                        <FormItem
                            label="商品分类名称"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: pageConstant.inputWidth }}>
                            {this.state.editInit.categoriesName}
                        </FormItem>

                        <FormItem className={'txt-center'}>
                            <Button type="dashed" onClick={()=>this.setState({ showDetail:false })}>关闭</Button>
                        </FormItem>
                    </Form>
                </Modal>
                {/*详情弹出层end*/}
            </div>
        );
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
                    label="商品分类编码"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: pageConstant.inputWidth }}
                >
                    {this.props.form.getFieldDecorator('categoriesCode', {
                        rules: [{ required: true, message: '请输入商品分类编码' }],
                    })(
                        <Input autoComplete="off"/>
                    )}
                </FormItem>
                <FormItem
                    label="商品分类名称"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: pageConstant.inputWidth }}
                >
                    {this.props.form.getFieldDecorator('categoriesName', {
                        rules: [{ required: true, message: '请输入商品分类名称' }],
                    })(
                        <Input  autoComplete="off"/>
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
            categoriesCode: {
                value: props.editInit.categoriesCode,
            },
            categoriesName: {
                value: props.editInit.categoriesName,
            },
        };
    },
})(AddAndEditForm);




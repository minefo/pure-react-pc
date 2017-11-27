/**
 * Created by chenxuhua on 2017/9/27.
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
export default class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: [],
            pageSize: 10,
            current: 1,
            total: 0,

            //kenley 基本配置start
            pageUrl: {
                add:new requestApi.commodity.productPage_add(),
                delete: new requestApi.commodity.productPage_delete(),
                update: new requestApi.commodity.productPage_update(),
                detail: new requestApi.commodity.productPage_detail(),
                pageAjax: new requestApi.commodity.productPage_page(),
            },
            pageCommonkey: {
                primaryKey: "id",//主键
                searchKey: "productName",//搜索键
                pageTitle: "产品",
            },
            getAjaxPageOtherParam:{
                categoriesCode:this.props.router.params.categoriesCode,
            },

            formDetailTitle: "产品详情",
            showDetail: false,

            formAddTitle: "添加产品",
            formEditTitle: "编辑产品",
            formAddAndEditStatus: "",//add ,edit
            showFromAddAndEdit: false,
            editInit: {
                categoriesCode:this.props.router.params.categoriesCode,
            },//编辑时初始化的值
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
            },
            {
                title: '产品编码',
                dataIndex: 'productCode',
                key: 'productCode',
                render: text => <span>{text}</span>,
            },
            {
                title: '产品名称',
                dataIndex: 'productName',
                key: 'productName',
                render: text => <span>{text}</span>,
            },
            {
                title: '操作',
                key: 'action',
                width:300,
                render: (item, record) => (
                    <span>
                          <a onClick={() =>{this.handleShowFromDataDetail(item.id,'edit')}}>编程</a>
                             <span className="ant-divider" />
                           <a onClick={()=>{this.handleDel(item.id)}}>删除</a>
                    </span>
                ),
           }
      ];

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
                            <Button type="primary"  onClick={()=>this.setState({ showFromAddAndEdit:true,formAddAndEditStatus:'add',editInit:{ productCode:this.props.router.params.productCode} })}>{this.state.formAddTitle}</Button>
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
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="产品编码"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: pageConstant.inputWidth }}
                >
                    {getFieldDecorator('productCode', {
                        rules: [{ required: true, message: '请输入产品编码' }],
                    })(
                        <Input autoComplete="off"/>
                    )}
                </FormItem>
                <FormItem
                    label="产品名称"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: pageConstant.inputWidth }}
                >
                    {getFieldDecorator('productName', {
                        rules: [{ required: true, message: '请输入产品名称' }],
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
            productCode: {
                value: props.editInit.productCode,
            },
            productName: {
                value: props.editInit.productName,
            }
        };
    },
})(AddAndEditForm);




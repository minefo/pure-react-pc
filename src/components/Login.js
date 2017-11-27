/**
 * Created by chenxuhua on 2017/9/27.
 */
import React from 'react';
import { Form, Icon, Input, Button,Row,Col,message } from 'antd';
import requestApi from '../commonjs/requestApi';
import md5 from 'js-md5';
const FormItem = Form.Item;


class Login extends React.Component {
    verifyUuid="";
    static contextTypes={
        router: React.PropTypes.object
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var that=this;
        that.props.form.validateFields((err, formValues) => {
            if (!err) {
                var load = new requestApi.login.login_userLogin();
                load.param ={
                    userName:formValues.userName,
                    password:md5(formValues.password),
                    verifyCode:formValues.verifyCode,
                };
                load.exec(function( data ){
                    if(data.success){
                        localStorage.setItem('fullName', "张三");//测试环境
                        localStorage.setItem('token', "测试token");
                        that.context.router.push(`/index`);
                    }
                    else{
                        that.props.form.resetFields();
                        that.hanlderChangeCode();
                        message.error(data.errorMsg);
                    }
                },function (error) {
                    that.hanlderChangeCode();
                });
            }
        });
    }
    componentDidMount() {
        this.hanlderChangeCode();
    }
    hanlderChangeCode=()=>{
        var load = new requestApi.login.login_getVerifyCode();
        var that=this;
        load.exec(function( data ){
             console.log("data="+JSON.stringify(data));
            that.codeImg.src="data:image/png;base64,"+data.data.verifyCode;
        },function (error) {
            that.codeImg.src=require("../images/codeflush.png");
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div  className="login-container">
                <Form onSubmit={(e)=>{this.handleSubmit(e)}} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名' }],
                        })(
                            <Input autoComplete="off" prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input autoComplete="off" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>

                    <FormItem>
                        <Row gutter={8}>
                            <Col span={8}>
                                {getFieldDecorator('verifyCode', {
                                    rules: [{ required: true, message: '请输入验证码' }],
                                })(
                                    <Input autoComplete="off"  type="text" placeholder="验证码" />
                                )}
                            </Col>
                            <Col span={16}>
                                <img  id="code" ref={(el) => { this.codeImg = el; }}   onClick={this.hanlderChangeCode}  style={{verticalAlign:"middle"}}  title="刷新验证码" className="pointer" height="25"/>
                            </Col>
                        </Row>
                    </FormItem>


                    <FormItem style={{"textAlign":"center"}}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedLoginForm = Form.create()(Login);
export default  WrappedLoginForm;



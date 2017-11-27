/**
 * Created by chenxuhua on 2017/11/15.
 */


import configRequestUrl  from '../commonjs/configRequestUrl';
import * as pageSimpler  from '../util/pageSimpler';
import {allPageField} from "../commonjs/allPageField";
var Mock = require('mockjs');


var mockMehods=[]
Object.keys(configRequestUrl).forEach((levelOneKey)=>{
    var itemObj=configRequestUrl[levelOneKey];
    Object.keys(itemObj).forEach((levelTwoKey)=>{
        if(levelTwoKey.indexOf("_detail")>-1){
            mockMehods.push(pageSimpler.detail(itemObj[levelTwoKey],allPageField[levelTwoKey],Object.keys(allPageField[levelTwoKey])));
        }
        else if(levelTwoKey.indexOf("_page")>-1){
            mockMehods.push(pageSimpler.page(itemObj[levelTwoKey],allPageField[levelTwoKey],Object.keys(allPageField[levelTwoKey])));
        }
        else{
            mockMehods.push(pageSimpler.addDelUpdate(itemObj[levelTwoKey]));
        }
    });
})




var login_userLogin=Mock.mock(configRequestUrl.login.login_userLogin, 'post', function(options) {
    console.log("param-page="+options.body);
    var finalContent={
        name:"张三",
        token:"13343435"
    };
    return pageSimpler.mockCreateResult(finalContent);
})


var login_getVerifyCode=Mock.mock(configRequestUrl.login.login_getVerifyCode, 'post', function(options) {
    console.log("param-page="+options.body);
    var finalContent={
        verifyCode:Mock.Random.dataImage("62x25")
    };
    finalContent.verifyCode=finalContent.verifyCode.replace("data:image/png;base64,","");
    return pageSimpler.mockCreateResult(finalContent);
})




export default {
    ...mockMehods,
    login_userLogin,
    login_getVerifyCode,
}

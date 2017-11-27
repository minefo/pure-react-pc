/**
 * Created by chenxuhua on 2017/9/27.
 */

import requestFactory from './requestFactory'
import configRequestUrl from "./configRequestUrl"
require('../mock');//前后端分离
var requestApi = {};
Object.keys(configRequestUrl).forEach((levelOneKey)=>{
    var itemObj=configRequestUrl[levelOneKey];
    var newObj={};
    Object.keys(itemObj).forEach((levelTwoKey)=>{
        newObj[levelTwoKey]= requestFactory.Generator(function () {
            this.url =itemObj[levelTwoKey];
        })
    });
    requestApi[levelOneKey]=newObj;
})


export default requestApi;

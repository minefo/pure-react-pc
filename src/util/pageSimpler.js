/**
 * Created by chenxuhua on 2017/11/15.
 */
var Mock = require('mockjs');
const URLSearchParams = require('url-search-params');

export function  addDelUpdate(url) {
    return  Mock.mock(url, 'post', function(options) {
        console.log("param-addDelUpdate="+options.body);
        return mockCreateResult(null);
    })
}
export  function  detail(url,mockField,mockTagField) {
    return  Mock.mock(url, 'post', function(options) {
        console.log("param-detail="+options.body);
        var param=JSON.parse(options.body||"{}");
        param.current=1;
        param.pageSize=10;
        var tplRule={};
        Object.keys(mockField).forEach(function (field) {
            if(mockField[field]){
                tplRule[field+"|1"]=mockField[field];
                var excludeFieldIndex=mockTagField.findIndex(function (item) {
                    return item===field;
                });
                if(excludeFieldIndex>-1){
                    mockTagField.splice(excludeFieldIndex,1);
                }
            }
            else if(field==="id"){
                tplRule[field+"|+1"]=(param.current-1)*param.pageSize+1;
                var excludeFieldIndex=mockTagField.findIndex(function (item) {
                    return item===field;
                });
                if(excludeFieldIndex>-1){
                    mockTagField.splice(excludeFieldIndex,1);
                }
            }
            else{
                tplRule[field+"|+1"]=(param.current-1)*param.pageSize+1;
            }
        })
        var tplData = Mock.mock(tplRule);
        tplData=mockHanleResultAddPrex([tplData],mockTagField);
        return mockCreateResult(tplData[0]);
    })
}
export  function  page(url,mockField,mockTagField) {
    return  Mock.mock(url, 'post', function(options) {
        console.log("param-page="+options.body);
        var param=JSON.parse(options.body||"{}");
        var tplRule={};
        Object.keys(mockField).forEach(function (field) {
            console.log("field="+field);
            if(mockField[field]){
                tplRule[field+"|1"]=mockField[field];
                var excludeFieldIndex=mockTagField.findIndex(function (item) {
                    return item===field;
                });
                if(excludeFieldIndex>-1){
                    mockTagField.splice(excludeFieldIndex,1);
                }
            }
            else if(field==="id"){
                tplRule[field+"|+1"]=(param.current-1)*param.pageSize+1;
                var excludeFieldIndex=mockTagField.findIndex(function (item) {
                    return item===field;
                });
                if(excludeFieldIndex>-1){
                    mockTagField.splice(excludeFieldIndex,1);
                }
            }
            else{
                tplRule[field+"|+1"]=(param.current-1)*param.pageSize+1;
            }
        })

        var tpl={
            ["page|"+param.pageSize]:[tplRule]
        };

        var tplData = Mock.mock(tpl);
        tplData.page=mockHanleResultAddPrex(tplData.page,mockTagField);
        var finalContent={
            "page": tplData.page,
            "current": param.current,
            "pageSize": param.pageSize,
            "total": 100
        };
        return mockCreateResult(finalContent);
    })
}

//mock处理方法start
function mockHanleResultAddPrex(list,tagName){
    if(typeof(tagName)==="string"){
        list=list.map(function (item) {
            item[tagName]=tagName+item[tagName];
            return item;
        })
    }
    else if(typeof(tagName)==="object"){
        tagName.forEach(function (tag) {
            list=list.map(function (item) {
                item[tag]=tag+item[tag];
                return item;
            })
        })
    }
    return  list
}

export function mockCreateResult(resContent){
    return   {"success": true, "errorCode": "", "errorMsg": "操作失败", "msg": "操作成功", "data": resContent }
}

export function formatUrlParams(search) {
    search=search.split("?")[1];
    var paramObj = {};
    var matchArr, innerMatchArr;
    var regexp = /^\??([^#]+)/;
    var match = regexp.exec(search);
    if(match) {
        matchArr = match[1].split('&');
        matchArr.forEach(function(item, index, arr) {
            innerMatchArr = item.split('=');
            paramObj[innerMatchArr[0]] = decodeURIComponent(innerMatchArr[1]);
        });
    }
    return paramObj;
}

//mock处理方法end




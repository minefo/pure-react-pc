//kenley add start 公共引入区
export React from 'react';
export { connect, } from 'react-redux'
export action from '../action/index'
export requestApi from './requestApi';
export PageSomeThing from "./PageSomeThing";
export reactMixin from 'react-mixin';
export function autobind(methodNames){
    return {
        componentWillMount: function(){
            var that=this;
            methodNames.forEach((pname) => {
                that[pname] = that[pname].bind(that);
            });
        }
    };
}
//kenley add end 公共引入区

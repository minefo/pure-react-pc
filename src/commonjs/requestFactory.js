/**
 * Created by chenxuhua on 2017/9/27.
 */

import axios from 'axios'
var cloneDeep = require('lodash.clonedeep');

function commonRequest() {}
commonRequest.prototype.exec = function (success, error) {
	var type = (this.type || 'post').toLowerCase();
	var url = this.url || '';
	var params = this.param || {};
	params.token = localStorage.getItem('token');
	axios[ type ]( url ,params, { headers:{'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
		.then(function ( ret ) {
			if( ret.statusText === 'OK'){
				console.log("到这类ok"+JSON.stringify(ret.data));
				if( ret.data.success){
					success && success( ret.data );
				}
				else{
                    error && error(ret.data.errorMsg ||"");
				}
			}
		}).catch(function ( ret ) {
			  console.log("这里是代码写错导致的错误="+(ret.message?ret.message:""));
              error && error(ret.data.errorMsg||"");
		});
};
var  requestFactory= {};
requestFactory.Generator = function( obj ){
    var ajaxPrototype = cloneDeep(commonRequest.prototype);
	obj.prototype = { ...ajaxPrototype,...obj.prototype};
	return obj;
}

export default requestFactory;



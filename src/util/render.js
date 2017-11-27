/**
 * Created by chenxuhua on 2017/9/6.
 */
import React from 'react'
import {Router, hashHistory,} from 'react-router'
import {AppContainer,} from 'react-hot-loader'
import {Provider,} from 'react-redux'
import {render,} from 'react-dom'
import store from './store'


//自定义加载区start
import '../css/reset.css';
import '../css/main.css';
//自定义加载区end



Router.prototype.componentWillReceiveProps = (nextProps) => {};//屏蔽错误 [react-router] You cannot change <Router routes>; it will be ignored

export default (routes) => {
    return render(
        <AppContainer  warnings={false}>
            <Provider store={store}>
                <Router history={hashHistory} routes={routes}/>
            </Provider>
        </AppContainer>,
        document.getElementById("app")
    )
}


/**
 * Created by chenxuhua on 2017/9/6.
 */

import '../reducers/index'
import { applyMiddleware, combineReducers, compose, createStore, } from 'redux'
import { hashHistory, } from 'react-router'
import reducers from '../reducers'
import { routerMiddleware, } from 'react-router-redux'
import thunk from 'redux-thunk'

const routing = routerMiddleware(hashHistory)

const store = createStore(combineReducers(reducers), compose(
    applyMiddleware(thunk, routing),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

export default store

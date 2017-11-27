/**
 * Created by chenxuhua on 2017/9/6.
 */

import * as actionType from '../constant/action-type'
import createReducer from '../util/createReducer'

const initialState = {
    //页面配置start
    commonState:{
        loading:false
    }
    //页面配置end
}

export default createReducer(initialState, {
    [actionType.commonState_loading]: (state, action) => {
        return {
            ...state,
            loading: action.loading,
        }
    },
})

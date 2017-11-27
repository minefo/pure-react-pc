/**
 * Created by chenxuhua on 2017/9/6.
 */
export default (initialState, handlers) => {
    return (state = initialState, action) => {
        return handlers[action.type] ? handlers[action.type](state, action) : state
    }
}

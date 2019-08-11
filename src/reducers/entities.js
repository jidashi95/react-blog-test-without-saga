import * as types from '../constants/actionTypes';

const entities = (state = {}, action) => {
    switch (action.type) {
        case types.UPDATE_SELF:
            let user = {...state.user, ...action.data}
            return {
                ...state,
                user ,
            }
        default:
            break;
    }
    
    if (action.path && action.method && action.status === 'COMPLETE') {
        
        switch (action.type) {
            case types.LOG_IN:
                console.log( "login success ", action )
                return {
                    ...state,
                    user: action.body.email,
                    auth: action.response.auth_token
                }
            case types.LOG_OUT:
                return {
                    ...state,
                    user: {},
                    auth: {}
                }
            case types.GET_USERS:
                return {
                    ...state,
                    usersData: action.response
                }
            case types.GET_POSTS:
                console.log("+++", action)
                return {
                    ...state,
                    postsData: action.response
                }
            default:
              return state
        }
        
    }
    
    return state
}

export default entities;
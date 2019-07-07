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
            case types.SIGN_UP:
                return {
                    ...state,
                    user: action.response.data
                }
            case types.LOG_OUT:
                return {
                    ...state,
                    user: false
                }
            case types.GET_USERS:
                return {
                    ...state,
                    users_data: action.response
                }
            default:
              return state
        }
        
    }
    
    return state
}

export default entities;
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
                    usersData: action.response
                }
            default:
              return state
        }
        
    }
    
    return state
}

export default entities;
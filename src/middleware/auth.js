import * as types from '../constants/actionTypes';

export default store => next => action => {

    // if( action.type === types.SIGN_UP && action.status === 'COMPLETE' ) {
    //   localStorage.setItem('auth', JSON.stringify(action.headers));
    //   localStorage.setItem('user', JSON.stringify(action.response.data))
    // }

    if( action.type === types.LOG_IN && action.status === 'COMPLETE' 
      && action.response ) {

      localStorage.setItem('auth', JSON.stringify(action.headers));
      localStorage.setItem('user', JSON.stringify(action.response.auth_token))
    }

    if(action.type === types.LOG_OUT) {
      localStorage.removeItem('auth');
      localStorage.removeItem('user');
    }

    if(action.type === types.UPDATE_SELF) {
      //localStorage.setItem('user', JSON.stringify(action.data))
    }
    return next(action);
}
import * as types from '../constants/actionTypes';
export const login = (body) => ({
  type: types.LOG_IN,
  method: 'POST',
  path: '/login',
  body,
});

export const signup = (body) => ({
  type: types.SIGN_UP,
  method: 'POST',
  path: '/register',
  body,
});

export const logout = (body) => ({
  type: types.LOG_OUT,
  method: 'DELETE',
  path: '/',
})

export const updateSelf = (data) => ({
  type: types.UPDATE_SELF,
  data,
})

export const getUsers = () => ({
  type: types.GET_USERS,
  method: 'GET',
  path: '/users'
})
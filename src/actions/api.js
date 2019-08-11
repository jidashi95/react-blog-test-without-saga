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

export const createPost = (body) => ({
  type: types.CREATE_POST,
  method: 'POST',
  path: '/posts',
  body
})

export const getPosts = () => ({
  type: types.GET_POSTS,
  method: 'GET',
  path: '/posts'
})

export const getPost = (id) => ({
  type: types.GET_POST,
  method: 'GET',
  path: `/posts/${id}`
})

export const getComments = (id) => ({
  type: types.GET_COMMENTS,
  method: 'GET',
  path: `/posts/${id}/comments`
})

export const leaveComment = (id, body) => ({
  type: types.CREATE_COMMENTS,
  method: 'POST',
  path: `/posts/${id}/comments`,
  body
})
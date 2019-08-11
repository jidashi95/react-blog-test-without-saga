import { API_HOST } from '../constants';
import axios from 'axios';

axios.defaults.baseURL = API_HOST
axios.defaults.headers['Content-Type'] = "application/json; charset=utf-8"
axios.defaults.headers['Accept'] = "application/json;"
export default store => next => action => {
    if ((!action.method && !action.path) || action.status) return next(action)

    let { path } = action;
    const { method, type, body, isMultipartUpload } = action;
    const state = store.getState();
    let auth = state.entities.auth;;

    if (!path || !method || !type) {
        console.log("path", path)
        console.log("method", method)
        console.log("type", type)
        console.log("error")
        throw new Error('Specify a path, method and type.')
    }    
    

    if (typeof path === 'function') {
        path = path(state);
    }

    // replace endpoint generics such as 'user/me'
    path = endpointGenerics(state, path);

    // fire off request action to reducer
    next({...action, status: 'REQUESTED' });

    // make the request
    return makeRequest(method, path, body, {'Authorization' : auth}, isMultipartUpload)
        .then(({headers, response}) => {
            store.dispatch({...action, headers, response, status: 'COMPLETE' });
            return Promise.resolve(response);
        })
        .catch(error => {
            store.dispatch({...action, error, status: 'ERRORED' });
            return Promise.reject(error);
        });
}

export const makeRequest = (method, url, data, headers, isMultipartUpload) => {
    let params = {}
    if(method === 'GET') {
        params = data
        data = {}
    }
    console.log(params, data, headers, url);
    
    return axios({method, url, data, params, headers}).then(response => {
        const {headers, data} = response;
        console.log("func")
        return Promise.resolve({headers, response:data});
    }).catch(error => {
        console.log(error)
        switch(error.response.status) {
            case 401:
                localStorage.removeItem('auth');
                localStorage.removeItem('user');
                break;
            default:
                break;
        }
        
        return Promise.reject(error.response.data)
    })
}

const endpointGenerics = (state, path) => {
    let newPath = path;
    if (state.entities.user && state.entities.user.id) {
        newPath = newPath.replace(/users\/me/, `users/${state.entities.user.id}`);
    }
    return newPath;
}
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import auth from '../middleware/auth'
import {createBrowserHistory} from 'history'
import rootReducer from '../reducers'

export const history = createBrowserHistory()

const configureStore = preloadedState => {
    const store = createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(
            applyMiddleware(thunk, api, auth, routerMiddleware(history))
        )
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}

export default configureStore
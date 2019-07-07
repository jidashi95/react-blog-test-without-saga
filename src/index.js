import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import persistence from './store/persistence' 
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
import '../node_modules/react-datetime/css/react-datetime.css'

const store = configureStore(persistence)
ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();

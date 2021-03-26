import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension'
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
// import store from './store/reducer';
import reducers from './store/Test-Reducers';
import config from './config';
// const middleware = [thunk]
// const stores = createStore(
//     store,
//     composeWithDevTools(applyMiddleware(...middleware))
//     );

const app = (
    <Provider store={reducers}>
        <BrowserRouter basename={config.basename}>
            {/* basename="/datta-able" */}
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

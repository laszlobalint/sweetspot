import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import ReduxToastr from 'react-redux-toastr';
import { reducer as toastrReducer } from 'react-redux-toastr';

import './index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import App from './App';
import { authReducer, ordersReducer } from './store/reducers';
import { watchAuth, watchOrders } from './store/sagas';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({ authReducer, ordersReducer, toastrReducer });

const saga = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, saga)));

saga.run(watchAuth);
saga.run(watchOrders);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
        <ReduxToastr getState={(state) => state.toastrReducer} />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

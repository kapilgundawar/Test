import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,HashRouter} from 'react-router-dom';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware, compose,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import reducerTrade from './store/Reducers/trade';

axios.defaults.baseURL = "http://localhost:3306";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const appReducer = combineReducers(
    {
        trade : reducerTrade
    }

)
const rootReducer = ( state, action ) => {
    return appReducer(state, action)
  }  

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));


const app = (
    <Provider store = {store}>
        <BrowserRouter>
            <HashRouter>
                    <App />
            </HashRouter>
        </BrowserRouter>
    </Provider>    
)


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

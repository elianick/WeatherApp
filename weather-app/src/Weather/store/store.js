import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import weatherReducer from './WeatherReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const loggerMiddlware = createLogger({collapsed: true});

export default createStore(weatherReducer,composeEnhancers(applyMiddleware(thunkMiddleware,loggerMiddlware)));
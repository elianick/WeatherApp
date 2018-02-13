import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Weather/components/App';
import store from './Weather/store/store';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import Navigation from "./Weather/components/Navbar";
import StyledComponent from './styled/components/StyledComponent';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "bootstrap/dist/fonts/glyphicons-halflings-regular.ttf";
import "bootstrap/dist/fonts/glyphicons-halflings-regular.eot";
import "bootstrap/dist/fonts/glyphicons-halflings-regular.svg";
import "bootstrap/dist/fonts/glyphicons-halflings-regular.woff";

ReactDOM.render(
    <Provider store={store}>
    <Router>
        <div>
            <Navigation/>
            <Route exact path="/" component={App}/>
            <Route exact path="/styled" component={StyledComponent}/>
        </div>
    </Router>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();

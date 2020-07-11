import React from 'react';
import {HashRouter,Route} from "react-router-dom";
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'y-ui0/lib/style.css';
import 'y-markdown/lib/index.css';
import './index.scss';
import './common.scss';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
        <Route component={App}/>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

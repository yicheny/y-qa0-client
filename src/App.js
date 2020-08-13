import React from 'react';
import {Switch,Route} from 'react-router-dom'
import {Menu} from 'y-ui0';
import CSAPP from "./view/CSAPP/CSAPP";
import './App.scss';

const Menu_option = {
    details:[
        {
            text:'深入理解计算机系统',
            expanded: true,
            to:'CSAPP',
        },
    ]
};

function App() {
  return (
    <div className="app">
        <Menu option={Menu_option}/>
        <div className="app-content">
            <Switch>
                <Route path='/CSAPP' component={CSAPP}/>
            </Switch>
        </div>
    </div>
  );
}

export default App;

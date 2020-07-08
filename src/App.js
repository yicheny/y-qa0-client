import React from 'react';
import {Switch,Route} from 'react-router-dom'
import {Menu} from 'y-ui0';
import Ch1 from "./view/csapp/ch1";
import './App.scss';

const Menu_option = {
    details:[
        {
            text:'深入理解计算机系统',
            expanded: true,
            children:[
                {text:'1.计算机系统漫游',to:'csapp/ch1'},
            ]
        },
    ]
};

function App() {
  return (
    <div className="app">
        <Menu option={Menu_option}/>
        <div className="app-content">
            <Switch>
                <Route path='/csapp/ch1' component={Ch1}/>
            </Switch>
        </div>
    </div>
  );
}

export default App;

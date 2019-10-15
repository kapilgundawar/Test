import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import Trades from './containers/Trade/TradeList'

class App extends Component {
  render() {
    return (
      <div className="App">
            <Switch>
                <Route path = '/' exact component = {Trades}/>
            </Switch>
      </div>
    );
  }
}

export default App;

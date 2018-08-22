import React, { Component } from 'react';
import './App.css';
import Nav from './component/Nav';
import Show from './component/Show';
import Tab from './component/Tab';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="main">
          <Tab />
          <Show />
        </div>
      </div>
    );
  }
}

export default App;

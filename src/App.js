import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import logo from './logo.svg';
import './App.css';
import Details from './components/Details/Details'

// include new components here!


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/details/:id" component={Details} />
        </Switch>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';


import Home from '../Home/Home.jsx'
import Movies from '../Movies/Movies.jsx'
import Gallery from '../Movies/Gallery.jsx'
import Details from '../Details/Details.jsx'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={process.env.PUBLIC_URL + "/"} component={Home}/>
          <Route exact path={process.env.PUBLIC_URL + "/Movies/Search/:keyword"} component={Movies}/>
          <Route exact path={process.env.PUBLIC_URL + "/Movies/Gallery"} component={Gallery}/>
          <Route exact path={process.env.PUBLIC_URL + "/Details/:id"} component={Details}/>
        </Switch>
      </Router>
    );
  }
}

export default App;

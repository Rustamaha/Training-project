import React, { Component } from 'react';
import Navigation from './Navigation';
import Filters from './Filters';
import About from './About';
import Home from './Home';
import Footer from './Footer';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/catalog" component={Filters} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}



        
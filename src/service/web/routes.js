import React                          from 'react';

import Home                           from './components/pages/Home';
import NotFound                       from './components/pages/NotFound';

import {
  Router, Route,
  IndexRedirect, browserHistory }     from 'react-router';

export default (
  <Router history={browserHistory}>
    <Route path='/'>
      <IndexRedirect to='home' />
      <Route path='home' component={Home} />
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
);

import React                          from 'react';

import App                            from './containers/App';

import Home                           from './containers/Home';
import NotFound                       from './containers/NotFound';

import {
  Router, Route,
  IndexRedirect, browserHistory }     from 'react-router';

export default (
  <Router history={browserHistory} component={App}>
    <Route path='/'>
      <IndexRedirect to='home' />
      <Route path='home' component={Home} />
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
);

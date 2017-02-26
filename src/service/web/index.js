import React                        from 'react';
import ReactDOM                     from 'react-dom';

import { Provider }                 from 'react-redux'
import { Router, browserHistory }   from 'react-router';
import Routes                       from './routes';

import configureStore               from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={Routes} />
  </Provider>,
  document.getElementById('app')
);

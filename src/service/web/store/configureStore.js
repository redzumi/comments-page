import { createStore,
  applyMiddleware }           from 'redux';

import { connectSocket,
  socketIOMiddleware }        from '../middlewares/Socket';

import rootReducer            from '../reducers';

const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(socketIOMiddleware)
  );

  if(module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer)
    })
  }

  connectSocket(store, process.env.OPTIONS.socket);
  return store;
};

export default configureStore;

import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from '../middlewares/PromiseMiddleware';
import createLogger from 'redux-logger';
import combinedReducers from '../reducers';
import DevTools from '../components/DevTools';

window.$REDUX_DEVTOOL = false;

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

const enhancer = compose(
  applyMiddleware( promiseMiddleware, logger ),
  DevTools.instrument() // comment this out if you don't need redux-devtools
)

export default function configureStore( initialState = undefined  ) {
  const store = createStore( combinedReducers, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

import { createStore, applyMiddleware, compose } from 'redux';
/*import { createLogger } from 'redux-logger';*/
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';
import { hasHistory  } from 'react-router';
import rootReducer from './reducers/rootReducer.js';

/*const logger = createLogger();*/
const router = routerMiddleware(hasHistory);

const enhancer = compose(
  applyMiddleware(thunkMiddleware, promise, router),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);


export default function configStore(initialState) {
   const storeCreator = createStore(rootReducer, initialState,enhancer);

   return storeCreator;
}

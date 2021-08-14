import { createStore as createReduxStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { catalog } from './catalog';
import { cart } from './cart';

const app = combineReducers({
  catalog,
  cart,
})

const createStore = () => {
  const store = createReduxStore(
    app,
    composeWithDevTools(), 
  )

  return store;
}

export default createStore();
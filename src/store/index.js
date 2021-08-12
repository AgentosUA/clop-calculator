import { createStore as createReduxStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { catalog } from './catalog';

const app = combineReducers({
  catalog,
})

const createStore = () => {
  const store = createReduxStore(
    app,
    composeWithDevTools(), 
  )

  return store;
}

export default createStore();
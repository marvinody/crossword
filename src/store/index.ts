import redux, { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers, { State } from './reducers';
const store: redux.Store<State> = createStore(
  reducers,
  {} as State,
  composeWithDevTools(applyMiddleware()),
)

export default store;

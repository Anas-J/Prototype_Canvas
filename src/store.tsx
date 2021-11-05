import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import rootReducer from './redux/reducers/rootReducer';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;

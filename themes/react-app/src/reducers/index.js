import token from './tokenReducer';
import { combineReducers } from 'redux';

// export default createStore(reducer);

export default combineReducers({
  token,
})
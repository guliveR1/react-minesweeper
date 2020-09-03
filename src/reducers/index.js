import {combineReducers} from 'redux';
import boardReducer from './board';

// Combine different reducers here
const rootReducer = combineReducers({boardReducer});

export default rootReducer;
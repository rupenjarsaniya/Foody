import getUserReducer from './getUser';
import getFoodCart from './getFavFood';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    getUserReducer, getFoodCart
});

export default rootReducer;
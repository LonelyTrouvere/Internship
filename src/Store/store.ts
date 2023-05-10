import {createStore, combineReducers, applyMiddleware} from 'redux'
import {statusReducer} from './statusReducer'
import { userReducer, tokenReducer } from './userReducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    user: userReducer,
    token: tokenReducer,
    status: statusReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
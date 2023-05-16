import {createStore, combineReducers, applyMiddleware} from 'redux'
import {statusReducer} from './statusReducer'
import { userReducer, tokenReducer, listReducer } from './userReducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    user: userReducer,
    token: tokenReducer,
    list: listReducer,
    status: statusReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
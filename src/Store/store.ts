import {createStore, combineReducers, applyMiddleware} from 'redux'
import {statusReducer} from './statusReducer'
import { userReducer, tokenReducer, listReducer } from './userReducer';
import { usersCompanyReducer, visitedCompanyReducer } from './companyReducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    user: userReducer,
    token: tokenReducer,
    list: listReducer,
    userCompanies: usersCompanyReducer,
    companyList: visitedCompanyReducer,
    status: statusReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
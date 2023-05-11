import {Status, UserList} from'./stateType'
import {User, AccessToken} from './stateType'

export const STATUS_CHECK = "STATUS_CHECK";
export const LOGOUT = "LOGOUT"
export const SET_TOKEN = "SET_TOKEN";
export const DELETE_TOKEN = "DELETE_TOKEN";
export const AUTHORIZE = "AUTHORIZE";
export const SET_LIST = "SET_LIST";

type AuthorizeAction = {
    type: typeof AUTHORIZE,
    payload: User,
}

type LogOutAction = {
    type: typeof LOGOUT,
    payload? :User,
}

type SetTokenAction = {
    type: typeof SET_TOKEN,
    payload: AccessToken,
}

type DeleteTokenAction = {
    type: typeof DELETE_TOKEN,
    payload: null,
}

type UserAction = AuthorizeAction | LogOutAction | SetTokenAction | DeleteTokenAction;

type UserListAction = {
    type: typeof SET_LIST;
    payload: UserList;
}

type StatusCheckAction = {
    type: typeof STATUS_CHECK,
    payload: Status,
}

type Action = StatusCheckAction | UserAction | UserListAction;

export default Action;
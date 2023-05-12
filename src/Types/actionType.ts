import {Status, OtherUsers} from'./stateType'
import {User, AccessToken} from './stateType'

export const STATUS_CHECK = "STATUS_CHECK";
export const LOGOUT = "LOGOUT"
export const SET_TOKEN = "SET_TOKEN";
export const DELETE_TOKEN = "DELETE_TOKEN";
export const AUTHORIZE = "AUTHORIZE";
export const SET_LIST = "SET_LIST";
export const SET_VISITED_USER = "SET_VISITED_USER";

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
    payload: OtherUsers;
}

type VisitedUserAction = {
    type: typeof SET_VISITED_USER;
    payload: User;
}

type OtherUsersAction = UserListAction | VisitedUserAction;

type StatusCheckAction = {
    type: typeof STATUS_CHECK,
    payload: Status,
}

type Action = StatusCheckAction | UserAction | OtherUsersAction;

export default Action;
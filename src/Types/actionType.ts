import {Status} from'./stateType'
import {User} from './stateType'

export const STATUS_CHECK = "STATUS_CHECK";
export const LOGOUT = "LOGOUT"
export const AUTHORIZE = "AUTHORIZE";

type AuthorizeAction = {
    type: typeof AUTHORIZE,
    payload: User,
}

type LogOutAction = {
    type: typeof LOGOUT,
    payload?:User,
}

type UserAction = AuthorizeAction | LogOutAction; //Posibilities for expanding

type StatusCheckAction = {
    type: typeof STATUS_CHECK,
    payload: Status,
}

type Action = StatusCheckAction | UserAction;

export default Action;
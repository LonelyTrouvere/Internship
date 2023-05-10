import { Dispatch } from "redux";
import { apiStatus, authUser, authMe } from "../Api/apiDialog";
import FormUser from '../Types/FormData'
import Action, {STATUS_CHECK, AUTHORIZE, SET_TOKEN} from '../Types/actionType'

export const fetchStatus = () =>{
  return async (dispatch: Dispatch<Action>) => {
        const res = await apiStatus();
        dispatch({type: STATUS_CHECK, payload: {status_code: res.status_code, detail: res.detail, result: res.result}});
    }
}

export const authorize = (user:FormUser) => {
  return async (dispatch: Dispatch<Action>) => {
    const res = await authUser(user).then(response => response.result.access_token);
    localStorage.setItem('access_token', res);
    const authme = await authMe();
    dispatch({type: AUTHORIZE, payload:authme});
    dispatch({type: SET_TOKEN, payload: res});
  }
}

export const authorizeWithAuth0 = () => {
  return async (dispatch: Dispatch<Action>) => {
    const token = localStorage.getItem('access_token');
    const res = await authMe();
    dispatch({type: AUTHORIZE, payload: res.result});
    dispatch({type: SET_TOKEN, payload: {access_token:token}});
  }
}

export const continueSesion = () => {
  return async (dispatch: Dispatch<Action>) =>{
    const token = localStorage.getItem('access_token');
    const res = await authMe();
    dispatch({type: AUTHORIZE, payload: res.result});
    dispatch({type: SET_TOKEN, payload: {access_token:token}})
  }
}
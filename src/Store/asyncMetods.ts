import { Dispatch } from "redux";
import { apiStatus, authUser, authMe } from "../Api/apiDialog";
import FormUser from '../Types/FormData'
import Action, {STATUS_CHECK, AUTHORIZE} from '../Types/actionType'

export const fetchStatus = () =>{
  return async (dispatch: Dispatch<Action>) => {
        const res = await apiStatus();
        dispatch({type: STATUS_CHECK, payload: {status_code: res.status_code, detail: res.detail, result: res.result}});
    }
}

export const authorize = (user:FormUser) => {
  return async (dispatch: Dispatch<Action>) => {
    const res = await authUser(user).then(response => response.result.access_token);
    const authme = await authMe(res);
    localStorage.setItem('access_token', res);
    dispatch({type: AUTHORIZE, payload:authme.result});
  }
}

export const authorizeWithAuth0 = (token: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const res = await authMe(token);
    localStorage.setItem('access_token', token);
    dispatch({type: AUTHORIZE, payload: res.result});
  }
}

export const continueSesion = (token:string) => {
  return async (dispatch: Dispatch<Action>) =>{
    const res = await authMe(token);
    dispatch({type: AUTHORIZE, payload: res.result});
  }
}
import { Dispatch } from "redux";
import { apiStatus } from "../Api/apiDialog";
import MyAction, {STATUS_CHECK} from './actionType'

export const fetchStatus = () =>{
  return async (dispatch: Dispatch<MyAction>) => {
        const res = await apiStatus()
        console.log(res);
        dispatch({type: STATUS_CHECK, payload: {status_code: res.status_code, detail: res.detail, result: res.result}});
    }
}
import { Dispatch } from "redux";
import { apiStatus } from "../Api/statusCheck";
import axios from "axios";
import MyAction, {STATUS_CHECK} from './actionType'

export const fetchStatus = () =>{
  return async (dispatch: Dispatch<MyAction>) => {
        const res = await axios.get('http://3.75.186.163/');

        dispatch({type: STATUS_CHECK, payload: res.data});
    }
}
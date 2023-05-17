import { Dispatch } from "redux";
import { apiStatus,
   authUser,
   authMe,
   getAllUsers,
   getUserByID,
  updateUser, 
  deleteUser, 
  updateAvatar, 
  getAllCompanies,
  getUserCompanies,
  createCompany} from "../Api/apiDialog";
import FormUser from '../Types/FormData'
import Action, {
  STATUS_CHECK,
   AUTHORIZE,
    SET_TOKEN,
     SET_LIST,
      SET_VISITED_USER,
       DELETE_TOKEN, 
       LOGOUT, 
       SET_COMPANY_LIST, 
       SET_USER_COMPANIES} from '../Types/actionType'
import { RootState } from "./store";
import { UpdateUserType } from "../Types/UpdateType";
import { AppDispatch } from "./typedDispatch";
import { ThunkDispatch } from "redux-thunk";
import { useSelector } from "react-redux";

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

export const allUsers = (page:number, entrie:number) => {
  return async (dispatch: Dispatch<Action>) => {
    const res = await getAllUsers(page, entrie);
    dispatch({type: SET_LIST, payload: {users: res.users, total_page: res.pagination.total_page, user_visit:null}});
  }
}

export const allCompanies = (page:number, entrie:number) => {
  return async (dispatch:Dispatch<Action>) => {
    const res = await getAllCompanies(page, entrie);
    dispatch({type: SET_COMPANY_LIST, payload: {companies: res.companies, total_page: res.pagination.total_page, company_visit: null}});
  }
}

export const visitedUser = (id:number) => {
  return async (dispatch:Dispatch<Action>)=>{
    const res = await getUserByID(id);
    dispatch({type: SET_VISITED_USER, payload: res});
  }
}

export const updateUserThunk = (update:UpdateUserType, id:number) => {
  return async (dispatch: ThunkDispatch<AppDispatch, null, Action>) => {
    const res = await updateUser(update, id);
    dispatch(continueSesion());
  }
}

export const deleteUsesrThunk = (id:number) => {
  return async (dispatch: Dispatch<Action>) => {
    const res = await deleteUser(id);
    localStorage.removeItem('access_token');
        dispatch({type:LOGOUT});
        dispatch({type:DELETE_TOKEN});
  }
}

export const updateAvatarThunk = (file:FormData, id:number) => {
    return async (dispatch: ThunkDispatch<AppDispatch, null, Action>) => {
      const res = await updateAvatar(file, id);
      dispatch(continueSesion());
    }
}

export const getUserCompaniesThunk = (id:number) => {
    return async (dispatch: Dispatch<Action>) => {
      const res = await getUserCompanies(id);
      dispatch({type: SET_USER_COMPANIES, payload: res});
    }
}

export const createCompanyThunk = (company:{company_name: string, is_visible: boolean}, id:number) => {
  return async (dispatch: ThunkDispatch<AppDispatch, null, Action>) => {
    const res = await createCompany(company);
    dispatch(getUserCompaniesThunk(id));
  }
}

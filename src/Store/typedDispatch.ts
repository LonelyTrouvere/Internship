import { useDispatch as useAppDispatch } from "react-redux";
import store from './store'
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

const {dispatch} = store;
export type AppDispatch = typeof dispatch;

export const useDispatch = () => 
    useAppDispatch<ThunkDispatch<AppDispatch, null, Action>>();
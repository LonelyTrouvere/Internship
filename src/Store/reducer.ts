import MyAction, {STATUS_CHECK} from "./actionType";

export type DefaultState = {
    status_code:number,
    detail: string,
    result:string,
}

const defaultState:DefaultState = {
    status_code: 0,
    detail: "",
    result: "",
}

export const reducer = (state: DefaultState = defaultState, action:MyAction) => {
    switch (action.type){
        case STATUS_CHECK:
            return {...state, staus_code: action.payload.status_code, detail: action.payload.detail, result: action.payload.result};
        default:
            return {...state};
    }
}
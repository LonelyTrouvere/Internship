import {User} from '../Types/stateType'
import Action, {AUTHORIZE, LOGOUT} from '../Types/actionType'

const defaultState:User = {
    user_id:0,
    user_email:"",
    access_token:null,
}

export const userReducer = (state:User = defaultState, action:Action) => {
    switch (action.type){
        case AUTHORIZE:
            return {...action.payload, access_token:action.payload.access_token};
        case LOGOUT:
            return defaultState;
        default:
            return state;
    }
}
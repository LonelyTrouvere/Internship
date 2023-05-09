import {User} from '../Types/stateType'
import Action, {AUTHORIZE} from '../Types/actionType'

const defaultState:User = {
    user_id:0,
    user_email:"",
}

export const userReducer = (state:User = defaultState, action:Action) => {
    switch (action.type){
        case AUTHORIZE:
            return action.payload;
        default:
            return state;
    }
}
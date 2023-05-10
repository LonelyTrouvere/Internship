import {User, AccessToken} from '../Types/stateType'
import Action, {AUTHORIZE, DELETE_TOKEN, LOGOUT, SET_TOKEN} from '../Types/actionType'

const defaultUser:{user: User|null} = {
    user: null,
}

const defaultToken:AccessToken = {
    access_token: null,
}

export const userReducer = (state:{user: User|null} = defaultUser, action:Action) => {
    switch (action.type){
        case AUTHORIZE:
            return {...action.payload};
        case LOGOUT:
            return defaultUser;
        default:
            return state;
    }
}

export const tokenReducer = (state:AccessToken = defaultToken, action:Action) =>{
    switch (action.type){
        case SET_TOKEN:
            return action.payload;
        case DELETE_TOKEN:
            return defaultToken;
        default:
            return state;
    }
}
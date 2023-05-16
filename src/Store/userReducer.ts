import {User, AccessToken, OtherUsers} from '../Types/stateType'
import Action, {AUTHORIZE, DELETE_TOKEN, LOGOUT, SET_LIST, SET_TOKEN, SET_VISITED_USER} from '../Types/actionType'

const defaultUser:{user: User|null} = {
    user: null,
}

const userList:OtherUsers = {
    users:[],
    user_visit: null,
    total_page: 0,
};

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

export const listReducer = (state:OtherUsers = userList, action:Action) => {
    switch (action.type){
        case SET_LIST:
            return {...state, users: action.payload.users, total_page: action.payload.total_page};
        case SET_VISITED_USER:
                return {...state, user_visit: action.payload}; 
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
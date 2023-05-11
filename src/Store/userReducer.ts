import {User, AccessToken, UserList} from '../Types/stateType'
import Action, {AUTHORIZE, DELETE_TOKEN, LOGOUT, SET_LIST, SET_TOKEN} from '../Types/actionType'

const defaultUser:{user: User|null} = {
    user: null,
}

const userList:UserList = {
    users:[],
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

export const listReducer = (state:UserList = userList, action:Action) => {
    switch (action.type){
        case SET_LIST:
            return {users: action.payload.users, total_page: action.payload.total_page};
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
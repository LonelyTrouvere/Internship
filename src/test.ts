import {createStore} from 'redux'

export interface DefaultState{
    value:number,
}

const defaultState:DefaultState = {
    value: 0,
};

const reducer = (state:DefaultState = defaultState, action:{type: string, payload?:number}) =>{
    switch (action.type){
        case "INCREMENT":
            return {...state, value: state.value+1};
        case "DECREMENT":
            return {...state, value: state.value-1}; 
        default:
            return state;
    }
}

export const store = createStore(reducer);

import {createStore} from 'redux'

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

export interface DefaultState{
    value:number,
}

const defaultState:DefaultState = {
    value: 0,
};

type Action = {
    type: string,
    payload: any,
}

const reducer = (state:DefaultState = defaultState, action:Action) =>{
    switch (action.type){
        case INCREMENT:
            return {...state, value: state.value+1};
        case DECREMENT:
            return {...state, value: state.value-1}; 
        default:
            return state;
    }
}

export const crateIncrementAction:()=>Action = () => {return {type: INCREMENT, payload: null}}
export const crateDecrementAction:()=>Action = () => {return {type: DECREMENT, payload: null}}

export const store = createStore(reducer);

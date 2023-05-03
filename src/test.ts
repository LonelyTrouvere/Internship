import {createStore} from 'redux'

export interface DefaultState{
    value:number,
}

const defaultState:DefaultState = {
    value: 0,
};

type ActionIncrement = {
    type: "INCREMENT",
    payload: number,
}

type ActionDecrement = {
    type: "DECREMENT",
    payload: number,
}

type Action = ActionIncrement | ActionDecrement;

const reducer = (state:DefaultState = defaultState, action:Action) =>{
    switch (action.type){
        case "INCREMENT":
            return {...state, value: state.value+1};
        case "DECREMENT":
            return {...state, value: state.value-1}; 
        default:
            return state;
    }
}

export const crateIncrementAction:()=>Action = () => {return {type: "INCREMENT", payload: 1}}
export const crateDecrementAction:()=>Action = () => {return {type: "DECREMENT", payload: 1}}

export const store = createStore(reducer);

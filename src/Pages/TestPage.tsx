import { useSelector, useDispatch } from "react-redux/es/exports";
import {DefaultState} from '../test'

const TestPage = () =>{
    const value:number = useSelector<DefaultState, number>(state => state.value);
    const dispatch = useDispatch();

    const Add = () => dispatch({type:"INCREMENT"})
    const Sub = () => dispatch({type:"DECREMENT"})

    return (
        <div className="container">
       <h1>{value}</h1>
       <button onClick={Add}>Increment</button>
       <button onClick={Sub}>Decrement</button>
       </div>
    );
};

export default TestPage;
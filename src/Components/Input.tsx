import Data from '../Types/FormData'

const Input = (props:
    {
        lab: string,
        type: string,
        inputName: string,
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    }
) =>{
    return (
        <div className="inp">
            <label htmlFor={props.inputName}>{props.lab}</label>
            <input type={props.type} name={props.inputName} onChange={props.handleChange}/>
        </div>
    );
}

export default Input;
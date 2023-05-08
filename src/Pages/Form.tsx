import "../Styles/Form.css"
import Input from '../Components/Input'
import ErrorBox from '../Components/ErrorBox'
import Data from '../Types/FormData'
import { createUser } from "../Api/apiDialog"
import {useState} from 'react'

const Form = ( props:
    {type: string}
) => {

    const EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [data, setData] = useState<Data>({
        email: "",
        pass: "", 
    });
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setErrorMessage("");
        setData({ 
            ...data, 
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if (!data.email || !data.pass){
            setErrorMessage("Some fields are empty")
        }
        else
        if (props.type === "signup" && (!data.firstName || !data.lastName || !data.repPass || !data.city || !data.phone)){
            setErrorMessage("Some fields are empty")
        }
        else
        if (!EMAIL_REGEXP.test(data.email))
        {
            setErrorMessage("Invalid E-mail");
        }
        else
        if (props.type === "signup" && data.pass !== data.repPass){
            setErrorMessage("Passwords don't match");
        }
        else
        {
            const res = await createUser(data);
        }
    }

    return (
        <>
        {errorMessage && <ErrorBox message={errorMessage}/>}
        <form className="input-form" onSubmit={handleSubmit}>
            <h3>Welcome</h3>
            {
                props.type === "signup" &&
            <>
            <Input inputName="firstName" type="input" lab="First Name" handleChange={handleChange}/>
            <Input inputName="lastName" type="input" lab="Second Name" handleChange={handleChange}/>
            <Input inputName="city" type="input" lab="City" handleChange={handleChange}/>
            <Input inputName="phone" type="input" lab="Phone Number" handleChange={handleChange}/>
            </>
            }
            <Input inputName="email" type="input" lab="E-mail" handleChange={handleChange}/>
            <Input inputName="pass" type="password" lab="Password" handleChange={handleChange}/>
            {
            props.type === "signup" &&
            <Input inputName="repPass" type="password" lab="Repeat password" handleChange={handleChange}/>
            }
            <div className="inp">
            <button>Submit</button>
            </div>
        </form>
        </>
    );
}

export default Form;
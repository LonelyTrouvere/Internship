import "../Styles/Form.css"
import Input from '../Components/Input'
import ErrorBox from '../Components/ErrorBox'
import Data from '../Types/FormData'
import { createUser } from "../Api/apiDialog"
import {useState} from 'react'
import { isAxiosError } from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "../Store/typedDispatch"
import { authorize, authorizeWithAuth0 } from "../Store/asyncMetods"
import { useAuth0 } from "@auth0/auth0-react"

const Form = ( props:
    {type: string}
) => {

    const EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [data, setData] = useState<Data>({
        email: "",
        pass: "", 
    });
    const [errorMessage, setErrorMessage] = useState<string>("");

    const redirect = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setErrorMessage("");
        setData({ 
            ...data, 
            [e.target.name]: e.target.value,
        });
    };

    const validation = (e:React.FormEvent<HTMLFormElement>) => {
        if (!data.email || !data.pass){
            setErrorMessage("Some fields are empty")
            return false;
        }
        if (props.type === "signup" && (!data.firstName || !data.lastName || !data.repPass)){
            setErrorMessage("Some fields are empty")
            return false;
        }
        if (!EMAIL_REGEXP.test(data.email))
        {
            setErrorMessage("Invalid E-mail");
            return false;
        }
        if (props.type === "signup" && data.pass !== data.repPass){
            setErrorMessage("Passwords don't match");
            return false;
        }
        return true;
    }

    const handleSignin = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if (validation(e))
        {
            try{
            const res = await createUser(data);
            redirect("/loginredirect");
            }
            catch (e:unknown){
                if (isAxiosError(e))
                    {
                        setErrorMessage(e.response?.data.detail);
                    }
            }
        }
    }

    const handleLogin = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if (validation(e))
        {
            try{
            await dispatch(authorize(data));
            }
            catch (e:unknown)
            {
                if (isAxiosError(e))
                {
                    setErrorMessage(e.response?.data.detail);
                }
            }
        }
    }

    const handleAuth0 = async (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try{
            const res = await getAccessTokenSilently();
            localStorage.setItem('access_token', res);
            dispatch(authorizeWithAuth0());
        }
        catch(e:unknown){
        setErrorMessage("Authentication failed");
        }
    }

    const signupMessage = <div className="underForm">
        <p>Already have an account?</p>
        <p>Log in <Link to="/login">here</Link>!</p>
    </div>

    const loginMessage = <div className="underForm">
    <p>Don't have an account?</p>
    <p>Sign up <Link to="/signup">here</Link>!</p>
    </div>

    return (
        <>
        {errorMessage && <ErrorBox message={errorMessage}/>}
        <form className="input-form" onSubmit={props.type === "signup"? handleSignin: handleLogin}>
            <h3>Welcome</h3>
            {
                props.type === "signup" &&
            <>
            <Input inputName="firstName" type="input" lab="First Name" handleChange={handleChange}/>
            <Input inputName="lastName" type="input" lab="Second Name" handleChange={handleChange}/>
            </>
            }
            <Input inputName="email" type="input" lab="E-mail" handleChange={handleChange}/>
            <Input inputName="pass" type="password" lab="Password" handleChange={handleChange}/>
            {
            props.type === "signup" &&
            <Input inputName="repPass" type="password" lab="Repeat password" handleChange={handleChange}/>
            }
            <input type='submit' value={props.type === "signup"? "Sign up": "Log in"}></input>
            <button type="button" onClick={handleAuth0}>Auth0</button>
            {props.type==="signup"? signupMessage:loginMessage}
        </form>
        </>
    );
}

export default Form;
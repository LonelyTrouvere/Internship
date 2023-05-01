import "../Styles/Form.css"
import Input from '../Components/Input'
import Data from '../Types/FormData'
import {useState, useEffect} from 'react'

const Form = ( props:
    {type: string}
) => {

    const [data, setData] = useState<Data>({
        mail: "",
        pass: "", 
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data, 
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form className="input-form">
            <h3>Welcome</h3>
            {
                props.type === "signup" &&
            <>
            <Input inputName="fname" type="input" lab="First Name" handleChange={handleChange}/>
            <Input inputName="sname" type="input" lab="Second Name" handleChange={handleChange}/>
            <Input inputName="city" type="input" lab="City" handleChange={handleChange}/>
            <Input inputName="phone" type="input" lab="Phone Number" handleChange={handleChange}/>
            </>
            }
            <Input inputName="mail" type="input" lab="E-mail" handleChange={handleChange}/>
            <Input inputName="pass" type="password" lab="Password" handleChange={handleChange}/>
            <div className="inp">
            <button disabled>Submit</button>
            </div>
        </form>
    );
}

export default Form;
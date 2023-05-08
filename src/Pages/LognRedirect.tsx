import { Link } from "react-router-dom";

const LoginRedirect = () =>{
    return (
        <div className="message">
            <h3>Account creation is succsesful!</h3>
            <h3>To proceed, please <Link to="/login">Log in</Link> into your new account</h3>
        </div>
    );
}

export default LoginRedirect;
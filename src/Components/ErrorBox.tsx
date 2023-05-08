import '../Styles/ErrorBox.css'

const ErrorBox = (props:{
    message: string
}) =>{
    return (
        <div className="errorBox">
            <p>Error: {props.message}</p>
        </div>
    );
}

export default ErrorBox;
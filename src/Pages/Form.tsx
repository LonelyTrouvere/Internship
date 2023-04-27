import "../Styles/Form.css"

const Form = ( props:
    {type: string}
) => {
    return (
        <form className="input-form">
            <h3>Welcome</h3>
            {
                props.type === "signup" &&
            <>
            <div className="inp">
            <label htmlFor="fname">First Name</label>
            <input type="input" name="fname"/>
            </div>
            <div className="inp">
            <label htmlFor="sname">Second Name</label>
            <input type="input" name="sname"/>
            </div>
            <div className="inp">
            <label htmlFor="city">City</label>
            <input type="input" name="city"/>
            </div>
            <div className="inp">
            <label htmlFor="phone">Phone Number</label>
            <input type="input" name="phone"/>
            </div>
            </>
            }

            <div className="inp">
            <label htmlFor="email">E-mail</label>
            <input type="input" name="email"/>
            </div>
            <div className="inp">
            <label htmlFor="password">Password</label>
            <input type="password" name="password"/>
            </div>
            <div className="inp">
            <button disabled>Submit</button>
            </div>
        </form>
    );
}

export default Form;
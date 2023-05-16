import { useState } from "react";
import ErrorBox from "./ErrorBox";
import { RootState } from "../Store/store";
import { User } from "../Types/stateType";
import Input from "./Input";
import { useSelector } from "react-redux";
import { updatePassword as updPas} from "../Api/apiDialog";
import { deleteUsesrThunk, updateUserThunk, updateAvatarThunk } from "../Store/asyncMetods";
import { UpdatePasswordType, UpdateUserType } from "../Types/UpdateType";
import { useDispatch } from "../Store/typedDispatch";
import { isAxiosError } from "axios";
import { ModalWindow } from "./ModalWindow";

const UserSettings = () => {

    const user = useSelector((state:RootState)=>state.user) as User;
    const dispatch = useDispatch();

    const example:UpdateUserType = {
        user_firstname: user.user_firstname,
        user_lastname: user.user_lastname,
        user_city: user.user_city,
        user_phone: user.user_phone,
        user_status: user.user_status,
        user_links: user.user_links,
    } 

    const [updAvatar, setAvatar] = useState<FormData|null>(null);
    
    const [updatedUser, setUpdate] = useState<UpdateUserType>(example);

    const [updatePassword, setPassword] = useState<UpdatePasswordType>({
        user_password: '',
        user_password_repeat: '',
    });
    
    const [option, setOption] = useState<string>("user");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const handleUser = (e:React.ChangeEvent<HTMLInputElement>) => {
        setErrorMessage("");
        setUpdate({ 
            ...updatedUser, 
            [e.target.name]: e.target.value,
        });
    }

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setErrorMessage("");
        setPassword({ 
            ...updatePassword, 
            [e.target.name]: e.target.value,
        });
    }

    const handleAvatar = (e:React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files as FileList;
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);
        setAvatar(formData);
    }

    const deleteUser = async () => {
        await dispatch(deleteUsesrThunk(user.user_id));
    }

    const validation = () => {
        if (updatePassword.user_password !== '' && updatePassword.user_password !== updatePassword.user_password_repeat)
            {
                setErrorMessage("Passwords don't match");
                return false;
            }
        if (updatedUser.user_firstname==='' || updatedUser.user_lastname==='')
            {
                setErrorMessage("First and last name can't be empty");
                return false;
            }
        if (JSON.stringify(updatedUser)===JSON.stringify(example) && updatePassword.user_password==="" && updAvatar === null)
            {
                setErrorMessage("No changes were applied");
                return false;
            }
        return true;
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validation())
        {
            try{
            if (updatePassword.user_password!=='')
                await updPas(updatePassword, user.user_id);
            if (JSON.stringify(updatedUser)!==JSON.stringify(example))
                 await dispatch(updateUserThunk(updatedUser, user.user_id));
            if (updAvatar !== null)
                await dispatch(updateAvatarThunk(updAvatar, user.user_id));
            }
            catch(error:unknown)
            {
                if (isAxiosError(error))
                    setErrorMessage(error.response?.data.detail);
            }
        }
    }

    const loadForm = option === "user"?
    (<form className="settings-form" onSubmit={handleSubmit}>
    <Input lab="First name" type="input" inputName="user_firstname" handleChange={handleUser} value={updatedUser.user_firstname}/>
    <Input lab="Second name" type="input" inputName="user_lastname" handleChange={handleUser} value={updatedUser.user_lastname}/>
    <Input lab="City" type="input" inputName="user_city" handleChange={handleUser} value={updatedUser.user_city}/>
    <Input lab="Phone" type="input" inputName="user_phone" handleChange={handleUser} value={updatedUser.user_phone}/>
    <div className="inp">
            <label htmlFor="user_avatar">Avatar</label>
            <input type="file" name="user_avatar" accept="image/*" onChange={handleAvatar}/>
        </div>
    <button>Apply</button>
    </form>
    ):(
        <form className="settings-form" onSubmit={handleSubmit}>
            <Input lab="Password" type="password" inputName="user_password"handleChange={handlePassword} value={updatePassword.user_password}/>
            <Input lab="Repeat password" type="password" inputName="user_password_repeat" handleChange={handlePassword} value={updatePassword.user_password_repeat}/>
            <button>Apply</button>
        </form>
    )

    return (
        <>
        <div className="settings-holder">
        {errorMessage && <ErrorBox message={errorMessage}/>}
        <div className="setting-options">
            <button onClick={()=>setOption("user")}>User</button>
            <button onClick={()=>setOption("password")}>Password</button>
            <button onClick={() => setDeleteModal(true)}>Delete user</button>
        </div>
            {loadForm}
        </div>
        <ModalWindow modal={deleteModal} setModal={setDeleteModal}>
            <div className="delete-text">
                <h3>Are you shure?</h3>
                <div className="delete-options">
                    <button onClick={deleteUser}>Yes</button>
                    <button onClick={()=>setDeleteModal(false)}>No</button>
                </div>
            </div>
        </ModalWindow>
        </>
    );
}

export default UserSettings;
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { useEffect, useState } from "react";
import defaultAvatar from '../defaultavatar.jpg'
import { ModalWindow } from "../Components/ModalWindow";
import UserSettings from "../Components/UserSettings";
import '../Styles/Profile.css'
import { User } from "../Types/stateType";


const Profile = (props: {
    user_id: number|null
}) => {

    const [modal, setModal] = useState(false);

    const regUser = useSelector((state:RootState)=> state.user as User);
    const user = useSelector((state: RootState) => regUser.user_id===props.user_id? state.user as User :state.list.user_visit as User);
    const avatar = user.user_avatar === null? defaultAvatar : user.user_avatar;

    return (
        <>
        <div className="profile-card">
            <div className="avatar-holder">
                <img src={avatar} alt='avatar' className="user-avatar" width='250px' height='auto'/>
            </div>
            <div className="user">
                <p className="profile-name user-p">Name <br/>{user.user_firstname} {user.user_lastname}</p>
                <p className="profile-mail user-p">E-mail <br/>{user.user_email}</p>
                {user.user_phone && <p>Phone <br/>{user.user_phone}</p>}
                {user.user_city && <p>City <br/>{user.user_city}</p>}   
                
            </div>
            {regUser.user_id === user.user_id && 
                <div className="profile-button">
                    <button onClick={()=>setModal(true)}>Settings</button>
                </div>
            }
        </div>
            <ModalWindow modal={modal} setModal={setModal}>
                <UserSettings/>
            </ModalWindow>
        </>
    );
}

export default Profile;
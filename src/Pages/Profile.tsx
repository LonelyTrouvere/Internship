import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { useEffect } from "react";
import defaultAvatar from '../defaultavatar.jpg'
import '../Styles/Profile.css'
import { User } from "../Types/stateType";


const Profile = (props: {
    user_id?: number|null
}) => {

    const user = useSelector((state: RootState) => props.user_id === undefined?state.user:state.list.user_visit) as User;
    const avatar = user.user_avatar === null? defaultAvatar : user.user_avatar;

    return (
        <div className="profile">
            <div className="avatar-holder">
                <img src={avatar} alt='avatar' className="user-avatar"/>
            </div>
            <div className="user">
                <p className="profile-name user-p">Name <br/>{user.user_firstname} {user.user_lastname}</p>
                <p className="profile-mail user-p">E-mail <br/>{user.user_email}</p>
                {user.user_phone!==null && <p>Phone <br/>{user.user_phone}</p>}
                {user.user_city!==null && <p>City <br/>{user.user_city}</p>}
            </div>
        </div>
    );
}

export default Profile;
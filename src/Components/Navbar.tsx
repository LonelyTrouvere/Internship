import {Link, useNavigate} from 'react-router-dom'
import '../Styles/Navbar.css'
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { useDispatch } from '../Store/typedDispatch';
import { DELETE_TOKEN, LOGOUT } from '../Types/actionType';
import { User } from '../Types/stateType';
import { visitedUser } from '../Store/asyncMetods';

const Navbar = () =>
{
    const dispatch = useDispatch();
    const redirect = useNavigate();
    const token = useSelector((state:RootState) => state.token.access_token);
    const visited = useSelector((state: RootState) => state.user['user_id']);
    const userName = useSelector((state:RootState) => state.user['user_firstname']+' '+state.user['user_lastname']);
    const email = useSelector((state:RootState) => state.user['user_email']);
    const handleLogout = () =>{
        localStorage.removeItem('access_token');
        dispatch({type:LOGOUT});
        dispatch({type:DELETE_TOKEN});
    }

    const profileRedirect = async ()=> {
        await dispatch(visitedUser(visited));
        redirect(`/user/${visited}`);
    }

    return (
    <nav>
        <div>
        <Link to=""><button className='home buttons'>Home</button></Link>
        {token && <button onClick={profileRedirect} className='profile buttons'>Profile</button>}
        {token && <Link to="/company"><button className='company buttons'>Company</button></Link>}
        {token && <Link to="/list"><button className='list buttons'>List</button></Link>}
        <Link to="/about"><button className='about buttons'>About</button></Link>
        </div>
        <div className='forms'>
        {
            token === null &&
        <>
            <Link to="/login"><button className='login buttons'>Log in</button></Link>
            <Link to="/signup"><button className='signup buttons'>Sign up</button></Link>
        </>
        }
        {
            token !==null &&
            <>
            <div className='user-info'>
                <p>{userName}</p>
                <p>{email}</p>
            </div>
            <button className='login buttons' onClick={handleLogout}>Log out</button>
            </>
        }
        </div>
    </nav>
    );
}

export default Navbar;
import {Link} from 'react-router-dom'
import '../Styles/Navbar.css'
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { useDispatch } from '../Store/typedDispatch';
import { DELETE_TOKEN, LOGOUT } from '../Types/actionType';
import { useEffect } from 'react';

const Navbar = () =>
{
    const dispatch = useDispatch();
    const token = useSelector((state:RootState) => state.token.access_token);
    const userName = useSelector((state:RootState) => state.user.user_firstname+' '+state.user.user_lastname);
    const email = useSelector((state:RootState) => state.user.user_email);
    const handleLogout = () =>{
        localStorage.removeItem('access_token');
        dispatch({type:LOGOUT});
        dispatch({type:DELETE_TOKEN});
    }

    return (
    <nav>
        <div>
        <Link to=""><button className='home buttons'>Home</button></Link>
        {token && <Link to="/profile"><button className='profile buttons'>Profile</button></Link>}
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
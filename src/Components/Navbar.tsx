import {Link} from 'react-router-dom'
import '../Styles/Navbar.css'

const Navbar = () =>
{
    const token = localStorage.getItem('access_token');
    return (
    <nav>
        <div>
        <Link to=""><button className='home buttons'>Home</button></Link>
        {token && <Link to="/profile"><button className='profile buttons'>Profile</button></Link>}
        {token && <Link to="/list"><button className='list buttons'>List</button></Link>}
        <Link to="/about"><button className='about buttons'>About</button></Link>
        </div>
        <div className='forms'>
        <Link to="/login"><button className='login buttons'>Log in</button></Link>
        <Link to="/signup"><button className='signup buttons'>Sign up</button></Link>
        </div>
    </nav>
    );
}

export default Navbar;
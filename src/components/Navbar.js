import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import {Link} from 'react-router-dom'

const Navbar = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout()
    
    return (
        <div className="navbar">
            <div className="social-logo-container">
                <img src="/images/Social-Logo.png" alt="social-logo" className="social-logo"/>
                <p className="social-logo-text">ACTIVE</p>
            </div>
            {user && (
                <div className='logout-container'>
                    <p className='logged-username'>{user.username}</p>
                    <button className='logout-button' onClick={logout}>Log out</button>
                </div>
            )}
            {!user && (
                <div className='login-signup-buttons'>
                    <Link to="/login" className="login-button">Log in</Link>
                    <Link to="/signup" className="signup-button">Sign up</Link>
                </div>
            )}
        </div>
    )
}

export default Navbar
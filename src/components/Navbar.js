import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import {Link} from 'react-router-dom'
import { useWindowWidth } from '../hooks/useWindowWidth'
import { useWindowScrollPosition } from '../hooks/useWindowScrollPosition'

const Navbar = ({tab, setTab}) => {
    const {user, dispatch} = useAuthContext()
    const {logout} = useLogout()
    const width = useWindowWidth()
    const scroll = useWindowScrollPosition()
    
    return (
        <div className={`navbar-container ${scroll > 50 && width < 900 ? 'fixed' : ''} ${width >= 900 ? 'shorter' : ''}  ${width >= 900 ? 'fixed-top' : ''}`}>
            <div className={`navbar`}>
                <div className="social-logo-container">
                    <img src="/images/social-logo-2.png" alt="social-logo" className="social-logo"/>
                    <p className="social-logo-text">Active</p>
                </div>
                {user && (
                    <div className='logout-container'>
                        <p className='logged-username'>{user.username}</p>
                        <button className='logout-button' onClick={logout}>Log out</button>
                    </div>
                )}
                {!user && (
                    <div className='login-signup-buttons'>
                        <Link to="/login" className="login-button" onClick={() => dispatch({type: 'LOGOUT', payload: null})}>Log in</Link>
                        <Link to="/signup" className="signup-button" onClick={() => dispatch({type: 'LOGOUT', payload: null})}>Sign up</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
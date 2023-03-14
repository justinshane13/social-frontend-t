import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { dispatch } = useAuthContext()
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
    }

    const handleGuest = async (e) => {
        e.preventDefault()

        dispatch({type: 'GUEST', payload: null})
    }

    return (
        <div className="login-page">
            <div className="login-page-header">
                <img className='login-social-logo-corner' src='images/Social-Logo.png' alt='Social logo' />
                <div className="login-social-title-corner">Active</div>
            </div>
            <form className="login" onSubmit={handleSubmit}>
                <img className='login-social-logo' src='images/Social-Logo.png' alt='Social logo' />
                <h3 className="login-title">Log in</h3>
                <p className="login-to-signup">Don't have an account? <Link to="/signup" className="link">Sign up</Link></p>
                <input 
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    placeholder="Username"
                />
                {error && <div className="error-text">{error}</div>}
                <input 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Password"
                />
                {error && <div className="error-text">{error}</div>}
                <button type='submit'>Log in</button>
                <div className="guest-button" onClick={handleGuest}>Continue as guest</div>
            </form>
        </div>
    )
}

export default Login
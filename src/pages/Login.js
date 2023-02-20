import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
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
                <p className="login-to-signup">New to Social? <Link to="/signup" className="link">Sign up</Link></p>
                <input 
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    placeholder="Username"
                />
                <input 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Password"
                />
                <button>Log in</button>
            </form>
        </div>
    )
}

export default Login
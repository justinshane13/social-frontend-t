import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Link } from 'react-router-dom'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(username, password)

        await signup(username, password)
    }

    return (
        <div className="login-page">
            <div className="login-page-header">
                <img className='login-social-logo-corner' src='images/Social-Logo.png' alt='Social logo' />
                <div className="login-social-title-corner">Active</div>
            </div>
            <form className="login" onSubmit={handleSubmit}>
                <img className='login-social-logo' src='images/Social-Logo.png' alt='Social logo' />
                <h3 className="login-title">Sign up</h3>
                <p className="login-to-signup">Already a member? <Link to="/login" className="link">Log in</Link></p>
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
                <button>Sign up</button>
            </form>
        </div>
    )
}

export default Signup
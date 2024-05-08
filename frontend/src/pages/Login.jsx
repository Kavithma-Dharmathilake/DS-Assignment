import { useState } from "react"
import { useLogin } from "../hooks/useLogin.jsx"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <div className="login">
        <form  onSubmit={handleSubmit}>
            <div className="login-form">
                <div className= "neon-container">
                <h3 className="neon_log" data-text="U">GALAXYPORT</h3>
                </div>
                <div className="">
                    <img src="" className="" alt="" />
                </div>
                <div className="input-group">
                    <label>Email address:</label>
                    <input className="input-label"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input className="input-label"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button disabled={isLoading}>LOG IN</button>
                {error && <div className="error">{error}</div>}
            </div>
        </form>
        </div>
    )
}

export default Login

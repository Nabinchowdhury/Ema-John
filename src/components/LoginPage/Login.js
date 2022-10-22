import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/UserContext';
import "./Login.css"

const Login = () => {
    const { logUserIn } = useContext(AuthContext)
    const [error, setError] = useState("")
    // console.log(user)
    const navigate = useNavigate()

    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value;
        const password = form.password.value;
        logUserIn(email, password)
            .then(result => {
                const user = result.user
                console.log("Log in successfull")
                form.reset()
                setError("")
                navigate(from, { replace: true })
            }).catch(error => {
                console.error("ERROR", error)
                setError(error.message)
            })

    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="form-control">
                    <label >Email</label>
                    <input type="email" name='email' placeholder='Enter your email' required />
                </div>
                <div className="form-control">
                    <label >Password</label>
                    <input type="password" name='password' placeholder='Enter your password' required />
                </div>
                <p style={{ color: "red" }}>{error}</p>
                <button className='btn-submit'>Login</button>
                <p><small>New to Ema-John? <Link to="/register" className='toggle-login-signup'>Create an account</Link></small></p>
            </form>
        </div >
    );
};

export default Login;
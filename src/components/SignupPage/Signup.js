import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/UserContext';

const Signup = () => {
    const { createNewUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (password !== confirmPassword) {
            console.log("password not matched")
            return
        }
        createNewUser(email, password)
            .then(result => {
                const user = result.user
                console.log("New account created")
                form.reset()
                navigate("/shop")
            }).catch(error => console.error("ERROR", error))

    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="form-control">
                    <label >Email</label>
                    <input type="email" name='email' placeholder='Enter your email' required />
                </div>
                <div className="form-control">
                    <label >Password</label>
                    <input type="password" name='password' placeholder='Enter your password' required />
                </div>
                <div className="form-control">
                    <label >Confirm Password</label>
                    <input type="password" name='confirmPassword' placeholder='Confirm your password' required />
                </div>
                <button className='btn-submit'>Sign up</button>
                <p><small>Already have an account? <Link to="/signup" className='toggle-login-signup'>Log in</Link></small></p>
            </form>
        </div>
    );
};

export default Signup;
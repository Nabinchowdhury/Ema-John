import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg'
import { AuthContext } from '../Contexts/UserContext';
import './Header.css'

const Header = () => {
    const { user } = useContext(AuthContext)

    const { logUserOut } = useContext(AuthContext)
    const handleSignOut = () => {
        logUserOut()
            .then(() => {
                console.log("Log out Successful")
            }).catch(error => console.error("ERROR", error))

    }
    return (
        <div className='header'>
            <Link to="/"><img src={logo} alt="" /></Link>
            <div className='nav'>
                <Link to="/shop">Shop</Link>
                <Link to="/order">Order</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>

                {user && user?.uid ?
                    < button onClick={handleSignOut} className="btn-logOut">Sign Out</button> :
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>

                }
            </div>
        </div >
    );
};

export default Header;
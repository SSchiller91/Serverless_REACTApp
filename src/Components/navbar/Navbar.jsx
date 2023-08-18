import "./navbar.css"
import {useState} from 'react';
import Header from "../header/Header";
import { useNavigate } from 'react-router-dom';
import { withAuthenticator, useAuthenticator,Button } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
const Navbar = () => {
    const { signOut } = useAuthenticator();
    const navigate = useNavigate();
    const { authStatus } = useAuthenticator(context => [context.authStatus]);
    const { user } = useAuthenticator((context) => [context.user]);
    return (
        <div className='navbar'> 
            <div className="navContainer">
                <span className="logo"> AnyTravel</span>
                    <div className="navItems">
                    {authStatus !== 'authenticated' ? 
                        <button className="navButton" onClick={() => navigate("/login")}>Register/Login</button>
                        :
                        <div className="logContainer"> 
                            <p className="log">Hello {user.username}</p>
                            <button className="navButton" onClick={signOut}>Loggout</button>
                        </div>
                    }
            </div>
            </div>
        
        </div>
    );
  };
  
  export default Navbar;
import "./navbar.css"

import {useState} from 'react';
import Header from "../header/Header";


const Navbar = () => {
    return (
        <div className='navbar'> 
            <div className="navContainer">
                <span className="logo"> AnyTravel</span>
                    <div className="navItems">
                        <button className="navButton">Register/Login</button>
            </div>
            </div>
        
        </div>
    );
  };
  
  export default Navbar;
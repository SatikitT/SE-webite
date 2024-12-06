import './Nom-header.css';
import '../../App.css'
import logo from '../../assets/header/SE_logo.png';
import Profile from '../../assets/header/profile.jpg';
import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from '../Auth';

function Header({ isAdmin = false }) {
    const { instance, inProgress } = useMsal();
    const activeAccount = instance.getActiveAccount();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleRedirect = () => {
        if (inProgress === InteractionStatus.None) {
            setIsLoggingIn(true);
            instance
                .loginRedirect(loginRequest)
                .catch((error) => {
                    console.log(error);
                    setIsLoggingIn(false);
                });
        }
    };

    const handleLogout = () => {
        instance.logoutRedirect().catch((error) => console.log(error));
    };

    useEffect(() => {
        let lastScrollTop = 0;
        const handleScroll = () => {
            const header = document.querySelector('.header');
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScrollTop > lastScrollTop) {
                header.style.top = '-80px';
            } else {
                header.style.top = '0';
            }

            lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleLogoClick = (e) => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header className='header'>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"></link>
            <div className='main-nav-container'>
                <hr className='header-gradient'></hr>
                <div className='container'>
                    <div className='SElogo-container'>
                        <Link to="/" onClick={handleLogoClick}>
                            <img src={logo} alt="SE Logo" height={'50em'} />
                        </Link>
                    </div>

                    <ul className='navs-container'>
                    <Link to="/" className='navs-button' onClick={handleLogoClick}>Home</Link>
                        <Link to="/program" className='navs-button' onClick={handleLogoClick}>Program</Link>
                        <Link to="/admission" className='navs-button' onClick={handleLogoClick}>Admission</Link>
                        <Link to="/about" className='navs-button' onClick={handleLogoClick}>About</Link>
                        <AuthenticatedTemplate>
                        <Link to="/cooproom" className='navs-button' onClick={handleLogoClick}>Room booking</Link>
                        <Link to="/forums" className='navs-button' onClick={handleLogoClick}>Forums</Link>
                        </AuthenticatedTemplate>
                        <Link to="/map" className='navs-button' onClick={handleLogoClick}>3D tour</Link>
                        {
                            isAdmin ? (
                                <li className='navs-button'>
                                    <Link to="/admin">Admin only</Link>
                                </li>
                            ) : (<></>)
                        }
                    </ul>

                    <div className='profile-container'>
                        <UnauthenticatedTemplate>
                            <button className='globalbutton' onClick={handleRedirect} disabled={isLoggingIn || inProgress !== InteractionStatus.None}>
                                {isLoggingIn ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </UnauthenticatedTemplate>
                        <AuthenticatedTemplate>
                            <p style={{ marginRight: "10px" }}>Welcome, {activeAccount ? activeAccount.name : "User"}!</p>

                            <div style={{ height: "100%" }}>
                                <a href="#profile">
                                    <img src={Profile} alt="profile" height={'40em'} style={{ marginTop: "40%" }} />
                                </a>

                                <div className='dropdown-profile'>
                                    <a href="#profile">My Profile</a>
                                    <a href="#settings">Settings</a>
                                    <a href="#logout" onClick={handleLogout} style={{ color: 'red' }}>
                                        Logout
                                    </a>
                                </div>
                            </div>
                        </AuthenticatedTemplate>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
import './Nom-header.css';
import logo from '../../assets/header/SE_logo.png';
import Profile from '../../assets/header/profile.jpg';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from '../AuthConfig';

function Header() {
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
            const container = document.querySelector('.container');
            const image = document.getElementById('monkey-image');
            const imageBottom = image?.getBoundingClientRect().bottom - 500 || 0;
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (imageBottom < 0) {
                container.style.background = '#ebebeb';
                container.style.borderBottom = '1px solid #d9d9d9';
                container.style.transition = '0.3s';
            } else {
                container.style.background = 'linear-gradient(to bottom, white 15%, transparent)';
                container.style.borderBottom = 'none';
                container.style.transition = '0.3s';
            }

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

    return (
        <header className='header'>
            <div className='main-nav-container'>
                <hr className='header-gradient'></hr>
                <div className='container'>
                    <div className='SElogo-container'>
                        <Link to='/'>
                            <img src={logo} alt="SE Logo" height={'40em'} />
                        </Link>
                    </div>

                    <ul className='navs-container'>
                        <li className='navs-button'>
                            <Link to="/">Home</Link>
                        </li>
                        <li className='navs-button'>
                            <Link to="/cooproom">Coop Room</Link>
                        </li>
                        <li className='navs-button'>
                            <Link to="/about">About</Link>
                        </li>
                        <li className='navs-button'>
                            <Link to="/forums">Forum</Link>
                        </li>
                    </ul>

                    <div className='profile-container'>
                        <UnauthenticatedTemplate>
                            <button onClick={handleRedirect} disabled={isLoggingIn || inProgress !== InteractionStatus.None}>
                                {isLoggingIn ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </UnauthenticatedTemplate>
                        <AuthenticatedTemplate>
                            <a href="#profile">
                                <img src={Profile} alt="profile" height={'40em'} />
                            </a>
                            <div className='dropdown-profile'>
                                <a href="#profile">My Profile</a>
                                <a href="#settings">Settings</a>
                                <a href="#logout" onClick={handleLogout} style={{ color: 'red' }}>
                                    Logout
                                </a>
                            </div>
                            <p>Welcome, {activeAccount ? activeAccount.name : "User"}!</p>
                        </AuthenticatedTemplate>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

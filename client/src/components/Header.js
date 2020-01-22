import React from 'react';
import PropTypes from 'prop-types';

import './Navbar_Header.scss';
import Logout from './Logout';
import PageNavigation from './PageNavigation';

import Avatar from './icons/avatar.png';
import { ReactComponent as Search } from './icons/search.svg';

const Header = (props) => {
    const handleHamburgerClick = (event) => {
        const slider = event.currentTarget.nextElementSibling;
        slider.classList.toggle('slideIn');
    };
    const mobileCloseMenu = (event) => {
        const slider = event.currentTarget.parentElement;
        slider.classList.toggle('slideIn');
        slider.previousElementSibling.querySelector('INPUT').checked = false;
    };

    return (
        <header className='header'>
            <p><img src={Avatar} alt="Profile" className="avatar"/><br/><span> Jon Doe</span></p>
            <div className="search-field">
                <input type="text" placeholder="Search..."></input>
                <button><Search /></button>
            </div>
            <p className="page-name">{props.activePage}</p>
            <div className="mobile-header">
                <button className="mobile-search">
                    <Search className="mobile-search-icon" />
                </button>
                <button className="burger-lines" onClick={handleHamburgerClick}>
                    {/* A fake & hidden checkbox is used as click reciever,
                    so you can use the :checked selector on it. */}
                    <input type="checkbox" />

                    <div></div>
                    <div></div>
                    <div></div>
                </button>
                <div className="slider">
                    <PageNavigation activePage={mobileCloseMenu} />
                    <Logout />
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    activePage: PropTypes.string.isRequired
};

export default Header;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// import ScrollStop from './ScrollStop';
import './Navbar.scss';
import Logout from '../Logout/Logout';

import { ReactComponent as DashboardIcon } from '../icons/dashboard.svg';
import { ReactComponent as PersonalIcon } from '../icons/personal.svg';
import { ReactComponent as FinanceIcon } from '../icons/finances.svg';
import { ReactComponent as InfoIcon } from '../icons/info.svg';
import { ReactComponent as YogaIcon } from '../icons/yoga.svg';
import { ReactComponent as EventIcon } from '../icons/event.svg';
import { ReactComponent as QuestionsIcon } from '../icons/questions.svg';
import { ReactComponent as SuperuserIcon } from '../icons/superuser.svg';

class Navbar extends Component {
    componentDidMount () {
        const { navbarScrollPos } = this.props;
        this.sideNav = document.getElementById('sidenav');
        this.sideNav.scrollTop = navbarScrollPos;
    }

    sideNav = null;

    updateScrollPos = () => {
        this.props.navbarScrollPosUpdate(4);
    }

    handleNavigation = (event) => {
        event.preventDefault();
        this.updateScrollPos();

        if (window.location.pathname !== event.currentTarget.pathname) {
            window.location.href = event.currentTarget.pathname;
        }
    }

    navStyle = this.props.navStyle;
    // navStyle has two CSS id: sidenav, hamburger

    render () {
        return (
            <ul className="navigation" id={this.navStyle}>
                <li>
                    <NavLink exact to="/dashboard" className="link" onClick={this.handleNavigation}>
                        <div className="menu-icon"><DashboardIcon /></div>
                        <span className="title">Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/personal" className="link" onClick={this.handleNavigation}>
                        <div className="menu-icon"><PersonalIcon /></div>
                        <span className="title">Personal Data</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/yoga" className="link" onClick={this.handleNavigation}>
                        <div className="menu-icon"><YogaIcon /></div>
                        <span className="title">Yoga</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/finances" className="link" onClick={this.handleNavigation}>
                        <div className="menu-icon"><FinanceIcon /></div>
                        <span className="title">Finances</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/events" className="link" onClick={this.handleNavigation}>
                        <div className="menu-icon"><EventIcon /></div>
                        <span className="title">Events</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/questions" className="link" onClick={this.handleNavigation}>
                        <div className="menu-icon"><QuestionsIcon /></div>
                        <span className="title">Personal Questions</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/queries" className="link" onClick={this.handleNavigation}>
                        <div className="menu-icon"><InfoIcon /></div>
                        <span className="title">Queries</span>
                    </NavLink>
                </li>
                { sessionStorage.isSuperuser === 'true'
                    ? <li>
                        <NavLink exact to="/superuser" className="link" onClick={this.handleNavigation}>
                            <div className="menu-icon"><SuperuserIcon /></div>
                            <span className="title">Superuser</span>
                        </NavLink>
                    </li>
                    : null
                }
                <li>
                    <Logout />
                </li>
            </ul>
        );
    }
}

Navbar.propTypes = {
    navStyle: PropTypes.string.isRequired,
    navbarScrollPos: PropTypes.number,
    navbarScrollPosUpdate: PropTypes.func
};

export default Navbar;

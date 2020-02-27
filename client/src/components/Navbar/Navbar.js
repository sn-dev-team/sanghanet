import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

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

const PageNavigation = (props) => {
    return (
        <ul onClick={props.activePage} className="p-0 m-0">
            <li>
                <NavLink exact to="/dashboard" className="link">
                    <div className="menu-icon"><DashboardIcon /></div>
                    <span className="title">Dashboard</span>
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/personal" className="link">
                    <div className="menu-icon"><PersonalIcon /></div>
                    <span className="title">Personal Data</span>
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/yoga" className="link">
                    <div className="menu-icon"><YogaIcon /></div>
                    <span className="title">Yoga</span>
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/finances" className="link">
                    <div className="menu-icon"><FinanceIcon /></div>
                    <span className="title">Finances</span>
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/events" className="link">
                    <div className="menu-icon"><EventIcon /></div>
                    <span className="title">Events</span>
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/questions" className="link">
                    <div className="menu-icon"><QuestionsIcon /></div>
                    <span className="title">Personal Questions</span>
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/queries" className="link">
                    <div className="menu-icon"><InfoIcon /></div>
                    <span className="title">Queries</span>
                </NavLink>
            </li>
            { sessionStorage.isSuperuser === 'true'
                ? <li>
                    <NavLink exact to="/superuser" className="link">
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
};

PageNavigation.propTypes = {
    activePage: PropTypes.func
};

export default PageNavigation;
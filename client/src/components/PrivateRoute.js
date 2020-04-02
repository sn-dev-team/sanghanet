import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = (props) => {
    const { component: Component, navbarScrollPos, navbarScrollPosUpdate, ...rest } = props;
    const user = sessionStorage.getItem('user');
    const isActive = sessionStorage.getItem('isActive');

    return (
        // Show the component only when user is known & active
        // Otherwise, redirect the user to / page
        <Route {...rest} render={ (props) => (
            user && isActive
                ? <Component
                    navbarScrollPosUpdate={navbarScrollPosUpdate}
                    navbarScrollPos={navbarScrollPos}
                    {...props}
                />
                : <Redirect to="/" />
        )} />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    navbarScrollPos: PropTypes.number,
    navbarScrollPosUpdate: PropTypes.func
};

export default PrivateRoute;

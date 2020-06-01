import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login/Login';
import LoginFailed from './pages/LoginFailed/LoginFailed';
import Loading from './pages/Loading/Loading';
import Registration from './pages/Registration/Registration';
import Dashboard from './pages/Dashboard/Dashboard';
import Personal from './pages/Personal/Personal';
import Yoga from './pages/Yoga/Yoga';
import Finances from './pages/Finances/Finances';
import Events from './pages/Events/Events';
import Questions from './pages/Questions/Questions';
import Queries from './pages/Queries/Queries';
import AdminFinance from './pages/Admins/AdminFinance/AdminFinance';
import AdminEvent from './pages/Admins/AdminEvent/AdminEvent';
import AdminYoga from './pages/Admins/AdminYoga/AdminYoga';
import Superuser from './pages/Admins/Superuser/Superuser';

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/loading' component={Loading} />
                    <Route path='/loginfailed' component={LoginFailed} />
                    <PrivateRoute path='/registration' component={Registration} />
                    <PrivateRoute path='/dashboard' component={Dashboard} />
                    <PrivateRoute path='/personal' component={Personal} />
                    <PrivateRoute path='/yoga' component={Yoga} />
                    <PrivateRoute path='/finances' component={Finances} />
                    <PrivateRoute path='/events' component={Events} />
                    <PrivateRoute path='/questions' component={Questions} />
                    <PrivateRoute path='/queries' component={Queries} />
                    <PrivateRoute path='/admin/finance' component={AdminFinance} />
                    <PrivateRoute path='/admin/event' component={AdminEvent} />
                    <PrivateRoute path='/admin/yoga' component={AdminYoga} />
                    <PrivateRoute path='/admin/superuser' component={Superuser} />
                </Switch>
            </BrowserRouter>
        );
    }
};

export default App;

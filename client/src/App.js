import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login/Login';
import ThrowOut from './pages/TrowOut/ThrowOut';
import Loading from './pages/Loading/Loading';
import Registration from './pages/Registration/Registration';
import Main from './pages/Main';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { DataContext } from './components/contexts/DataContext/DataContext';
import { UIcontext } from './components/contexts/UIcontext/UIcontext';
import { dictionaryList } from './languages/dictionaryList';

class App extends Component {
    constructor (props) {
        super(props);

        this.toggleHamburger = () => { this.setState((prevState) => ({ isHamburgerOpen: !prevState.isHamburgerOpen })); };
        this.closeHamburger = () => {
            this.state.isHamburgerOpen && this.setState({ isHamburgerOpen: false });
        };

        this.setAccess = (isSuperuser, isFinanceAdmin, isEventAdmin, isYogaAdmin) => {
            this.setState({
                isSuperuser,
                isFinanceAdmin,
                isEventAdmin,
                isYogaAdmin
            });
        };

        this.changeLang = (lang) => {
            this.setState({
                lang,
                dictionary: dictionaryList[lang]
            });
        };

        this.setUsername =( firstName, lastName) =>{
            const oldData = this.state.dataContext;
            this.setState({
                dataContext: {
                    ...oldData,
                    userName: `${firstName} ${lastName}`
                }
            });
        }

        this.setAvatarSrc =( src ) => {
            const oldData = this.state.dataContext;
            this.setState( {
                    dataContext: {
                        ...oldData,
                        avatarSrc: src
                    }
                }
            )
        }

        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'hu');
        }

        this.state = {
            isHamburgerOpen: false,
            toggleHamburger: this.toggleHamburger,
            closeHamburger: this.closeHamburger,

            isSuperuser: false,
            isFinanceAdmin: false,
            isEventAdmin: false,
            isYogaAdmin: false,
            setAccess: this.setAccess,

            lang: 'hu',
            dictionary: dictionaryList[localStorage.getItem('lang')],
            changeLang: this.changeLang,

            dataContext: {
                userName: 'unknown',
                avatarSrc: '/images/noAvatar.svg',
                setUsername: this.setUsername,
                setAvatarSrc: this.setAvatarSrc
            }
        };
    }

    render () {
        return (
            <div onClick={ this.closeHamburger }>
                <UIcontext.Provider value={this.state}>
                    <DataContext.Provider value={this.state.dataContext}>
                        <BrowserRouter>
                            <Switch>
                                <Route exact path='/' component={Login} />
                                <Route path='/loading' component={Loading} />
                                <Route path='/throwout/:reason' component={ThrowOut} />
                                <Route exact path='/404' component={PageNotFound} />
                                <PrivateRoute path='/registration' component={Registration} />
                                <PrivateRoute path='/app/' component={Main} history={createBrowserHistory()} />
                                <Redirect to='/404' />
                            </Switch>
                        </BrowserRouter>
                    </DataContext.Provider>
                </UIcontext.Provider>
            </div>
        );
    }
};

export default App;

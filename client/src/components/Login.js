import React, { Component } from 'react';
import Buddha from './media/sangha_logo.svg';
import GoogleLogo from './media/google_logo.png';

class Login extends Component {
    render () {
        return (
            <div className="app">
                <header>
                    <h1>Welcome to SanghaNet</h1>
                </header>
                <main>
                    <img className="buddha" src={Buddha} alt="buddha logo"/>
                    <button className="login-btn">
                        <div className="google-logo-box">
                            <img className="google-logo" src={GoogleLogo} alt="google logo"/>
                        </div>
                        <div className="login-btn-text noselect">SIGN IN</div>
                    </button>
                </main>
            </div>
        );
    }
}

export default Login;

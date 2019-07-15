import React, {Component} from 'react';
import logo from '@src/logo.svg'
import './index.sass'

class Login extends Component {
    render() {
        return (
            <div className="home-page">
                <h1 className="home-title">I'm the Login Page</h1>
                <img src={logo} className="home-logo" alt="logo"/>
            </div>
        );
    }
}

export default Login;

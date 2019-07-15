import React, {Component} from 'react';
import logo from '@src/logo.svg'
import './index.sass'

class User extends Component {
    componentDidMount() {
        console.log('props.match.params: ', this.props.match.params);
        console.log('history.location.state: ', this.props.history.location.state);
    }
    render() {
        return (
            <div className="user-page">
                <h1 className="user-title">I'm the User Page</h1>
                <img src={logo} className="user-logo" alt="logo"/>
            </div>
        );
    }
}

export default User;

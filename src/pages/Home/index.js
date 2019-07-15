import React, { Component } from 'react';
import logo from '@src/logo.svg'
import './index.sass'
import {Button, TabBar} from 'antd-mobile'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            
        }
    }

    render() {
        return (
            <div className="home-page">
                <h1 className="home-title">I'm the Home Page</h1>
                <Button type="primary" onClick={() => this.props.history.push({
                    pathname: '/login',
                    state: {
                        id: 3
                    }
                })}>通过函数跳转</Button>
                TabBar
            </div>
        );
    }
}

export default Home;

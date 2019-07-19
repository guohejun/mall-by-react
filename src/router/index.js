import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Login from '@pages/Login'
import Home from '@pages/Home'
import User from '@pages/User'
import NotFound from '@pages/NotFound'

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/user" component={User}/>
            <Route component={NotFound} />
        </Switch>
    </HashRouter>
)

export default BasicRoute;

import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import Login from '@src/pages/Login/index.jsx'
import Home from '@src/pages/Home/index.jsx'
import Recommend from '@src/pages/Recommend/index.jsx'
import Cart from '@src/pages/Cart/index.jsx'
import Collection from '@src/pages/Collection/index.jsx'
import User from '@src/pages/User/index.jsx'
import NotFound from '@src/pages/NotFound/index.jsx'

const BasicRoute = () => (
	<HashRouter>
		<Switch>
			<Route exact path="/login" component={Login}/>
			<Route exact path="/" component={Home}/>
			<Route exact path="/recommend" component={Recommend}/>
			<Route exact path="/cart" component={Cart}/>
			<Route exact path="/user" component={User}/>
			<Route exact path="/collection" component={Collection}/>
			<Route component={NotFound}/>
		</Switch>
	</HashRouter>
)

export default BasicRoute;

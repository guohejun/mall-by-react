import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import Login from '@src/pages/Login/index.jsx'
import Home from '@src/pages/Home/index.jsx'
import Recommend from '@src/pages/Recommend/index.jsx'
import Cart from '@src/pages/Cart/index.jsx'
import Collection from '@src/pages/Collection/index.jsx'
import ProductDetail from '@src/pages/ProductDetail/index.jsx'
import User from '@src/pages/User/index.jsx'
import NotFound from '@src/pages/NotFound/index.jsx'
// 游戏中心
import GameCenter from '@src/pages/Games/GameCenter/index.jsx'
import GameOpenCardSelectLevel from '@src/pages/Games/GameOpenCard/SelectLevel/index.jsx'
import GameOpenCardSelectBarrier from '@src/pages/Games/GameOpenCard/SelectBarrier/index.jsx'
import GameOpenCardGameMain from '@src/pages/Games/GameOpenCard/GameMain/index.jsx'

const BasicRoute = () => (
	<HashRouter>
		<Switch>
			<Route exact path="/login" component={Login}/>
			<Route exact path="/" component={Home}/>
			<Route exact path="/recommend" component={Recommend}/>
			<Route exact path="/cart" component={Cart}/>
			<Route exact path="/user" component={User}/>
			<Route exact path="/collection" component={Collection}/>
			<Route exact path="/productDetail/:id" component={ProductDetail}/>
			<Route exact path="/game" component={GameCenter}/>
			<Route exact path="/game/openCard/level" component={GameOpenCardSelectLevel}/>
			<Route exact path="/game/openCard/barrier/:level" component={GameOpenCardSelectBarrier}/>
			<Route exact path="/game/openCard/main/:barrier" component={GameOpenCardGameMain}/>
			<Route component={NotFound}/>
		</Switch>
	</HashRouter>
)

export default BasicRoute;

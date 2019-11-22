import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import loadable from '@src/utils/loadable'
import PrivateRoute from "./authRoute.jsx";



const Home = loadable(() => import("../pages/Home/index.jsx"))
const Login = loadable(() => import("@src/pages/Login/index.jsx"))
const Register = loadable(() => import("@src/pages/Register/index.jsx"))
const Recommend = loadable(() => import("@src/pages/Recommend/index.jsx"))
const Cart = loadable(() => import("@src/pages/Cart/index.jsx"))
const Collection = loadable(() => import("@src/pages/Collection/index.jsx"))
const ProductDetail = loadable(() => import("@src/pages/ProductDetail/index.jsx"))
const User = loadable(() => import("@src/pages/User/index.jsx"))
const NotFound = loadable(() => import("@src/pages/NotFound/index.jsx"))

// 游戏中心
const GameCenter = loadable(() => import("@src/pages/Games/GameCenter/index.jsx"))
const GameOpenCardSelectLevel = loadable(() => import("@src/pages/Games/GameOpenCard/SelectLevel/index.jsx"))
const GameOpenCardSelectBarrier = loadable(() => import("@src/pages/Games/GameOpenCard/SelectBarrier/index.jsx"))
const GameOpenCardGameMain = loadable(() => import("@src/pages/Games/GameOpenCard/GameMain/index.jsx"))


// import Home from '@src/pages/Home/index.jsx'
// import Login from '@src/pages/Login/index.jsx'
// import Register from '@src/pages/Register/index.jsx'
// import Recommend from '@src/pages/Recommend/index.jsx'
// import Cart from '@src/pages/Cart/index.jsx'
// import Collection from '@src/pages/Collection/index.jsx'
// import ProductDetail from '@src/pages/ProductDetail/index.jsx'
// import User from '@src/pages/User/index.jsx'
// import NotFound from '@src/pages/NotFound/index.jsx'
// // 游戏中心
// import GameCenter from '@src/pages/Games/GameCenter/index.jsx'
// import GameOpenCardSelectLevel from '@src/pages/Games/GameOpenCard/SelectLevel/index.jsx'
// import GameOpenCardSelectBarrier from '@src/pages/Games/GameOpenCard/SelectBarrier/index.jsx'
// import GameOpenCardGameMain from '@src/pages/Games/GameOpenCard/GameMain/index.jsx'


const BasicRoute = (props) => {
	return (
		<HashRouter>
			<Switch>
				<Route exact path="/login" component={Login}/>
				<PrivateRoute exact path="/" component={Home}/>
				<PrivateRoute exact path="/recommend" component={Recommend}/>
				<PrivateRoute exact path="/cart" component={Cart}/>
				<PrivateRoute exact path="/user" component={User}/>
				<PrivateRoute exact path="/collection" component={Collection}/>
				<PrivateRoute exact path="/productDetail/:id" component={ProductDetail}/>
				<PrivateRoute exact path="/game" component={GameCenter}/>
				<PrivateRoute exact path="/game/openCard/level" component={GameOpenCardSelectLevel}/>
				<PrivateRoute exact path="/game/openCard/barrier/:levelId" component={GameOpenCardSelectBarrier}/>
				<PrivateRoute exact path="/game/openCard/main/:levelId/:curBarrier/:progressId" component={GameOpenCardGameMain}/>
				<Route exact path="/register" component={Register}/>
				<Route component={NotFound}/>
			</Switch>
		</HashRouter>
	)
};

export default BasicRoute;

import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import Loading from "@src/component/Loading/index.jsx";

class PrivateRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: sessionStorage.getItem("user") && JSON.parse(sessionStorage.getItem("user")) !== "{}"
		}
	}

	componentWillMount() {
		if(!this.state.isLogin){
			const {history} = this.props;
			setTimeout(() => {
				history.replace("/login");
			}, 1000)
		}
	}

	render() {
		let { component: Component, ...rest} = this.props;
		return  this.state.isLogin ? <Route {...rest} render={(props) => ( <Component {...props} />)}/> : <Loading />
	}
}

export default withRouter(PrivateRoute);
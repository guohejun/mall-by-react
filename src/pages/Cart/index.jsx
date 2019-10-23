import React, {Component} from "react";
import AppTabBar from "@src/component/AppTabBar";


class Cart extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render () {
		return (
			<section className="cartPage">
				<h1>这里是购物车，敬请期待!</h1>
				<AppTabBar selectedKey={"2"} />
			</section>
		)
	}
}

export default Cart;
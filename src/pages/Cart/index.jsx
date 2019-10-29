import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {List, Checkbox, Toast} from "antd-mobile";
import "./index.less";
import AppHeader from "@src/component/AppHeader";
import {getCartData} from "@src/service/api";
import {fetchCartList} from "@src/redux/actions/cart.jsx";
import IconSvg from "../../component/IconSvg";

const CheckboxItem = Checkbox.CheckboxItem;

const loadData = props => {
	props.fetchCartList();
}

class Cart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isEdit: false,
			// data: {
			// 	total: 0,
			// 	list: []
			// }
		};
	}

	componentDidMount() {
		// this.getCartData();
		loadData(this.props);
	}

	getCartData() {
		Toast.loading("", 0);
		getCartData().then(res => {
			if (res.code === 200) {
				this.setState({data: res.data})
			}
		}).finally(() => {
			Toast.hide();
		})
	}

	onStoreChange(shop) {

	}

	onGoodChange(shop, good) {

	}

	onClickCartManage() {
		this.props.history.push({pathname: "/"})
	}

	renderRightIcon() {
		return (
			<div className="right-icon" onClick={() => this.onClickCartManage()}>
				<span>管理</span>
			</div>
		)
	}

	render() {
		const {data} = this.props;
		return (
			<section className="page cart-page">
				<AppHeader title="购物车" close={true} rightIcon={this.renderRightIcon()} style={{backgroundColor: "#3b3e66", color: "#fff"}}/>

				<section className="cart-page-container">
					<p className="total">共{data.total}件宝贝</p>
					<div className="list-wrap">
						<div className="placeholder"> </div>
						<ul className="list">
							{
								data.list.map((shop, index) => (
									<li className="item" key={shop.storeId}>
										<div className="shop-row">
											<CheckboxItem className="checkbox" key={shop.storeId} onChange={() => this.onStoreChange(shop)}>
											</CheckboxItem>
											<div className="shop-name text-overflow">
												<span>{shop.storeName}</span>
												<IconSvg name="gengduo"/>
											</div>
											<div className="shop-btn">
												<span>领券</span>
											</div>
										</div>
										<ol className="goods-in-shop">
											{
												shop.product.map((good, index) => (
													<li className="good" key={good.id}>
														<CheckboxItem className="checkbox" key={good.id} onChange={() => this.onGoodChange(shop, good)}>
														</CheckboxItem>
														<div className="wrap">
															<div className="inner">
																<div className="img">
																	<img src={good.thumbnail} alt=""/>
																</div>
																<div className="info">
																	<p className="good-name text-overflow-2">{good.productName}</p>
																	<p className="good-sku text-overflow-2">{good.skuStr}</p>
																</div>
															</div>
															<div className="operate">
																<span className="price">￥{good.price}</span>
																<div className="calc">- 1 +</div>
															</div>
														</div>
													</li>
												))
											}
										</ol>
									</li>
								))
							}
						</ul>
					</div>
				</section>
			</section>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	console.log("cart Page mapStateToProps === ", state);
	const {cart} = state;
	return {
		data: cart.data
	}
}

export default withRouter(connect(mapStateToProps, {
	fetchCartList
})(Cart));
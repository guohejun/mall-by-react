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
			isEdit: false
		};
	}

	componentDidMount() {
		loadData(this.props);
	}

	onStoreChange(shop) {

	}

	onGoodChange(shop, good) {

	}

	onClickCartManage() {
		this.setState({isEdit: !this.state.isEdit});
	}

	renderRightIcon() {
		const {isEdit} = this.state;
		return (
			<div className="right-icon" onClick={() => this.onClickCartManage()}>
				<span>{isEdit ? "完成" : "管理"}</span>
			</div>
		)
	}

	renderFooter() {
		const {isEdit, totalPrice} = this.state;
		return (
			<footer className="footer">
				<CheckboxItem className="checkbox">全选</CheckboxItem>
				{
					isEdit
						? <div className="right">
								<button className="button">删除</button>
							</div>
						: <div className="right">
								<div className="total-price">
									<span>合计：</span>
									<span className="price">
										<span>￥</span>
										<span>{totalPrice || 0}</span>
									</span>
								</div>
								<button className="button">结算</button>
							</div>
				}
			</footer>
		)
	}

	render() {
		const {cart} = this.props;
		const {data, isLoading} = cart;
		return (
			<section className="page cart-page">
				<AppHeader title="购物车" close={true} rightIcon={this.renderRightIcon()} style={{
					backgroundColor: "#3b3e66",
					color: "#fff"
				}}/>
				{
					isLoading
						? <h3 className="page-container loading" style={{height: "calc(100% - 1.8rem)"}}>Loading...</h3>
						: <section className="page-container" style={{height: "calc(100% - 1.8rem)"}}>
							<p className="total">共{data.total || 0}件宝贝</p>
							<div className="list-wrap">
								<div className="placeholder"></div>
								<ul className="list">
									{
										data.list.map((shop, index) => (
											<li className="item" key={shop.storeId}>
												<div className="shop-row">
													<CheckboxItem className="checkbox" key={shop.storeId}
													              onChange={() => this.onStoreChange(shop)}/>
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
																<CheckboxItem className="checkbox" key={good.id}
																              onChange={() => this.onGoodChange(shop, good)}/>
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
				}
				{this.renderFooter()}
			</section>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	console.log("cart Page mapStateToProps === ", state);
	const {cart} = state;
	return {
		cart
	}
}

export default withRouter(connect(mapStateToProps, {
	fetchCartList
})(Cart));
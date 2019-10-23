import React, {Component} from "react";
import {withRouter} from "react-router";
import "./index.less";

class ProductItem extends Component {
	constructor(props) {
		super(props);
	};

	render() {
		const {product} = this.props;
		return (
			<section className="productItem" >
				<div className="productImg">
					<img src={product.thumbnail} alt="图片加载失败"/>
					{
						product.isNew ? <span className="new">new</span> : ""
					}
				</div>
				<div className="productInfo">
					<p className="name">{product.productName}</p>
					<div className="priceAndSale">
						<div className="price">
							<span>￥</span>
							<span>{product.price}</span>
						</div>
						<div className="sale">
							<span>{product.saleVolume}</span>
							<span>件</span>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default withRouter(ProductItem);
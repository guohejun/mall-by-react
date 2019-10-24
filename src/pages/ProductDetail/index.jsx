import React, {Component} from "react";
import "./index.less";
import {Toast, Carousel} from "antd-mobile";
import IconSvg from "@src/component/IconSvg";
import {getProductById} from "@src/service/api";

class ProductDetail extends Component{
	constructor(props) {
		super(props);

		this.state = {
			data: {},
		};
	}

	componentDidMount() {
		this.getProductById();
	}

	getProductById() {
		Toast.loading("", 0);
		const {id} = this.props.match.params;
		if (id) {
			getProductById({id}).then(res => {
				if (res.code === 200) {
					this.setState({data: res.data})
				}
			}).catch(()=> {}).finally(() => {
				setTimeout(() => {
					Toast.hide();
				}, 1000)
			})
		}
	}

	render() {
		const {data} = this.state;
		return (
			<div className="product-detail-page">
				<div className="pd-page-container">
					<div className="pd-header">
						<section className="banner-wrap">
							{data.isNew ? <span className="new">new</span> : ""}
							<Carousel
								className="banner"
								autoplay={false}
								infinite
							>
								{data.imgList && data.imgList.map(val => (
									<img
										key={val}
										src={val}
										alt=""
										onLoad={() => {
											// fire window resize event to change height
											window.dispatchEvent(new Event('resize'));
										}}
									/>
								))}
							</Carousel>
						</section>

						<section className="section product-info">
							<div className="product-info__left">
								<p className="name text-overflow-2">{data.productName}{data.productName}</p>
								<div className="price">
									<p className="price-now">
										<span>￥</span>
										<span>{data.price}</span>
									</p>
									<p className="price-origin">
										<span>原价：</span>
										<span>{data.originPrice}</span>
									</p>
								</div>
							</div>
							<div className="product-info__right">
								<div className="share">
									<IconSvg name="share"/>
									<span>分享</span>
								</div>
							</div>
						</section>
					</div>

					<div className="pd-body">
						<section className="section">
							<ul className="ul1">
								<li className="item">
									<span className="key">运费：</span>
									<span className="value">包邮</span>
								</li>
								<li className="item">
									<span className="key">销售：</span>
									<span className="value">51</span>
								</li>
								<li className="item">
									<span className="key">库存：</span>
									<span className="value">449</span>
								</li>
							</ul>
						</section>
						<section className="section">
							<div className="coupon">
								<ul className="coupon-list" style={{width: `${(data.coupons || []).length * 2}rem`}}>
									{
										data.coupons && data.coupons.map((coupon, index) => (
											<li className="item" key={index}>
												<p className="price">
													<span>￥</span>
													<span>{coupon.price}</span>
												</p>
												<p className="expire">满{coupon.limit}元可用</p>
											</li>
										))
									}
								</ul>
							</div>
						</section>
						<section className="section">
							<div className="ul4">
								<div className="one">
									<IconSvg name="choose"/>
									<span>七天无理由退货</span>
								</div>
								<div className="one">
									<IconSvg name="choose"/>
									<span>线下门店</span>
								</div>
							</div>
						</section>

						<section className="section">
							<div className="sku">
								<span className="label">宝贝规格</span>
								<div className="value">
									<span>显示宝贝规格</span>
									<IconSvg name="gengduo"/>
								</div>
							</div>
						</section>

						<section className="section">
							<ul className="tabs"></ul>
						</section>
					</div>
				</div>

				<div className="pd-footer">
					<ul className="footer">
						<li className="icon">
							<IconSvg name="store"/>
							<span>店铺</span>
						</li>
						<li className="icon">
							<IconSvg name="kefu"/>
							<span>客服</span>
						</li>
						<li className="icon">
							<IconSvg name={data.isCollect ? "heart_fill" : "heart"}/>
							<span>{data.isCollect ? "取消收藏" : "收藏"}</span>
						</li>
						<li className="text text-cart">
							<span>加入购物车</span>
						</li>
						<li className="text text-buy">
							<span>立即购买</span>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default ProductDetail;
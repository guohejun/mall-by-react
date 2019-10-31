import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import "./index.less";
import AppHeader from "@src/component/AppHeader";
import IconSvg from "../../component/IconSvg";
import {Grid} from "antd-mobile";

class LinkUpGame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sku: 6,
			skuList: [6, 12, 24, 36, 48],
			list: [],
			opened: [],
			openedAndMatch: [],
			canClick: true
		}
	}

	componentDidMount() {
		this.onCreateRandomData(this.state.sku/2);
	}

	onChangeSku(item) {
		this.setState({sku: item});
		this.onCreateRandomData(item/2);
	}

	onCreateRandomData(num = 3) {
		let nums = num * 2;
		let arr = [];
		for(let i = 0; i < num; i++) {
			arr.push(i+1);
		}
		arr = arr.concat(arr);
		arr.sort((a, b) => Math.round(Math.random()) - 0.5);
		console.log(arr);
		let list = [];
		for(let i = 0; i < nums; i++) {
			let obj = {};
			obj.id = i + 1;
			obj.label = arr[i];
			obj.visible = false;
			obj.match = false;
			list.push(obj);
		}
		console.log(list);
		this.setState({list})
	}

	onItemClick(item) {
		let {list, opened, openedAndMatch, canClick} = this.state;
		if (item.visible || !canClick) return;

		// 将当前卡片翻开
		let index = list.findIndex(o => o.id === item.id);
		list[index].visible = true;

		// 当前卡片与已开卡片中有面值相同的，则两张match置为true，并放入opened openedAndMatch中
		let openedAndNotMatch = opened.filter(o => o.match === false);
		let val = openedAndNotMatch.some(o => o.label === item.label);
		console.log(val, openedAndNotMatch)
		// debugger
		if (val) {
			this.setState({list, opened, openedAndMatch, canClick: false});
			setTimeout(() => {
				for(let i = 0, len = list.length; i < len; i++ ) {
					if (list[i].label === item.label) {
						list[i].match = true;
						opened.every(k => k.id !== list[i].id) && opened.push(item);
						openedAndMatch.every(k => k.id !== list[i].id) && openedAndMatch.push(item);
					}
				}
				this.setState({list, opened, openedAndMatch, canClick: true});
			}, 500)
		} else if (openedAndNotMatch.length > 0) {
			this.setState({list, opened, openedAndMatch, canClick: false});
			let k = list.findIndex( o => o.id === openedAndNotMatch[0].id);
			let openK = opened.findIndex( o => o.id === openedAndNotMatch[0].id);
			setTimeout(() => {
				list[index].visible = false;
				list[k].visible = false;
				opened.splice(openK);
				this.setState({list, opened, openedAndMatch, canClick: true});
			}, 500)
		} else {
			opened.every(k => k.id !== item.id) && opened.push(item);
			this.setState({list, opened, openedAndMatch});

		}
	}

	onFilterItemClass(item) {
		let cls = "item";
		if (item.match) {
			cls += " match";
		}
		if (!item.visible) {
			cls += " hidden";
		}
		return cls
	}

	onFilterItemLabel(item) {
		let label = item.label;
		if (item.match) {
			label = "";
		}
		if (!item.visible) {
			label = "开";
		}
		return label
	}

	onRenderSku() {
		const {skuList} = this.state;
		return (
			<div className="skus-wrap">
				<span className="label">规格：</span>
				<ul className="skus">
					{
						skuList.map(item => (
							<li className="sku" key={item}>
								<button className={this.state.sku === item ? "active" : ""}
								        onClick={() => this.onChangeSku(item)}>{item}</button>
							</li>
						))
					}
				</ul>
			</div>
		)
	}

	render() {
		const {list} = this.state;
		return (
			<section className="page link-up-game-page">
				<AppHeader title="翻牌" close={true} />
				<section className="page-container" style={{height: "calc(100% - .8rem)"}}>
					{this.onRenderSku()}
					<ul className="list">
						{
							list.map(item => (
								<li className={this.onFilterItemClass(item)} key={item.id} onClick={() => this.onItemClick(item)}>
									<span>{this.onFilterItemLabel(item)}</span>
								</li>
							))
						}
					</ul>
				</section>
			</section>
		)
	}
}


export default withRouter(LinkUpGame);
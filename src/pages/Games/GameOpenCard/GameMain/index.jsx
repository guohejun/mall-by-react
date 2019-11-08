import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import "./index.less";
import AppHeader from "@src/component/AppHeader";

class GameOpenCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sku: 6,
			skuList: [6, 12, 24, 36, 48],
			list: [],
			cacheList: [],
			cacheOpened: [],
			canItemClick: true,
			prevClickIndex: -1, // 点击的上一个index值
			timeId: null,
			process: 0
		}
	}

	componentDidMount() {
		this.onCreateRandomData(this.state.sku / 2);
	}

	onChangeSku(item) {
		this.setState({sku: item});
		this.onCreateRandomData(item / 2);
	}

	onCreateRandomData(num = 3) {
		let nums = num * 2;
		let arr = [];
		for (let i = 0; i < num; i++) {
			arr.push(i + 1);
		}
		arr = arr.concat(arr);
		arr.sort((a, b) => Math.round(Math.random()) - 0.5);
		let list = [];
		for (let i = 0; i < nums; i++) {
			list.push({
				id: i + 1,
				label: arr[i],
				visible: false,
				match: false
			});
		}
		console.log(arr)
		const cacheList = JSON.parse(JSON.stringify(list));
		this.setState({list, cacheList})
	}

	updateList(data) {
		let state = JSON.parse(JSON.stringify(this.state));
		let {cacheList, cacheOpened, timeId} = this.state;
		console.log("updateList type: ", JSON.stringify(data), "updateList cacheOpened: ", JSON.stringify(cacheOpened))
		this.setState({
			list: JSON.parse(JSON.stringify(cacheList)),
			canItemClick: true,
			timeId: null
		})
		console.log("cacheList: ", cacheList)
		clearTimeout(timeId);
	}

	onItemClick(item, currentIndex) {
		console.log(currentIndex + 1, " =================================== 【onItemClick event start】", currentIndex)
		let {process} = this.state;

		// 如果卡片的visible为true，return
		let prevClickIndex = this.state.prevClickIndex;
		this.setState({prevClickIndex: currentIndex});
		if (item.visible) return;

		if (process > 1) {
			process = 0;
		}
		process += 1;

		console.log("process: ", process, this.state.timeId)
		// 如果此次点击的不是上次的卡片，则立即将待翻开的卡片翻开，并且将canItemClick置为true
		if (this.state.timeId && process === 1) {
			console.log("事件前 更新")
			this.updateList({type: null});
		}


		this.setState({process})
		// 翻开点击的卡片
		// 注意：此处因为上面的this.updateList中setState的异步操作，导致list和cacheList不是最新的，所以需要延迟处理
		setTimeout(() => {
			let {list, cacheList} = this.state;
			list[currentIndex].visible = true;
			cacheList[currentIndex].visible = true;
			this.setState({list, cacheList});
			if (this.state.timeId && process === 1) return

			// 判断是否当前卡片和已翻开的卡片相匹配
			let cacheOpened = JSON.parse(JSON.stringify(this.state.cacheOpened));
			let openedAndNotMatch = cacheOpened.filter(o => o.match === false);
			let isCurrentMatchOpened = openedAndNotMatch.some(o => o.label === item.label);
			console.log("openedAndNotMatch: ", JSON.stringify(openedAndNotMatch));
			if (process === 2 && isCurrentMatchOpened) {
				console.log(1)
				// 匹配
				for (let i = 0, len = cacheList.length; i < len; i++) {
					// 匹配，则把 cacheList 中和当前同名的卡片的match属性置为true，并同步到 cacheOpened
					if (cacheList[i].label === item.label) {
						cacheList[i].match = true;
						cacheOpened.every(o => o.id !== cacheList[i].id) && cacheOpened.push(cacheList[i]);
					}
				}
				cacheOpened.map(o => {
					if (o.label === item.label) {
						o.match = true;
					}
					return o
				})

				// 如果用户没有点击其他卡片，则短暂延迟后，将匹配的卡片标记已匹配
				let timeId = setTimeout(() => {
					this.updateList({type: 1});
				}, 500)
				this.setState({cacheList, cacheOpened, timeId})

			} else if (process === 2 && openedAndNotMatch.length > 0) {
				console.log(2)
				// 不匹配，但已翻开 且 非已匹配 的列表中有数据
				let k = cacheList.findIndex(o => o.id === openedAndNotMatch[0].id);
				let openK = cacheOpened.findIndex(o => o.id === openedAndNotMatch[0].id);

				// 将不匹配的两个 visible 置为false
				cacheList[currentIndex].visible = false;
				cacheList[k].visible = false;
				cacheOpened.splice(openK);

				let timeId = setTimeout(() => {
					console.log(cacheList)
					this.updateList({type: 2});
				}, 500)
				this.setState({cacheList, cacheOpened, timeId})

			} else {
				console.log(3)
				cacheOpened.push(item);
				this.setState({list, cacheOpened})
			}
			console.log(" =================================== 【onItemClick event end】")
		}, 0)
	}

	onFilterItemClass(item) {
		let cls = "item";
		if (item.match) {
			cls += " match";
		}
		if (item.visible === true) {
			cls += " show";
		}
		return cls
	}

	onFilterItemLabel(item) {
		let label = item.label;
		if (item.match) {
			// label = `对`;
		} else if (!item.visible) {
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
				<AppHeader title="翻牌" close={true}/>
				<section className="page-container" style={{height: "calc(100% - .8rem)"}}>
					{this.onRenderSku()}
					<ul className="list">
						{
							list.map((item, index) => (
								<li className={this.onFilterItemClass(item)} key={item.id}
								    onClick={() => this.onItemClick(item, index)}>
									<div className="front">
										<div className="info">
											<span>{this.onFilterItemLabel(item)}</span>
										</div>
									</div>
									<div className="back">
										<span>{this.onFilterItemLabel(item)}</span>
									</div>
								</li>
							))
						}
					</ul>
				</section>
			</section>
		)
	}
}


export default withRouter(GameOpenCard);
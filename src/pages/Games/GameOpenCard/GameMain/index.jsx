import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import "./index.less";
import AppHeader from "@src/component/AppHeader";
import {getBarrierByLevelBarrier, addOrUpdateCardProgress} from "@src/service/api";
import {Toast} from "antd-mobile";

class GameOpenCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user_id: JSON.parse(sessionStorage.getItem("user") || "{}").id, //用户id
			detail: {}, //关卡详情
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
		this.getBarrierDetail(this.props);

		// 测试参数改变跳转
		// const {levelId, curBarrier, progressId} = this.props.match.params;
		// setTimeout(() => {
		// 	this.props.history.replace({
		// 		pathname: `/game/openCard/main/${levelId}/${curBarrier*1 + 1}/${progressId}`
		// 	})
		// }, 5000)
	}

	//组件更新时被调用
	componentWillReceiveProps(nextProps) {
		this.getBarrierDetail(nextProps);
	}

	getBarrierDetail(props) {
		const {levelId, curBarrier} = props.match.params;
		console.log("levelId, curBarrier: ", levelId, curBarrier)
		getBarrierByLevelBarrier({level: levelId, barrier: curBarrier}).then(res => {
			if (res.code === 200) {
				this.setState({detail: res.data});
				this.onCreateRandomData((res.data || {}).grid_num / 2);
			}
		})
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
		let {cacheList, timeId} = this.state;
		console.log("updateList type [仅用于测试看type]: ", JSON.stringify(data))
		this.setState({
			list: JSON.parse(JSON.stringify(cacheList)),
			canItemClick: true,
			timeId: null
		})
		console.log("cacheList: ", cacheList)
		clearTimeout(timeId);
		if (cacheList.every(o => o.match === true)) {
			this.passSuccess();
		}
	}

	passSuccess() {
		const {levelId, curBarrier, progressId} = this.props.match.params;
		const {user_id} = this.state;
		const params = {
			id: progressId,
			level: levelId,
			barrier: curBarrier,
			user_id
		};
		addOrUpdateCardProgress(params).then(res => {
			if (res.code === 200) {
				const currentLevelBarriers = JSON.parse(sessionStorage.getItem("currentLevelBarriers") || "[]");
				const isNextBarrier = res.data.barrier < currentLevelBarriers.length;
				Toast.info(`${isNextBarrier ? '闯关成功，即将进入下一关！' : '闯关成功，恭喜你完成本难度所有关卡！'}`, 2);

				// 跳转下一关或难度页
				setTimeout(() => {
					const {levelId} = this.props.match.params;
					let pathname = isNextBarrier ? `/game/openCard/main/${levelId}/${res.data.barrier * 1 + 1}/${res.data.id}` : `/game/openCard/level`;
					this.props.history.replace({pathname});
				}, 2000)
			} else {
				Toast.info(res.msg, 1.5);
			}
		})
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

		// console.log("process: ", process, this.state.timeId)
		// 如果此次点击的不是上次的卡片，则立即将待翻开的卡片翻开，并且将canItemClick置为true
		if (this.state.timeId && process === 1) {
			// console.log("事件前 更新")
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

			// 判断 当前卡片 和 已翻开的卡片 是否匹配
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
				});

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

	render() {
		const {list, detail} = this.state;
		const {curBarrier} = this.props.match.params;
		return (
			<section className="page link-up-game-page">
				<AppHeader title={`第 ${curBarrier} 关`} close={true}/>
				<section className="page-container" style={{height: "calc(100% - .8rem)"}}>
					<ul className="list">
						{
							list.map((item, index) => (
								<li className={this.onFilterItemClass(item)} key={item.id}
								    onClick={() => this.onItemClick(item, index)}>
									<div className="front" style={{backgroundColor: detail.gridBackgroundColor}}>
										<div className="info">
											<span>{this.onFilterItemLabel(item)}</span>
										</div>
									</div>
									<div className="back" style={{backgroundColor: detail.gridBackgroundColor}}>
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
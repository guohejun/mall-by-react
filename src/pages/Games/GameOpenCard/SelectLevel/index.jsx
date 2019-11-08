import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import "./index.less";
import AppHeader from "@src/component/AppHeader";
import {getGameOpenCardLevel, createGameOpenCardLevel, createGameOpenCardBarriers, getGameOpenCardBarriers} from "@src/service/api";
import {Toast} from "antd-mobile";

class SelectLevel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			levels: [
				{level: 1, name: "简单难度", color: "160, 217, 17"},
				{level: 2, name: "中级难度", color: "124, 179, 5"},
				{level: 3, name: "高级难度", color: "91, 140, 0"},
				{level: 4, name: "超级模式", color: "63, 102, 0"},
			]
		}
	}

	componentDidMount() {
		this.getGameOpenCardLevel();
	}

	getGameOpenCardLevel() {
		Toast.loading("", 0);
		getGameOpenCardBarriers().then(res => {
			console.log("getGameOpenCardLevel: ", res)
			if (res.code === 200) {
				// this.setState({levels: res.data})
			}
		}).catch(()=> {}).finally(() => {
			setTimeout(() => {
				Toast.hide();
			}, 1000)
		})
	}

	styleFilter(color) {
		// console.log(color);
		return {
			backgroundColor: `rgba(${color}, 1)`,
			boxShadow: `0 8px 0 0 rgba(${color}, .5)`,
			borderColor: `rgba(${color}, 1)`
		};
	}

	onButtonClick(item) {
		// this.props.history.push({
		// 	pathname: `/game/openCard/barrier/${item.level}`
		// })

		// 创建等级数据
		// let params = this.state.levels.find(o => o.level === item.level);
		// this.onCreateLevel(params);
		let params = {
			"barrier": "3",
			"grid_num": "8",
			"max_step": "13",
			"headerBackgroundColor": "#91d5ff",
			"headerColor": "lime-3",
			"pageBackgroundColor": "#e6f7ff",
			"pageColor": "lime-1",
			"gridBackgroundColor": "#1890ff",
			"gridColor": "lime-6"
		}
		this.onCreateGameOpenCardBarriers(params);
	}

	onCreateLevel(params) {
		createGameOpenCardLevel(params).then((res) => {
			if (res.code === 200) {
				Toast.info("操作成功!", 2)
			}
		})
	}


	onCreateGameOpenCardBarriers(params) {
		createGameOpenCardBarriers(params).then((res) => {
			if (res.code === 200) {
				Toast.info("操作成功!", 2)
			}
		})
	}

	render() {
		const {levels} = this.state;
		return (
			<section className="page link-up-game-page">
				<AppHeader title="选择难度" close={true}/>
				<button>点我</button>
				<section className="page-container" style={{height: "calc(100% - .8rem)"}}>
					<ul className="levels">
						{
							levels.map(o => (
								<button className="item"
								        style={this.styleFilter(o.color)}
								        onClick={() => this.onButtonClick(o)}
								        key={o.level}>{o.name}</button>
							))
						}
					</ul>
				</section>
			</section>
		)
	}
}


export default withRouter(SelectLevel);
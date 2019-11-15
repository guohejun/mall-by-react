import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import "./index.less";
import AppHeader from "@src/component/AppHeader";
import {Toast} from "antd-mobile";
import {createGameOpenCardBarriers, getGameOpenCardBarriers} from "@src/service/api";

class SelectBarrier extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	componentDidMount() {
		this.getGameOpenCardBarriers(this.props.match.params);
	}

	getGameOpenCardBarriers(params) {
		Toast.loading("", 0);
		getGameOpenCardBarriers({level: params.level, userId: 1}).then(res => {
			console.log("getGameOpenCardBarriers: ", res);
			if (res.code === 200) {
				this.setState({data: res.data})
			}
		}).catch(()=> {}).finally(() => {
			setTimeout(() => {
				Toast.hide();
			}, 500)
		})
	}

	onCreateBarriers() {
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

	onCreateGameOpenCardBarriers(params) {
		createGameOpenCardBarriers(params).then((res) => {
			if (res.code === 200) {
				Toast.info("操作成功!", 2)
			}
		})
	}

	onButtonClick(item) {

	}

	render() {
		const {data} = this.state;
		return (
			<section className="page link-up-game-page">
				<AppHeader title="选择关卡" close={true}/>
				<section className="page-container" style={{height: "calc(100% - .8rem)"}}>
					<ul className="list">
						{
							data.map((o, index) => (
								<button className="item"
								        onClick={() => this.onButtonClick(o)}
								        key={index}>{o.barrier}</button>
							))
						}
					</ul>
				</section>
			</section>
		)
	}
}


export default withRouter(SelectBarrier);
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import "./index.less";
import AppHeader from "@src/component/AppHeader";
import {Toast} from "antd-mobile";
import {getGameOpenCardBarriers} from "@src/service/api";

class SelectBarrier extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			progress: {}
		}
	}


	componentDidMount() {
		this.getGameOpenCardBarriers(this.props.match.params);
	}

	getGameOpenCardBarriers(params) {
		const userId = JSON.parse(sessionStorage.getItem("user") || "{}").id;
		getGameOpenCardBarriers({level: params.levelId, userId}).then(res => {
			if (res.code === 200) {
				this.setState({
					data: res.data,
					progress: res.meta.cardProgress || {}
				});
				let progress = res.meta.cardProgress || {};
				sessionStorage.setItem("currentLevelLen", res.data.length || 0);
				sessionStorage.setItem("currentBarrier", progress.barrier || 0);
			}
		})
	}

	onButtonClick(item) {
		const {progress} = this.state;
		const {levelId} = this.props.match.params;
		this.props.history.push({pathname: `/game/openCard/main/${levelId}/${item.id}/${progress.id || 0}`})
	}

	render() {
		const {data, progress} = this.state;
		return (
			<section className="page select-barrier-page">
				<AppHeader title="选择关卡" close={true}/>
				<section className="page-container" style={{height: "calc(100% - .8rem)"}}>
					<ul className="list">
						{
							data.map((o, index) => (
								<button className={o.barrier - 1 > (progress.barrier || 0) ? "item" : "item passed"}
								        disabled={o.barrier - 1 > (progress.barrier || 0)}
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
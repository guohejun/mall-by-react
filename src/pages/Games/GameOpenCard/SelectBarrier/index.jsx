import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import "./index.less";
import AppHeader from "@src/component/AppHeader";
import {getBarriersByLevel, getLevelProgress} from "@src/service/api";

class SelectBarrier extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: JSON.parse(sessionStorage.getItem("user") || "{}").id, //用户id
			data: [], //关卡列表
			userProgress: {}, //用户进度
		}
	}


	componentDidMount() {
		this.getBarrierList();
		this.getUserProgress();
	}

	//获取关卡列表
	getBarrierList() {
		const {levelId} = this.props.match.params;
		getBarriersByLevel({level: levelId}).then(res => {
			if (res.code === 200) {
				this.setState({data: res.data});
				//缓存当前难度关卡数据
				sessionStorage.setItem("currentLevelBarriers", JSON.stringify(res.data || []));
			}
		})
	}

	//获取用户进度
	getUserProgress() {
		const {user_id} = this.state;
		const {levelId} = this.props.match.params;
		getLevelProgress({level: levelId, user_id}).then(res => {
			if (res.code === 200) this.setState({userProgress: res.data});
		})
	}

	onButtonClick(item) {
		const {userProgress} = this.state;
		const {levelId} = this.props.match.params;
		this.props.history.push({pathname: `/game/openCard/main/${levelId}/${item.barrier}/${userProgress.id || 0}`})
	}

	render() {
		const {data, userProgress} = this.state;
		return (
			<section className="page select-barrier-page">
				<AppHeader title="选择关卡" close={true}/>
				<section className="page-container" style={{height: "calc(100% - .8rem)"}}>
					<ul className="list">
						{
							data.map((o, index) => (
								<button className={o.barrier - 1 > (userProgress.barrier || 0) ? "item" : "item passed"}
								        disabled={o.barrier - 1 > (userProgress.barrier || 0)}
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
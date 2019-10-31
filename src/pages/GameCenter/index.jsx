import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import "./index.less";
import AppHeader from "@src/component/AppHeader";
import IconSvg from "../../component/IconSvg";
import {Grid, Toast} from "antd-mobile";

class GameCenter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [
				{icon: "link_up", text: "翻牌", path: "/linkUpGame"},
				{icon: "undevelop", text: "待开发", path: ""}
			]
		}
	}

	renderItem(item) {
		return (
			<div className="item" onClick={() => {
				item.path ? this.props.history.push({pathname: item.path}) : Toast.info("敬请期待！", 2);
			}}>
				<IconSvg name={item.icon}/>
				<span>{item.text}</span>
			</div>
		)
	}

	render() {
		const {list} = this.state;
		return (
			<section className="page game-center-page">
				<AppHeader title="游戏中心" close={true} />
				<section className="page-container" style={{height: "calc(100% - 1.8rem)"}}>
					<Grid data={list} columnNum={2} renderItem={(item) => this.renderItem(item)} />
				</section>
			</section>
		)
	}
}


export default withRouter(GameCenter);
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import "./index.less";
import AppHeader from "@src/component/AppHeader";
import {getGameOpenCardLevel} from "@src/service/api";
import {Toast} from "antd-mobile";

class SelectLevel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			levels: []
		}
	}

	componentDidMount() {
		getGameOpenCardLevel().then(res => {
			if (res.code === 200) {
				this.setState({levels: res.data})
			}
		})
	}

	styleFilter(color) {
		return {
			backgroundColor: `rgba(${color}, 1)`,
			boxShadow: `0 8px 0 0 rgba(${color}, .5)`,
			borderColor: `rgba(${color}, 1)`
		};
	}

	onButtonClick(item) {
		this.props.history.push({pathname: `/game/openCard/barrier/${item.level}`})
	}


	render() {
		const {levels} = this.state;
		return (
			<section className="page link-up-game-page">
				<AppHeader title="选择难度" close={true}/>
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
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import "./index.less";
import AppHeader from "@src/component/AppHeader";

class SelectBarrier extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section className="page link-up-game-page">
				<AppHeader title="选择关卡" close={true}/>
				<section className="page-container" style={{height: "calc(100% - .8rem)"}}>

				</section>
			</section>
		)
	}
}


export default withRouter(SelectBarrier);
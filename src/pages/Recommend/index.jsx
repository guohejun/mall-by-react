import React, {Component} from "react";
import {getRecommendList} from "@src/service/api";
import MyListView from "@src/component/MyListView";
import AppTabBar from "@src/component/AppTabBar";


class Recommend extends Component {
	constructor(props) {
		super(props);

		this.state = {
			apiData: {
				apiName: getRecommendList,
				apiParams: {}
			},
			tabBar: {
				visible: true,
				key: "1"
			}
		}
	}

	render() {
		return (
			<section style={{height: "100%", backgroundColor: "#f5f5f5"}}>
				<MyListView apiData={this.state.apiData} listHeight={"calc(100% - 50px)"} />
				<AppTabBar selectedKey={"1"} />
			</section>
		)
	}
}

export default Recommend;
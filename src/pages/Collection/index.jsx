import React, {Component} from "react";
import {getCollectionList} from "@src/service/api";
import MyListView from "@src/component/MyListView";


class Collection extends Component {
	constructor(props) {
		super(props);

		this.state = {
			apiData: {
				apiName: getCollectionList,
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
				<MyListView apiData={this.state.apiData} listHeight={"100%"} />
			</section>
		)
	}
}

export default Collection;
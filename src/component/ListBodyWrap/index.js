import React, {Component} from "react";
import "./index.less";


class ListBodyWrap extends Component{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="am-list-body my-body">
				<div className="productListWrap">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default ListBodyWrap;
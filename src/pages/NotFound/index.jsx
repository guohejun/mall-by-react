import React, {Component} from 'react';
import IconSvg from "@src/component/IconSvg";

class NotFound extends Component {
	constructor(props) {
		super(props);
		this.state = {
			styles: {
				wrap: {
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					paddingTop: "40%",
					color: "#999"
				},
				icon: {
					width: "2.5rem",
					height: "2.5rem",
					marginBottom: ".5rem",
					color: "#787878"
				}
			}
		}
	}

	render() {
		const {wrap, icon} = this.state.styles;
		return (
			<div style={wrap}>
				<IconSvg name="not_found" style={icon}/>
				<h3 className="user-title">喵，页面飞上太空了吧~~</h3>
			</div>
		);
	}
}

export default NotFound;

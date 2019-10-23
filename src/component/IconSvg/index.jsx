import React, {Component} from "react";
import propTypes from "prop-types";
import "./index.less";

class IconSvg extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		name: propTypes.string.isRequired
	};

	render() {
		const {name, className} = this.props;
		let cls = "icon-svg";
		if (className) {
			cls = cls + " " + className
		}
		return (
			<svg className={cls}>
				<use xlinkHref={"#icon" + name}></use>
			</svg>
		)
	}
}

export default IconSvg;
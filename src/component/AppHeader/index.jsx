import React, {Component} from "react";
import {withRouter} from "react-router";
import "./index.less";
import IconSvg from "../IconSvg";
import {Modal} from "antd-mobile";

class AppHeader extends Component {
	constructor(props) {
		super(props);

		this.state = {}
	};

	onBack() {
		this.props.history.goBack();
	}

	onClose() {
		Modal.alert('提示', '确定关闭当前页面吗?', [
			{ text: '取消', onPress: () => {} },
			{ text: '确定', onPress: () => {
					this.props.history.replace({pathname: "/"});
				}
			},
		]);
	}

	renderRightIcon() {
		const {close, rightIcon} = this.props;
		if (rightIcon) {
			return (
				rightIcon
			)
		} else if (close) {
			return (
				<div onClick={() => this.onClose()}>
					<IconSvg name="close"/>
				</div>
			)
		} else {
			return ""
		}
	}

	render() {
		const {title, className, style} = this.props;
		let cls = "app-header";
		if (className) {
			cls = cls + " " + className
		}
		return (
			<header className={cls} style={style}>
				<div className="app-header-left" onClick={() => this.onBack()}>
					<IconSvg name="back"/>
				</div>

				<span className="app-header-title text-overflow">{title}</span>

				<div className="app-header-right">
					{this.renderRightIcon()}
				</div>

			</header>
		)
	}
}

export default withRouter(AppHeader);
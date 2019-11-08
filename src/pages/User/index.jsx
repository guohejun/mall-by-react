import React, {Component} from 'react';
import "./index.less";
import {Toast} from "antd-mobile";
import AppTabBar from "@src/component/AppTabBar";
import IconSvg from "@src/component/IconSvg";
import {getUserInfo} from "@src/service/api";

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			navs: [
				{
					icon: "history",
					label: "浏览记录",
					path: "/history",
					hasArrow: true
				},
				{
					icon: "collect",
					label: "我的收藏",
					path: "/collection",
					hasArrow: true
				},
				{
					icon: "money",
					label: "我的喵币",
					path: "/coin",
					hasArrow: false,
					data: {
						coinNum: 20,
						valueStr: "20个"
					}
				},
				{
					icon: "game",
					label: "游戏中心",
					path: "/game",
					hasArrow: true
				},
			]
		}
	}

	componentDidMount() {
		this.getUserInfo();
	}

	getUserInfo() {
		getUserInfo().then(res => {
			if (res.code === 200) {
				this.setState({user: res.data})
			}
		})
	}

	onFilterGender() {
		switch (this.state.user.gender) {
			case "1": return "男";
			case "2": return "女";
			default: return "未知";
		}
	}

	onSignIn() {
		Toast.info("签到成功");
	}

	onNavLink(item) {
		if (item.path && item.hasArrow) {
			this.props.history.push({pathname: item.path});
		}
	}

	render() {
		const {user} = this.state;
		return (
			<div className="user-page">
				<section className="user">
					<header className="user-header">
						<div className="user-avatar">
							<img src={user.avatar} alt=""/>
						</div>
						<div className="user-info">
							<p className="p1">
								<span className="nickname">{user.nickName}</span>
								<span className="gender">{this.onFilterGender()}</span>
							</p>
							<p className="p2">
								<span className="label">会员等级：</span>
								<span className="value">{user.vipLevelName || "未知等级"}</span>
							</p>
							<p className="p2">
								<span className="label">签到天数：</span>
								<span className="value">{user.signDaysThisMonth || 0} 天</span>
							</p>
							<p className="p3">
								<button className="signIn" onClick={() => this.onSignIn()}>点我签到</button>
							</p>
						</div>
					</header>
					<section className="user-navs">
						<ul className="list">
							{
								this.state.navs.map((item, index) => (
									<li className="nav-item" key={index} onClick={() => this.onNavLink(item)}>
										<IconSvg className="item-left item-left__icon" name={item.icon}/>
										<span className="item-label">{item.label}</span>
										{
											item.hasArrow
												? <IconSvg className="item-right item-right__icon" name={"gengduo"}/>
												: <span className="item-right item-right__span">{item.data.valueStr}</span>
										}
									</li>
								))
							}
						</ul>
					</section>
				</section>
				<AppTabBar selectedKey={"3"}/>
			</div>
		);
	}
}

export default User;

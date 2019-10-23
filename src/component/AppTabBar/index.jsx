import React, {Component} from "react";
import {withRouter} from "react-router";
import {TabBar} from "antd-mobile";

class AppTabBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedTab: 'redTab',
			tabList: [
				{
					key: "0",
					title: "首页",
					badge: 0,
					iconUrl: "https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg",
					selectedIconUrl: "https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg",
					path: "/"
				},
				{
					key: "1",
					title: "推荐",
					badge: 99,
					iconUrl: "https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg",
					selectedIconUrl: "https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg",
					path: "/recommend"
				},
				{
					key: "2",
					title: "购物车",
					badge: 3,
					iconUrl: "https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg",
					selectedIconUrl: "https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg",
					path: "/cart"
				},
				{
					key: "3",
					title: "我的",
					badge: 5,
					iconUrl: "https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg",
					selectedIconUrl: "https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg",
					path: "/user"
				}
			],
			hidden: false
		}
	};

	render() {
		return (
			<div className="AppTabBar">
				<TabBar
					unselectedTintColor="#949494"
					tintColor="#33A3F4"
					barTintColor="white"
					hidden={this.state.hidden}
				>
					{
						this.state.tabList.map(tab => (
							<TabBar.Item
								title={tab.title}
								key={tab.key}
								icon={<div style={{
									width: '22px',
									height: '22px',
									background: `url(${tab.iconUrl}) center center /  21px 21px no-repeat`
								}}
								/>
								}
								selectedIcon={<div style={{
									width: '22px',
									height: '22px',
									background: `url(${tab.selectedIconUrl}) center center /  21px 21px no-repeat`
								}}
								/>
								}
								selected={this.props.selectedKey === tab.key}
								badge={tab.badge}
								onPress={() => {
									this.setState({
										selectedTab: tab.key,
									});
									this.props.history.push({
										pathname: tab.path
									})
								}}
							>
							</TabBar.Item>
						))
					}
				</TabBar>
			</div>
		)
	}
}

export default withRouter(AppTabBar);
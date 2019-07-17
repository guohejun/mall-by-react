import React, { Component } from "react";
import logo from "@src/logo.svg";
import "./index.sass";
import { Button, TabBar, Flex, SearchBar } from "antd-mobile";

class Home extends Component {
  constructor(props) {
    super(props);
    const noticeList = [
      { id: 1, appUrl: "/", title: "首页", imgUrl: "a.jpg" },
      { id: 2, appUrl: "/login", title: "登录", imgUrl: "a.jpg" },
      { id: 3, appUrl: "/user", title: "个人中心", imgUrl: "a.jpg" },
      { id: 4, appUrl: "/404", title: "404页面", imgUrl: "a.jpg" }
    ]
    this.state = {
      value: "",
      noticeList,
      selectedTab: 'redTab',
      hidden: false,
    };
  }
  onChange = val => {
    console.log(val);
    this.setState({ value: val });
  };
  onLinkTo = (e, item) => {
    console.log(e, item)
    this.props.history.push({
      pathname: item.appUrl
    })
  }
  render() {
    return (
      <div className="home-page">
        <SearchBar
          value={this.state.value}
          placeholder="Search"
          onSubmit={value => console.log(value, "onSubmit")}
          onClear={value => console.log(value, "onClear")}
          onFocus={() => console.log("onFocus")}
          onBlur={() => console.log("onBlur")}
          onCancel={() => console.log("onCancel")}
          showCancelButton
          onChange={this.onChange}
        />
        <section className="bannerBox" />
        <section className="cardBox">
          <Flex wrap="wrap">
            {this.state.noticeList.map((item, index) => (
              <div key={index} className="cardItem" onClick={(e) => this.onLinkTo(e, item)}>
                <img src="{item.imgUrl}" alt="" className="cardItem__img"/>
                <div className="cardItem__right">
                  <p className="title">{item.title}</p>
                  <span className="number">{index+10}</span>
                </div>
              </div>
            ))}
          </Flex>
        </section>
        <Button
          type="primary"
          onClick={() =>
            this.props.history.push({
              pathname: "/login",
              state: {
                id: 3
              }
            })
          }
        >
          通过函数跳转
        </Button>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="Life"
            key="Life"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'blueTab'}
            badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="Koubei"
            key="Koubei"
            badge={'new'}
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="Friend"
            key="Friend"
            dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="My"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default Home;

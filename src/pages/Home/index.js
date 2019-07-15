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
      noticeList
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
        TabBar
      </div>
    );
  }
}

export default Home;

import React, { Component } from "react";
import logo from "@src/logo.svg";
import "./index.sass";
import { Button, Carousel, TabBar, Flex, SearchBar } from "antd-mobile";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      bannerList: [
        "https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg",
        "https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg",
        "https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg",
        "https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg"
      ],
      noticeList: [
        { id: 1, appUrl: "/", title: "首页", imgUrl: "https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg" },
        { id: 2, appUrl: "/login", title: "登录", imgUrl: "https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg" },
        { id: 3, appUrl: "/user", title: "个人中心", imgUrl: "https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" },
        { id: 4, appUrl: "/404", title: "404页面", imgUrl: "https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" }
      ]
    };
  }
  // 输入框change事件
  onSearchChange = val => {
    console.log(val);
    this.setState({ keyword: val });
  };
  // 公告卡片跳转
  onNoticeLinkTo = (e, item) => {
    this.props.history.push({
      pathname: item.appUrl
    })
  }
  render() {
    return (
      <div className="home-page">
        <SearchBar
          value={this.state.keyword}
          placeholder="Search"
          onSubmit={value => console.log(value, "onSubmit")}
          onClear={value => console.log(value, "onClear")}
          onFocus={() => console.log("onFocus")}
          onBlur={() => console.log("onBlur")}
          onCancel={() => console.log("onCancel")}
          showCancelButton
          onChange={this.onSearchChange}
        />
        <section className="bannerBox">
          <Carousel>
            {this.state.bannerList.map((item, index) => (
              <div className="imgItem">
                <img src={item} alt=""/>
              </div>
            ))}
          </Carousel>
        </section>
        <section className="cardBox">
          <Flex wrap="wrap">
            {this.state.noticeList.map((item, index) => (
              <div key={index} className="cardItem" onClick={(e) => this.onNoticeLinkTo(e, item)}>
                <img src={item.imgUrl} alt="" className="cardItem__img"/>
                <div className="cardItem__right">
                  <p className="title">{item.title}</p>
                  <span className="number">{index+10}</span>
                </div>
              </div>
            ))}
          </Flex>
        </section>
        
      </div>
    );
  }
}

export default Home;

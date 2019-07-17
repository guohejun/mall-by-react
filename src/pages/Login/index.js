import React, { Component } from "react";
import logo from "@src/logo.svg";
import "./index.sass";
import Tool from '../../utils/api'
import {
  WingBlank,
  WhiteSpace,
  Card,
  InputItem,
  Button,
  Toast
} from "antd-mobile";
const tool = new Tool();
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        phone: "",
        password: "",
        showPhoneError: false,
        showPwdError: false
      },
      formRule: {
        phone: {
          require: true,
          requireMessage: "请输入手机号码",
          reg: "^[1][0-9]{10}$",
          regMessage: "请输入正确的手机号码",
          isError: false
        },
        password: {
          require: true,
          requireMessage: "请输入密码",
          reg: "^[0-9a-zA-Z]{6,8}$",
          regMessage: "请输入正确的密码",
          isError: false
        }
      },
      loading: false,
      btnDisabled: false
    };
  }
  onChange = (e, type) => {
    console.log(e, type);
    let { form, formRule } = this.state;
    // 校验对应表单值
    if (formRule[type].require) {
      formRule[type].isError = !e;
      formRule[type].errorType = "require";
    }
    if (formRule[type].reg) {
      formRule[type].isError = !new RegExp(formRule[type].reg).test(
        e.replace(/\s/g, "")
      );
      formRule[type].errorType = "reg";
    }
    // 更新对应表单值
    form[type] = e;
    console.log(tool);
    let map = Tool.objToMap(formRule)
    console.log([...map])
    let btnDisabled = formRule.findIndex(o => o.isError === true) > -1;
    this.setState({
      form,
      formRule,
      btnDisabled
    });
  };
  onErrorClick = type => {
    let { formRule } = this.state;
    Toast.info(
      formRule[type].errorType === "require"
        ? formRule[type].requireMessage
        : formRule[type].regMessage
    );
  };
  onLogin = () => {
    const { form, formRule } = this.state;
    this.setState({loading: true})
    if (this.state.formRule.findIndex(o => o.isError === true) === -1) {
        setTimeout(() => {
            this.setState({loading: false})
        }, 1500)
    } else {
        this.setState({loading: false})
    }
  };
  render() {
    return (
      <div className="login-page">
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <Card>
            <Card.Header title="欢迎" />
            <Card.Body>
              <InputItem
                type="phone"
                clear
                placeholder={this.state.formRule.phone.requireMessage}
                error={this.state.formRule.phone.isError}
                onErrorClick={() => this.onErrorClick("phone")}
                onChange={e => this.onChange(e, "phone")}
                value={this.state.form.phone}
              >
                手机号码
              </InputItem>
              <InputItem
                type="password"
                clear
                placeholder={this.state.formRule.password.requireMessage}
                error={this.state.formRule.password.isError}
                onErrorClick={() => this.onErrorClick("password")}
                onChange={e => this.onChange(e, "password")}
                value={this.state.form.password}
              >
                密码
              </InputItem>
            </Card.Body>
            <Card.Footer
              content={
                <Button
                  type="primary"
                  disabled={() => this.isFormValiOk}
                  loading={this.state.loading}
                  onClick={() => this.onLogin}
                >
                  登录
                </Button>
              }
            />
          </Card>
          <WhiteSpace size="lg" />
        </WingBlank>
      </div>
    );
  }
}

export default Login;

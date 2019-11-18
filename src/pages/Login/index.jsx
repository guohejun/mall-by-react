import React from "react";
import {List, InputItem, Card, Button, Tag, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import "./index.less";
import {login} from "@src/service/api";

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			form: [
				{
					name: "login",
					label: "账号",
					placeholder: "请填写登录账号",
					options: {
						initialValue: "",
						rules: [
							{
								required: true,
								message: "请填写登录账号",
							},
							{
								validator: this.verifyLogin,
							}
						]
					}
				},
				{
					name: "password",
					label: "密码",
					placeholder: "请填写登录密码",
					options: {
						initialValue: "",
						rules: [
							{
								required: true,
								message: "请填写登录密码",
							},
							{
								validator: this.verifyPassword,
							}
						]
					}
				},
			],
			loading: false
		}
	}

	verifyLogin = (rule, value, callback) => {
		if (!/[a-zA-Z0-9]{4,8}/.test(value)) {
			callback('4-8位，只能包含字母和数字');
		} else {
			callback();
		}
	};

	verifyPassword = (rule, value, callback) => {
		if (!/[a-zA-Z0-9]{6,8}/.test(value)) {
			callback('6-8位，只能包含字母和数字');
		} else {
			callback();
		}
	};

	onSubmit() {
		const {validateFields} = this.props.form;
		validateFields((error, value) => {
			console.log(error, value);
			if (!error) {
				this.setState({loading: true});
				(async () => {
					const res = await login(value);
					console.log(res)
					Toast.info(res.msg, 1);
					if (res.code === 200) {
						sessionStorage.setItem("user", JSON.stringify(res.data || "{}"));
						setTimeout(() =>{
							this.props.history.push({
								pathname: "/"
							})
						}, 1500)
					}
					this.setState({loading: false});
				})();
			}
		});
	}

	render() {
		const {form, loading} = this.state;
		const {getFieldDecorator, getFieldError} = this.props.form;

		return (
			<div className="login-page">
				<Card>
					<header className="card-header">登录</header>

					{
						form.map((item, index) => (
							getFieldDecorator(item.name, item.options)(<InputItem
								key={index}
								clear
								error={!!getFieldError(item.name)}
								onErrorClick={() => {
									Toast.info(getFieldError(item.name)[0], 1)
								}}
								placeholder={item.placeholder}
							>{item.label}</InputItem>)
						))
					}

					<Button type="primary" size="small" loading={loading} onClick={() => this.onSubmit()}>确认</Button>

					<footer className="card-footer">
						<span>还没有账号？</span>
						<a href="#/register">去注册</a>
					</footer>
				</Card>
			</div>
		);
	}
}


export default createForm()(Login);
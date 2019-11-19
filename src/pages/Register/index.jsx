import React from "react";
import {Link} from "react-router-dom";
import {InputItem, Card, Button, Radio, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import "./index.less";
import {register} from "@src/service/api";

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			form: [
				{
					name: "login",
					label: "账号",
					placeholder: "请填写登录账号",
					type: "input",
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
					type: "input",
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
				{
					name: "nickname",
					label: "昵称",
					placeholder: "请填写昵称",
					type: "input",
					options: {
						initialValue: "",
						rules: [
							{
								required: true,
								message: "请填写昵称",
							}
						]
					}
				},
				{
					name: "gender",
					label: "性别",
					placeholder: "",
					type: "radio",
					list: [
						{value: "0", label: "保密"},
						{value: "1", label: "男"},
						{value: "2", label: "女"},
					],
					options: {
						initialValue: "0",
						rules: [
							{
								required: true,
								message: "请选择性别",
							}
						]
					}
				},
				{
					name: "age",
					label: "年龄",
					placeholder: "请填写年龄",
					type: "input",
					options: {
						initialValue: "",
						rules: [
							{
								required: true,
								message: "请填写年龄",
							}
						]
					}
				}
			],
			btnLoading: false
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
				this.setState({btnLoading: true});
				(async () => {
					const res = await register(value);
					console.log(res)
					Toast.info(res.msg, 1);
					if (res.code === 200) {
						sessionStorage.setItem("loginHistory", JSON.stringify({login: value.login, password: value.password}));
						sessionStorage.setItem("user", JSON.stringify(res.data || "{}"));
						setTimeout(() => {
							this.props.history.push({
								pathname: "/"
							})
						}, 1500)
					}
					this.setState({btnLoading: false});
				})();
			}
		});
	}

	render() {
		const {form, btnLoading} = this.state;
		const {getFieldDecorator, getFieldError} = this.props.form;

		return (
			<div className="login-page">
				<Card>
					<header className="card-header">登录</header>

					{
						form.map((item, index) => {
							switch (item.type) {
								case "radio":
									return (
										getFieldDecorator(item.name, item.options)(
											<div className="am-list-item radio-group" key={index}>
												<div className="am-input-label am-input-label-5">性别</div>
												{
													item.list.map((o, i) => (
														<Radio.RadioItem
															key={i}
															checked={item.options.initialValue === o.value}
															onChange={() => {
																console.log(o)
																let {form} = this.state;
																form[index].options.initialValue = o.value;
																this.setState({form});
															}}
														>{o.label}</Radio.RadioItem>
													))
												}
											</div>
										)
									);
								case "checkbox":
									return (
										getFieldDecorator(item.name, item.options)(<InputItem
											key={index}
											clear
											error={!!getFieldError(item.name)}
											onErrorClick={() => {
												Toast.info(getFieldError(item.name)[0], 1)
											}}
											placeholder={item.placeholder}
										>{item.label}</InputItem>)
									);
								default:
									return (
										getFieldDecorator(item.name, item.options)(<InputItem
											key={index}
											clear
											error={!!getFieldError(item.name)}
											onErrorClick={() => {
												Toast.info(getFieldError(item.name)[0], 1)
											}}
											placeholder={item.placeholder}
										>{item.label}</InputItem>)
									)
							}
						})
					}

					<Button type="primary" size="small" loading={btnLoading} onClick={() => this.onSubmit()}>确认</Button>

					<footer className="card-footer">
						<span>还没有账号？</span>
						<Link to="/login">去登录</Link>
					</footer>
				</Card>
			</div>
		);
	}
}


export default createForm()(Register);
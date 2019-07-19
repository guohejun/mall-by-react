import React from "react";
import { InputItem } from 'antd-mobile';
import { createForm, formShape } from "rc-form";

class Form extends React.Component {
  static propTypes = {
    form: formShape
  };

  componentWillMount() {
    this.nameDecorator = this.props.form.getFieldDecorator("name", {
      initialValue: "",
      rules: [
        {
          required: true,
          message: "What's your name?"
        }
      ]
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        console.log("ok", values);
      } else {
        console.log("error", error, values);
      }
    });
  };

  onChange = e => {
    console.log(e.target.value);
  };

  render() {
    const { getFieldError, getFieldProps } = this.props.form;

    return (
      <InputItem
        {...getFieldProps("phone", {
          rules: [
            { required: true, message: "必填啊" },
            {
              validator(rule, value, callback, source, options) {
                console.log(rule, value, callback, source, options)
                var errors = [];
                console.log(value, "Xx");
                if (value === 1) {
                  callback("wocao  111");
                } else {
                  callback(errors);
                }
              }
            }
          ]
        })}
        type="phone"
        placeholder="input your phone"
        error={getFieldError("phone") ? true : false}
      >
        手机号码
      </InputItem>
    );
  }
}

const WrappedForm = createForm()(Form);
export default WrappedForm;

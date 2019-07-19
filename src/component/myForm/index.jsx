import React, { Component } from "react";
import { createForm, formShape } from 'rc-form';

class Form extends React.Component {
  static propTypes = {
    form: formShape,
  };
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        normal: '',
        required: '',
      },
      errors: {}
    }
  }
  onChange = (field, e) => {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({fields});
  }
  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
        <input {...getFieldProps('normal')}/>
        <input {...getFieldProps('required')}/>
        {(errors = getFieldError('required')) ? errors.join(',') : null}
        <button onClick={() => this.submit()}>submit</button>
      </div>
    );
  }
}

export default createForm()(Form);
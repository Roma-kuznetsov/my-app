import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { maxLenghtCreator, reqField } from '../../utils/validators/validator';
import { Input } from '../common/FormsControl/Textarea';
import { login, logout} from '../../redux/auth-reducer'
import { Redirect } from 'react-router';
import s from "../common/FormsControl/Textarea.module.css"


let maxLenghtCreator40 = maxLenghtCreator(40)

const LoginForm = (props) => {
  debugger
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Input} validate={[reqField, maxLenghtCreator40]} placeholder={"Email"} name={"email"} />
      </div>
      <div>
        <Field component={Input} validate={[reqField, maxLenghtCreator40]} type={"password"} placeholder={"Password"} name={"password"} />
      </div>
      <div>
        <Field component={Input}  type={'checkbox'} name={"rememberMe"} /> Remember me
      </div>
      {props.error && <div className={s.formError}>Error login or password</div>}
      {props.capthaImg && <img src={props.capthaImg}></img>}
      {props.capthaImg && <div> <Field component={Input} validate={[reqField, maxLenghtCreator40]}
        type={"text"} placeholder={"captcha"} name={"captcha"} /></div>}
      <div>
        <button>login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe , formData.captcha)
  }

  if (props.isAuth) {
    return <Redirect to={"profile"} />
  }

  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit} capthaImg={props.capthaImg} />
  </div>
}
let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  capthaImg: state.auth.capthaImg
})

export default connect(mapStateToProps, { login, logout,})(Login);
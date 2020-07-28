import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import Header from '../Header/Header';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Btn from '../common/Btn';
import Input from './Input';
import {required} from '../../validate/validate';
import {login} from '../../redux/mainReducer';


let LoginForm = (props) => {
	return  <form onSubmit={props.handleSubmit} className="form">
				<Field component={Input} name={'login'} type={"login"} placeholder="Логин" validate={[required]} />
				<Field component={Input} name={'password'} type={"password"} placeholder="Пароль" validate={[required]} />
				<p className="form__checkbox-wrap"> Запомнить меня: <Field className="form__checkbox" component='input' type="checkbox" name={'save'} /></p>
				<Btn text="Войти" type="submit" />
			</form>
}
let Form = reduxForm({form: 'loginForm'})(LoginForm);
let Login = (props) => {
	let login = (values) => {
		props.login(values);
	}
	return 	<div className="login">
				<Header title="Войти" />
				<Form onSubmit={login} />
				{props.error && <p className="сreate__error">Неправильный логин или пароль</p>}
			</div>
}
let mapStateToProps = state => ({
	error: state.main.error
})
export default connect(mapStateToProps,{login})(Login);


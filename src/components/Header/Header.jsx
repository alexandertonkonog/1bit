import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {filterOwnNews, filterNews} from '../../redux/mainReducer';

let SearchForm = (props) => {
	let [visibleLabel, setVisibleLabel] = useState(true);
	let [input, setInput] = useState('');
	let focusOut = () => {
		input ? setVisibleLabel(false) : setVisibleLabel(true);
	}
	let changeInput = (e) => {
		setInput(e.target.value);
		//props.handleSubmit();
	}
	return  <form onSubmit={props.handleSubmit}>
				{visibleLabel && <label className="search__label input-label">{props.place}</label>}
				<Field onChange={e => changeInput(e)} component="input" name='search' onFocus={()=>setVisibleLabel(false)} onBlur={focusOut} type="text" className="header__search search input" />
			</form>
}
let Form = reduxForm({form: 'searchForm'})(SearchForm);

let Header = (props) => {
	let loc = props.location.pathname;
	let submitForm = (values) => {
		debugger
		props.filterOwnNews(props.ownNews, values.search); 
		props.filterNews(props.news, values.search);
	}
	return 	<header className="header">
				<h1 className="page-title">{props.title}</h1>
				<div className="search-wrap">
					{loc === '/news' && <Form onSubmit={submitForm} place={props.place} />}
				</div>
			</header>
}
let mapStateToProps = state => ({
	news: state.main.news,
	ownNews: state.main.ownNews
})
export default compose(withRouter, connect(mapStateToProps, {filterOwnNews, filterNews}))(Header);
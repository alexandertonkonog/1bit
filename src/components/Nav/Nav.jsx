import React, {useEffect,useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import LinkBtn from '../common/LinkBtn';
import {connect} from 'react-redux';
import {compose} from 'redux';

let Nav = (props) => {
	let loc = props.location.pathname;
	return <nav className="nav">
				<div className="nav__content block">
					<ul className="menu">
						<li>
						<Link 
							to="/news" 
							className={loc==='/news'? "menu__item menu__item_active" : "menu__item" }>Новости</Link>
						</li>
						<li>
						<Link 
							className={loc==='/'? "menu__item menu__item_active" : "menu__item" } 
							to="">Магазин</Link>
						</li>
						<li>
						<Link 
							className={loc==='/readme'? "menu__item menu__item_active" : "menu__item" } 
							to="/readme">README</Link>
						</li>
					</ul>
					<div className="nav__btns">
						{props.isLogin ? <LinkBtn to="/create" text="Создать статью" /> : <LinkBtn to="/login" text="Войти" />}
					</div>
				</div>
			</nav>
}
let mapStateToProps = state => ({
	isLogin: state.main.isLogin
})
export default compose(withRouter, connect(mapStateToProps, {}))(Nav);
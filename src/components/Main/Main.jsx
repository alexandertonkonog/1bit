import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import Shop from '../Shop/Shop';
import Create from '../Create/Create';
import News from '../News/News';
import Login from '../Login/Login';
import README from '../common/README';
import Article from '../Article/Article';
import {connect} from 'react-redux';
import {auth} from '../../redux/mainReducer';

let Main = (props) => {
	useEffect(()=> {
		props.auth();
	}, [props.isLogin])
	return  <div className="main-wrap block">
				{props.isLogin ? <Switch>
					<Route exact path="/" component={Shop} />
					<Route path="/news" component={News} />
					<Route path="/readme" component={README} />
					<Route path="/create/:id?" component={Create} />
					<Route path="/article/:id" component={Article} />
					<Route component={News} />
				</Switch> : <Switch>
					<Route exact path="/" component={Shop} />
					<Route path="/news" component={News} />
					<Route path="/readme" component={README} />
					<Route path="/login" component={Login} />
					<Route path="/article/:id" component={Article} />
					<Route component={Login} />
				</Switch>}
			</div>
}
let mapStateToProps = state => ({
	isLogin: state.main.isLogin
})
export default connect(mapStateToProps, {auth})(Main);
import React, {useEffect} from 'react';
import Header from '../Header/Header';
import NewsItem from './NewsItem';
import Loader from '../common/Loader';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getNews, requestOwnNews} from '../../redux/mainReducer';
let News = (props) => {
	useEffect(()=>{
		props.getNews();
		props.requestOwnNews();
	}, [])
	return  <div className="news-big-wrap">
				<Header title="Новости" place="Найти новости" />
				<main className="main block_p50" style={{height: !props.news && '100vh'}}>
					{props.news ? props.news.map(n => <NewsItem key={n.id} item={n} />) : <Loader />}
					{props.ownNews && props.ownNews.length > 0 && <h3 className="news__title-own">Мои статьи</h3>}
					{props.ownNews && props.ownNews.map(n => <NewsItem key={n.id} item={n} />)}
				</main>
			</div>
}
let mapStateToProps = state => ({
	news: state.main.visibleNews,
	ownNews: state.main.visibleOwnNews,
})
export default connect(mapStateToProps, {getNews, requestOwnNews})(News);
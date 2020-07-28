import React, {useEffect, useState} from 'react';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getNews, requestOwnNews, removeNew} from '../../redux/mainReducer';
import {formDate} from '../../validate/functions';
import LinkBtn from '../common/LinkBtn';
import Btn from '../common/Btn';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Header from '../Header/Header';
import Loader from '../common/Loader';

let Article = (props) => {
	let id = +props.match.params.id;
	let article;
	let [info, setInfo] = useState(false);
	let removeArticle = () => {
		if (window.confirm('Вы действительно хотите удалить эту статью?')) {
			props.removeNew(id);
			setInfo(true);
		}
	}
	if(props.news && props.news.some(a => a.id === id)){
		article = props.news.find(a => a.id === id);
	} else {
		article = props.ownNews && props.ownNews.find(a => a.id === id);
	}
	useEffect(()=>{
		props.getNews();
		props.requestOwnNews();
	}, [id])

	if (!article) {
		return  <Loader />
	}
	return  <>	
				<Header title={article.title} />
				<div className="article">
					<img src={article.urlToImage} alt={article.title} className="article__img"/>
					<div className="article__des">
						<p className="article__author">{article.author || article.source.name}</p>
						<time className="article__date">{formDate(article.publishedAt)}</time>
					</div>
					{article.own ?
							<div dangerouslySetInnerHTML={{__html: article.description}} className="news-item__text"></div>:
							<p className="news-item__text">{article.description}</p>}
					{article.own && props.isLogin && <div className="create__btn-zone">
										{info && <p className="сreate__info">Статья удалена</p>}
										<LinkBtn to={'/create/'+id} text="Редактировать" />
										<Btn  text="Удалить" fun={removeArticle} />
									</div>}
				</div>
			</>
}
let mapStateToProps = state => ({
	news: state.main.news,
	ownNews: state.main.ownNews,
	isLogin: state.main.isLogin
})
export default compose(withRouter, connect(mapStateToProps, {getNews, requestOwnNews, removeNew}))(Article);
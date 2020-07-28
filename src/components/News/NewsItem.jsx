import React from 'react';
import {Link} from 'react-router-dom';
import {getNews} from '../../redux/mainReducer';
import {formDate, maxLength, cutTags} from '../../validate/functions';
let NewsItem = ({item}) => {
	let maxLength150 = maxLength(150);
	return   <article className="news-item">
				<Link to={'/article/'+item.id} className="news-item__img-wrap"><div style={{backgroundImage: `url(${item.urlToImage})`}} className="news-item__img">
					<p className="news-item__hash">#Наша жизнь</p>
				</div></Link>
				
				<div className="news-item__left">
					<Link to={'/article/'+item.id} className="news-item__title">{item.title}</Link>
					<p className="news-item__autor">{item.author || item.source.name}</p>
				</div>
				<div className="news-item__right">
					{item.own ?
					<p dangerouslySetInnerHTML={{__html: maxLength150(cutTags(item.description))}} className="news-item__text"></p>:
					<p className="news-item__text">{maxLength150(item.description)}</p>}
					<time className="news-item__date">{formDate(item.publishedAt)}</time>
				</div>
			</article>
}

export default NewsItem;
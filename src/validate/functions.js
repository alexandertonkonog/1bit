export let dateSort = (a,b) => {
	let dateA = (new Date(a.publishedAt)).getTime();
	let dateB = (new Date(b.publishedAt)).getTime();
	return dateB - dateA;
}
export let formDate = value => {
	let date = new Date(value);
	let list = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
	let hours = String(date.getHours()).length === 2 ? date.getHours() :'0'+String(date.getHours());
	let minutes = String(date.getMinutes()).length === 2 ? date.getMinutes() :'0'+String(date.getMinutes());
	return date.getDate()+' '+list[date.getMonth()]+ ' '+date.getFullYear()+' '+hours+':'+minutes;
}
export let maxLength = value => str => {
	if(str.length > value) return str.slice(0, value)+'...';
	return str;
}
export let limitNews = value => news => {
	return news.filter((n,ind) => ind < value);
}
export let cutTags = value => {
	return value.replace(/<\/?[^>]+>/g,'');
}
export class Article {
	constructor(options) {
		this.id = options.id || +window.localStorage.getItem('id');
		this.title = options.title;
		this.publishedAt = String(new Date());
		this.urlToImage = options.img;
		this.description = options.text;
		this.own = true;
		this.source  = {
			name: window.localStorage.getItem('admin')
		};
		this.author = window.localStorage.getItem('admin');
	}
}
export let searchNews = (state, value) => {
	let str = new RegExp(value.trim(), "i");
	let arr = state.filter(u => str.test(u.title))
	return arr;
}
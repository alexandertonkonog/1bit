import axios from 'axios';
import img from '../images/gvc.png';
import {dateSort, limitNews, Article, searchNews} from '../validate/functions';
import {addToDb, updateDb, deleteDb} from '../db/db';

let GET_NEWS = 'GET_NEWS';
let getNewsAC = data => ({type: GET_NEWS, data});

let GET_OWN_NEWS = 'GET_OWN_NEWS';
let getOwnNewsAC = data => ({type: GET_OWN_NEWS, data});

let SET_VISIBLE_NEWS = 'GET_VISIBLE_NEWS';
let setVisibleNewsAC = data => ({type: SET_VISIBLE_NEWS, data});

let SET_VISIBLE_OWN_NEWS = 'SET_VISIBLE_OWN_NEWS';
let setVisibleOwnNewsAC = data => ({type: SET_VISIBLE_OWN_NEWS, data});

let ADD_NEW = 'ADD_NEW';
let addNewAC = data => ({type: ADD_NEW, data});

let LOGIN = 'LOGIN';
let loginAC = data => ({type: LOGIN});

let ERROR = 'ERROR';
let errorAC = data => ({type: ERROR, data});

let limitNews5 = limitNews(5);
let arr = [{
			author: "Валерий",
			description: "Мы также можем использовать async/await с помощью обёртки, которая основана на промисах, например https://github.com/jakearchibald/idb. Это очень удобно, но обёртка не идеальна, она не может полностью заменить события. Поэтому мы начнём с событий, а затем, когда разберёмся в IndexedDB, рассмотрим и обёртку.",
			id: 1,
			own: false,
			publishedAt: "Tue Jul 28 2020 16:17:23 GMT+0200 (Восточная Европа, стандартное время)",
			source: {name: "admin"},
			title: "IndexedDB",
			urlToImage: "https://svopi.ru/uploads/posts/2016-08/thumbs/1470807795_image.jpeg",
		},
		{
			author: "Иван",
			description: "Мы также можем использовать async/await с помощью обёртки, которая основана на промисах, например https://github.com/jakearchibald/idb. Это очень удобно, но обёртка не идеальна, она не может полностью заменить события. Поэтому мы начнём с событий, а затем, когда разберёмся в IndexedDB, рассмотрим и обёртку.",
			id: 2,
			own: false,
			publishedAt: "Tue Jul 27 2020 13:17:23 GMT+0200 (Восточная Европа, стандартное время)",
			source: {name: "admin"},
			title: "Открыть базу данных",
			urlToImage: "https://yaxudozhnik.ru/wp-content/uploads/2019/04/28001.jpg",
		},
		{
			author: "Александр",
			description: "Мы также можем использовать async/await с помощью обёртки, которая основана на промисах, например https://github.com/jakearchibald/idb. Это очень удобно, но обёртка не идеальна, она не может полностью заменить события. Поэтому мы начнём с событий, а затем, когда разберёмся в IndexedDB, рассмотрим и обёртку.",
			id: 3,
			own: false,
			publishedAt: "Tue Jul 28 2020 16:56:23 GMT+0200 (Восточная Европа, стандартное время)",
			source: {name: "admin"},
			title: "Проблема параллельного обновления",
			urlToImage: "https://sp-slavaynochka.ru/files/893/893b68d1aea4dce90f8eae56f3c145e6.jpg",
		},
		{
			author: "Игорь",
			description: "Мы также можем использовать async/await с помощью обёртки, которая основана на промисах, например https://github.com/jakearchibald/idb. Это очень удобно, но обёртка не идеальна, она не может полностью заменить события. Поэтому мы начнём с событий, а затем, когда разберёмся в IndexedDB, рассмотрим и обёртку.",
			id: 4,
			own: false,
			publishedAt: "Tue Jul 25 2020 16:17:23 GMT+0200 (Восточная Европа, стандартное время)",
			source: {name: "admin"},
			title: "Хранилище объектов",
			urlToImage: "https://www.theworkathomewoman.com/wp-content/uploads/Untitled-design-1-37.jpg",
		},
		{
			author: "Сергей",
			description: "Мы также можем использовать async/await с помощью обёртки, которая основана на промисах, например https://github.com/jakearchibald/idb. Это очень удобно, но обёртка не идеальна, она не может полностью заменить события. Поэтому мы начнём с событий, а затем, когда разберёмся в IndexedDB, рассмотрим и обёртку.",
			id: 5,
			own: false,
			publishedAt: "Tue Jul 28 2020 11:17:23 GMT+0200 (Восточная Европа, стандартное время)",
			source: {name: "admin"},
			title: "Транзакции",
			urlToImage: "https://yandex.ru/images/_crpd/kfW89wz11/661b27Pz/gfDKadLj1HpGgxMx24t1B5Kq86lubaOuQuExIuBRHL08qm-ghOu-6a83jrkVadWczpFt6P4tvACmbM929kCzNhCkzmkywnQuZvcmRXqqtZKzyuMMa6jm-jdxgVKhcQz8uUs8E1IMuf8IofluIw40WVtUqIkv6Eg2Ja",
		},]
let initialState = {
	goods: [
		{
			id: 1,
			title: 'IP-телефон Siemens Gigaset C530A IP',
			curPrice: 12300,
			prevPrice: 15500,
			img: 'https://www.wifi-shop.cz/bazar-siemens-gigaset-a510-ip-voip-telefon_ies38065.jpg'
		},
		{
			id: 2,
			title: 'IP-телефон Siemens Gigaset C530A IP',
			curPrice: 12300,
			prevPrice: 15500,
			img: 'https://www.mojandroid.sk/wp-content/uploads/2016/07/Samsung-Galaxy-J1-Ace-Neo-cover.png'
		},
		{
			id: 3,
			title: 'IP-телефон Siemens Gigaset C530A IP',
			curPrice: 12300,
			prevPrice: 15500,
			img: 'https://main-cdn.goods.ru/big2/hlr-system/1636787/100023571859b1.jpg'
		},
		{
			id: 4,
			title: 'IP-телефон Siemens Gigaset C530A IP',
			curPrice: 12300,
			prevPrice: 15500,
			img: 'https://gley.com.ua/image/cache/catalog/i/ni/jp/f271da8b2629412012d4af3c6d81f62b-1000x1000.jpg'
		},
		{
			id: 5,
			title: 'IP-телефон Siemens Gigaset C530A IP',
			curPrice: 12300,
			prevPrice: 15500,
			img: 'https://www.wifi-shop.cz/bazar-siemens-gigaset-a510-ip-voip-telefon_ies38065.jpg'
		},
		{
			id: 6,
			title: 'IP-телефон Siemens Gigaset C530A IP',
			curPrice: 12300,
			prevPrice: 15500,
			img: 'https://www.mojandroid.sk/wp-content/uploads/2016/07/Samsung-Galaxy-J1-Ace-Neo-cover.png'
		},
	],
	sales: [
		{
			id:1, 
			title: 'Новая акция',
			img: 'https://www.spr.ru/sale_img/2019-09/5802391/414397_m.jpg',
			hasTime: true,
			text: 'Важным преимуществом айпи телефона вместо обычного является на порядок более низакая цена соединения.',
			time: '2020-7-30 20:30',
		},
		{
			id:2, 
			title: 'Новая акция',
			img: 'https://im0-tub-ru.yandex.net/i?id=4c17c06a3727227080b646f470dad96e-sr&n=13&exp=1',
			hasTime: false,
			text: 'Важным преимуществом айпи телефона вместо обычного является на порядок более низакая цена соединения.',
		},
		{
			id:3, 
			title: 'Новая акция',
			img: 'https://i.io.ua/img_su/small/0126/75/01267573_n2.jpg?r=268118327',
			hasTime: true,
			text: 'Важным преимуществом айпи телефона вместо обычного является на порядок более низакая цена соединения.',
			time: '2020-8-8 20:30',
		},
		{
			id:4, 
			title: 'Новая акция',
			img: 'https://vse-linzy.ru/upload/resize_cache/iblock/42c/300_225_140cd750bba9870f18aada2478b24840a/42c94fe0033643a2b9a4370475d41e28.jpg',
			hasTime: true,
			text: 'Важным преимуществом айпи телефона вместо обычного является на порядок более низакая цена соединения.',
			time: '2020-8-30 20:30',
		},
		{
			id:5, 
			title: 'Новая акция',
			img: 'https://fintrip.ru/media/k2/items/cache/bfea3555ad38fe476532c5b54f218c09_XS.jpg',
			hasTime: true,
			text: 'Важным преимуществом айпи телефона вместо обычного является на порядок более низакая цена соединения.',
			time: '2020-8-29 20:30',
		},
		{
			id:6, 
			title: 'Новая акция',
			img: 'https://im0-tub-ru.yandex.net/i?id=4c1d77865bc84c9a335ff4344735c5e1-sr&n=13&exp=1',
			hasTime: true,
			text: 'Важным преимуществом айпи телефона вместо обычного является на порядок более низакая цена соединения.',
			time: '2020-9-13 20:30',
		},
	],
	slides: [
		{
			id: 1,
			img: img,
			title: 'Революционное решение На рынке среди систем ВКС',
			subtitle: 'GVC 3200 от компании Grandstream это:',
			pluses: ['9-ти сторонняя аудио/видео конференция без покупки дополнительного ПО', '2 Мпикс камера CMOS с разрешением 1920Hx1080V@15fps', 'Гигабитный порт, встроенный модуль WiFi (802.11n) и Bluetooth 4.0, Miracast ']
		},
		{
			id: 2,
			img: img,
			title: 'Революционное решение На рынке среди систем ВКС',
			subtitle: 'GVC 3200 от компании Grandstream это:',
			pluses: ['9-ти сторонняя аудио/видео конференция без покупки дополнительного ПО', '2 Мпикс камера CMOS с разрешением 1920Hx1080V@15fps', 'Гигабитный порт, встроенный модуль WiFi (802.11n) и Bluetooth 4.0, Miracast ']
		},
		{
			id: 3,
			img: img,
			title: 'Революционное решение На рынке среди систем ВКС',
			subtitle: 'GVC 3200 от компании Grandstream это:',
			pluses: ['9-ти сторонняя аудио/видео конференция без покупки дополнительного ПО', '2 Мпикс камера CMOS с разрешением 1920Hx1080V@15fps', 'Гигабитный порт, встроенный модуль WiFi (802.11n) и Bluetooth 4.0, Miracast ']
		},
		{
			id: 4,
			img: img,
			title: 'Революционное решение На рынке среди систем ВКС',
			subtitle: 'GVC 3200 от компании Grandstream это:',
			pluses: ['9-ти сторонняя аудио/видео конференция без покупки дополнительного ПО', '2 Мпикс камера CMOS с разрешением 1920Hx1080V@15fps', 'Гигабитный порт, встроенный модуль WiFi (802.11n) и Bluetooth 4.0, Miracast ']
		},
	],
	ownNews: null,
	news: arr.sort(dateSort),
	visibleNews: arr.sort(dateSort),
	visibleOwnNews: null,
	user: 'admin',
	isLogin: false,
	error: false,
}


export let filterNews = (state, value) => (dispatch) => {
	if(!value){ 
		dispatch(setVisibleNewsAC(limitNews5(state)));
	}
	else {
		let arr = searchNews(state, value);
		dispatch(setVisibleNewsAC(limitNews5(arr)));
	}	
}
export let filterOwnNews = (state, value) => (dispatch) => {
	if(!value){ 
		dispatch(setVisibleOwnNewsAC(state.sort(dateSort)));
	}
	else {
		let arr = searchNews(state, value);
		dispatch(setVisibleOwnNewsAC(arr.sort(dateSort)));
	}	
}

export let requestOwnNews = () => dispatch => {
	let openRequest = window.indexedDB.open("db", 1);
	openRequest.onupgradeneeded = function() {
		let db = openRequest.result;
		if (!db.objectStoreNames.contains('news')) { 
			db.createObjectStore('news',{keyPath: 'id'}); 
		}		
	};
	openRequest.onerror = function (err) {
		console.log(err)
	}
	openRequest.onsuccess = function (event) {
		let db = openRequest.result;
		let trans = db.transaction("news","readwrite");
		let news = trans.objectStore("news");

		news.getAll().onsuccess = function(event) {
			dispatch(getOwnNewsAC(event.target.result.sort(dateSort)));
			dispatch(setVisibleOwnNewsAC(event.target.result.sort(dateSort)));
		};
	}
}
export let getNews = () => async (dispatch) => {
	// let data = await axios.get('https://newsapi.org/v2/top-headlines?country=ru&apiKey=c2fd66570a124923a3d4a1717c5b3a7f');
	// let news = data.data.articles.map((n,ind) => ({id: ind+1, own:false, ...n})).sort(dateSort);
	// dispatch(getNewsAC(news));
	// dispatch(setVisibleNewsAC(limitNews5(news)));
}
export let addNew = (data) => dispatch => {
	let id = +window.localStorage.getItem('id');
	let obj = new Article(data);
	addToDb(obj);	
	requestOwnNews();
	window.localStorage.setItem('id', id+1);
}
export let updateNew = data => dispatch => {
	let id = +window.localStorage.getItem('id');
	let obj = new Article(data);
	updateDb(obj);	
	requestOwnNews();
}
export let removeNew = id => dispatch => {
	deleteDb(id);	
	requestOwnNews();
}
export let login = data => dispatch => {
	if(data.login === 'admin' && data.password ==='admin') {
		dispatch(loginAC());
		if (!window.localStorage.getItem('id')) {
			window.localStorage.setItem('id', '21');
		}
		if (data.save) {
			window.localStorage.setItem('admin', 'admin');	
		}
	} else {
		dispatch(errorAC(true))
	}
}
export let auth = () => dispatch => {
	if(window.localStorage.getItem('admin') === 'admin') {
		dispatch(loginAC());

	}
}
export let mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_NEWS: {
			return {
				...state,
				news: action.data
			}
		}
		case GET_OWN_NEWS: {
			return {
				...state,
				ownNews: action.data
			}
		}
		case SET_VISIBLE_NEWS: {
			return {
				...state,
				visibleNews: action.data
			}
		}
		case SET_VISIBLE_OWN_NEWS: {
			return {
				...state,
				visibleOwnNews: action.data
			}
		}
		case LOGIN: {
			return {
				...state,
				isLogin: true
			}
		}
		case ERROR: {
			return {
				...state,
				error: action.data
			}
		}
		case ADD_NEW: {
			return {
				...state,
				ownNews: [action.data, ...state.ownNews]
			}
		}
		default: {
			return state;
		}
		
	}
}
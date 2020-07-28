let commonActions = (obj, str) => {
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
		if(str === 'add') {
			news.add(obj);
		} else if (str === 'put') {
			news.put(obj);
		} else if (str === 'delete') {
			news.delete(obj);
		}
		
	}
}

export let addToDb = (obj) => {
	commonActions(obj, 'add');
}
export let updateDb = (obj) => {
	commonActions(obj, 'put');
}
export let deleteDb = (id) => {
	commonActions(id, 'delete');
}	

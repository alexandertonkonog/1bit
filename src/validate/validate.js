export let minLength = value => {
	if(value.length < 7) return 'Минимум 7 символов';
	return undefined;
}
export let required = value => {
	if(value) return undefined;
	return 'Это поле обязательно';
}

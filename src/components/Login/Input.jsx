import React from 'react';

let Input = ({input, meta, ...props}) => {
	return  <input 
		{...input}
		{...props}
		name={props.name} 
		className={meta.touched && meta.error ? 'form__input input form__input_error' : 'form__input input'} 
		placeholder={props.placeholder}
		type={props.type}  />		
}
export default Input;
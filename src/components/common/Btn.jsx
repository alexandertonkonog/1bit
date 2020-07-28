import React from 'react';
import {Link} from 'react-router-dom';

let Btn = (props) => {
	return <button type={props.type} className="btn" onClick={props.fun}>{props.icon} {props.text}</button>
}
export default Btn;
import React from 'react';
import {Link} from 'react-router-dom';

let LinkBtn = (props) => {
	return <Link className="linkBtn-wrap" to={props.to}><button className="btn linkBtn">{props.text}</button></Link>
}
export default LinkBtn;
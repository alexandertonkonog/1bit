import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/loader.gif';

let Loader = (props) => {
	return <div className="loader-wrap">
		<img src={logo} className="loader" />
	</div>
}
export default Loader;
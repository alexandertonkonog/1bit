import App from './App';
import store from './redux/store.js';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

export const ContextReact = React.createContext();
	ReactDOM.render(
		<BrowserRouter>
			<Provider store={store}>
				<App/>
			</Provider>	
		</BrowserRouter>
		, document.getElementById('root')
	);





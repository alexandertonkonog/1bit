import React from 'react';
import Header from '../Header/Header';
import MainSlider from './MainSlider';
import Newest from './Newest';
import Sales from './Sales';
let Shop = (props) => {
	return  <>
				<Header title="Магазин" place="Найти товар" />
				<main className="main">
					<MainSlider />
					<Newest/>
					<Sales/>
				</main>
			</>
}
export default Shop;
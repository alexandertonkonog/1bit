import React from 'react';
import {Link} from 'react-router-dom';
import Slider from "react-slick";
import newFlag from  '../../images/new.png';
import Btn from '../common/Btn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
let Newest = (props) => {
	const settings = {
	  infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 1281,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    let slider = React.createRef();
	return  <section className="newest-block">
				<div className="title">
					<hr className="title__hr" />
					<div className="title__des">
						<h3 className="title__title">Новинки</h3>
						<Link className="title__link" to="/">Все новинки</Link>
					</div>
				</div>
				<div className="newest block_p50">
					<Slider ref={c => (slider = c)} {...settings} className="common-slider" >
						{props.goods.map(good => <article className="common-slider__item" key={good.id}>
							<div className="common-slider__item-content">
								<img src={newFlag} alt="" className="common-slider__item-mark"/>
								<img src={good.img} alt={good.title} className="common-slider__item-img" />
								<Link className="common-slider__item-title" to="/">{good.title}</Link>
								<p className="common-slider__item-price-wrapper">Цена <span className="common-slider__item-price">{good.curPrice} р.</span> 
								<span className="common-slider__item-prevPrice">{good.prevPrice} p.</span></p>
								<div className="common-slider__item-des">
									<Btn icon={<FontAwesomeIcon icon={faShoppingCart} />} text="Купить" />
									<Link className="common-slider__item-link" to="/">Подробнее</Link>
								</div>
							</div>
						</article>)}
					</Slider>
					<div className="slider__manager">
						<div className="navigation">
							<div className="arrow-left arrow" onClick={() => slider.slickPrev()} ><FontAwesomeIcon icon={faChevronLeft} /></div>	
							<div className="arrow-right arrow" onClick={() => slider.slickNext()}><FontAwesomeIcon icon={faChevronRight} /></div>	
						</div>
					</div>
				</div>
			</section>
}
let mapStateToProps = state => ({
	goods: state.main.goods
})
export default connect(mapStateToProps, {})(Newest);
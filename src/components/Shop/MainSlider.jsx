import React, {useState} from 'react';
import Slider from "react-slick";

import LinkBtn from '../common/LinkBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
let MainSlider = (props) => {
	const settings = {
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      afterChange: index => setActiveDot(index),
    };
    let slider = React.createRef();
    let [activeDot, setActiveDot] = useState(0);
	return  <section className="main-slider-wrap">
				<Slider ref={c => (slider = c)} {...settings} className="main-slider" >
					{props.slides.map(slide => <div className="main-slider__item" key={slide.id}>
						<div className="main-slider__content">
							<div className="main-slider__left">
								<h2 className="main-slider__title">{slide.title}</h2>
								<h3 className="main-slider__subtitle">{slide.subtitle}</h3>
								<ul className="main-slider__list">
									{slide.pluses.map((p,ind) => <li key={ind} className="main-slider__plus">{p}</li>)}
								</ul>
								<LinkBtn to="/" text="Подробнее" />
							</div>
							<img src={slide.img} alt={slide.title} className="main-slider__img" />
						</div>
					</div>)}
				</Slider>
				<div className="main-slider__manager slider__manager">
					<div className="main-slider__dots dots">
						{props.slides.map((s, index) => <div 
							key={s.id} 
							className={index === activeDot ? "dot main-slider__dot dot_active" : "dot main-slider__dot"}
							onClick={()=>slider.slickGoTo(index)}></div>)}
					</div>
					<div className="main-slider__navigation navigation">
						<div className="arrow-left arrow" onClick={() => slider.slickPrev()} ><FontAwesomeIcon icon={faChevronLeft} /></div>	
						<div className="arrow-right arrow" onClick={() => slider.slickNext()}><FontAwesomeIcon icon={faChevronRight} /></div>	
					</div>
				</div>
			</section>
}
let mapStateToProps = state => ({
	slides: state.main.slides
})
export default connect(mapStateToProps, {})(MainSlider);
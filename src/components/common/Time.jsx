import React, {useEffect, useState} from 'react';


let Time = (props) => {
	let [obj, setObj] = useState({});
	let calcLeftTime = (time) => {
		if(time) {
			let t = Date.parse(time) - Date.parse(new Date());
			let minutes = Math.floor( (t/1000/60) % 60 );
			let hours = Math.floor( (t/(1000*60*60)) % 24 );
			let days = Math.floor( t/(1000*60*60*24) );
			setObj({
				days: String(days),
				hours: String(hours),
				minutes: String(minutes)
			})
		}
	}
	useEffect(()=>{
		calcLeftTime(props.time);
	}, [])

	return <div className={"time-wrap" + ' '+ props.moreClass}>
				<p>Срок действия:</p>
				{props.time && ('days' in obj) ? <div className="time">
					<div className="time__item">
						<div className="time__item-main">
							{obj.days.length===2 ? <>
								<p className="time__item-number">{obj.days[0]}</p>
								<p className="time__item-number">{obj.days[1]}</p></> : <>
									<p className="time__item-number">0</p>
									<p className="time__item-number">{obj.days[0]}</p></>} 
							
						</div>
						<p className="time__item-text">дней</p>
					</div>
					<p className="two-dots">:</p>
					<div className="time__item">
						<div className="time__item-main">
							{obj.hours.length===2 ? <>
								<p className="time__item-number">{obj.hours[0]}</p>
								<p className="time__item-number">{obj.hours[1]}</p></> : <>
									<p className="time__item-number">0</p>
									<p className="time__item-number">{obj.hours[0]}</p></>} 
						</div>
						<p className="time__item-text">часов</p>
					</div>
					<p className="two-dots">:</p>
					<div className="time__item">
						<div className="time__item-main">
							{obj.minutes.length===2 ? <>
								<p className="time__item-number">{obj.minutes[0]}</p>
								<p className="time__item-number">{obj.minutes[1]}</p></> : <>
									<p className="time__item-number">0</p>
									<p className="time__item-number">{obj.minutes[0]}</p></>} 
						</div>
						<p className="time__item-text">минут</p>
					</div>
				</div>: <p className="time__timeless">БЕССРОЧНО</p>}
			</div>
}
export default Time;
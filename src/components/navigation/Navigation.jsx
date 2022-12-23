import React from 'react';
import classNames from 'classnames';
import moment from 'moment/moment.js';

import { days } from '../../utils/dateUtils.js';

const Navigation = ({ dayDate }) => {
	function checkForToday(date) {
		const isToday =
			moment(new Date(date)).format(`YYYY DD MM`) ===
			moment(new Date()).format(`YYYY DD MM`);
		return classNames('calendar__day-label', 'day-label', {
			today: isToday,
		});
	}

	return (
		<div className={checkForToday(dayDate)}>
			<span className='day-label__day-name'>{days[dayDate.getDay()]}</span>
			<span className='day-label__day-number'>{dayDate.getDate()}</span>
		</div>
	);
};

export default Navigation;

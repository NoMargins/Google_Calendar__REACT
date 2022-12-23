import React from 'react';
import Hour from '../hour/Hour';
import PropTypes from 'prop-types';

import './day.scss';

const Day = ({
	dataDay,
	dayEvents,
	dataFullDate,
	setEventsInState,
	setNewDateForEvent,
	openModal,
	closeModal,
}) => {
	const hours = Array(24)
		.fill()
		.map((val, index) => index);

	return (
		<div className='calendar__day' data-day={dataFullDate.getTime()}>
			{hours.map((hour) => {
				//getting all events from the day we will render
				const hourEvents = dayEvents.filter(
					(event) => new Date(event.startTime).getHours() === hour
				);

				return (
					<Hour
						key={dataDay + hour}
						dataFullDate={dataFullDate.getTime()}
						dataHour={hour}
						hourEvents={hourEvents}
						setEventsInState={setEventsInState}
						openModal={openModal}
						closeModal={closeModal}
						setNewDateForEvent={setNewDateForEvent}
					/>
				);
			})}
		</div>
	);
};

Day.propTypes = {
	dataDay: PropTypes.number,
	dayEvents: PropTypes.array,
	dataFullDate: PropTypes.object,
	setEventsInState: PropTypes.func,
	openModal: PropTypes.func,
	setNewDateForEvent: PropTypes.func,
	closeModal: PropTypes.func,
};

export default Day;

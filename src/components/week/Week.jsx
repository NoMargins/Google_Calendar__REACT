import React from 'react';
import Day from '../day/Day';
import PropTypes from 'prop-types';

import './week.scss';

const Week = ({
	weekDates,
	events,
	setEventsInState,
	openModal,
	closeModal,
	setNewDateForEvent,
}) => {
	return (
		<div className='calendar__week'>
			{weekDates.map((dayStart) => {
				const dayEnd = new Date(dayStart.getTime()).setHours(
					dayStart.getHours() + 24
				);

				//getting all events from the day we will render
				const dayEvents = events.filter(
					(event) =>
						new Date(event.startTime).getTime() >
							new Date(dayStart).getTime() &&
						new Date(event.endTime).getTime() < new Date(dayEnd).getTime()
				);

				return (
					<Day
						key={new Date(dayStart).getDate()}
						dataFullDate={new Date(dayStart.getTime())}
						dataDay={new Date(dayStart).getDate()}
						dayEvents={dayEvents}
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

Week.propTypes = {
	weekDates: PropTypes.array,
	events: PropTypes.array,
	setEventsInState: PropTypes.func,
	openModal: PropTypes.func,
	setNewDateForEvent: PropTypes.func,
	closeModal: PropTypes.func,
};

export default Week;

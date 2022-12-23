import React, { Component } from 'react';
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import PropTypes from 'prop-types';

import './calendar.scss';

class Calendar extends Component {
	state = {
		isNow: false,
	};

	render() {
		const {
			weekDates,
			events,
			setEventsInState,
			openModal,
			setNewDateForEvent,
			closeModalFunction,
		} = this.props;
		const hours = Array(24)
			.fill()
			.map((val, index) => index);

		return (
			<section className='calendar'>
				<header className='calendar__header'>
					{weekDates.map((dayDate) => (
						<Navigation dayDate={dayDate} key={dayDate.getTime()} />
					))}
				</header>
				<div className='calendar__body'>
					<div className='calendar__week-container'>
						<div className='calendar__time-scale'>
							{hours.map((hour) => (
								<Sidebar hour={hour} key={hour} />
							))}
						</div>
						<Week
							weekDates={weekDates}
							events={events}
							setEventsInState={setEventsInState}
							openModal={openModal}
							setNewDateForEvent={setNewDateForEvent}
							closeModal={closeModalFunction}
						/>
					</div>
				</div>
			</section>
		);
	}
}

Calendar.propTypes = {
	handleClick: PropTypes.func,
	weekDates: PropTypes.array,
	events: PropTypes.array,
	setEventsInState: PropTypes.func,
	openModal: PropTypes.func,
	setNewDateForEvent: PropTypes.func,
	closeModal: PropTypes.func,
};

export default Calendar;
